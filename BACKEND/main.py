# backend/main.py
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import uuid
import os

import models
import schemas
from models import CategoriaResultado, ResultadoTest
from database import engine, SessionLocal

# Crear tablas si no existen
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="API Illari — Test Emocional",
    description="Backend del test emocional Illari — Decide Resplandecer",
    version="2.0.0",
)

# ── CORS: se configura según el entorno ──────────────────────────
# En local se permite localhost:3000
# En producción se lee desde la variable CORS_ORIGINS
_env = os.getenv("ENVIRONMENT", "local")

if _env == "production":
    # En producción: solo tu dominio real (sin localhost)
    _raw = os.getenv("CORS_ORIGINS", "https://tudominio.com")
    allow_origins = [o.strip() for o in _raw.split(",")]
else:
    # En local: permite localhost con cualquier puerto común
    allow_origins = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allow_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ── Health check ──────────────────────────────────────────────
@app.get("/", tags=["Health"])
def health_check():
    return {
        "status": "ok",
        "proyecto": "Illari — Decide Resplandecer",
        "entorno": _env,
    }


# ── Categorías ────────────────────────────────────────────────
@app.get("/categorias", response_model=list[schemas.CategoriaOut], tags=["Categorías"])
def listar_categorias(db: Session = Depends(get_db)):
    return db.query(CategoriaResultado).order_by(CategoriaResultado.promedio_min).all()


# ── Crear resultado ───────────────────────────────────────────
@app.post("/resultados", response_model=schemas.ResultadoOut, status_code=201, tags=["Resultados"])
def crear_resultado(resultado: schemas.ResultadoCreate, db: Session = Depends(get_db)):
    from decimal import Decimal
    promedio_decimal = Decimal(str(round(resultado.promedio, 2)))

    categoria = (
        db.query(CategoriaResultado)
        .filter(
            CategoriaResultado.promedio_min <= promedio_decimal,
            CategoriaResultado.promedio_max >= promedio_decimal,
        )
        .first()
    )

    if not categoria:
        todas = db.query(CategoriaResultado).all()
        for cat in todas:
            if float(cat.promedio_min) <= resultado.promedio <= float(cat.promedio_max):
                categoria = cat
                break

    if not categoria:
        raise HTTPException(
            status_code=400,
            detail=f"No hay categoría para promedio={resultado.promedio}.",
        )

    nuevo = ResultadoTest(
        usuario_id   = uuid.uuid4(),
        promedio     = resultado.promedio,
        categoria_id = categoria.id,
        nivel        = resultado.nivel,
        color        = resultado.color,
        mensaje      = resultado.mensaje,
    )

    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)
    return nuevo


# ── Listar resultados ─────────────────────────────────────────
@app.get("/resultados", response_model=list[schemas.ResultadoOut], tags=["Resultados"])
def listar_resultados(limit: int = 20, db: Session = Depends(get_db)):
    return (
        db.query(ResultadoTest)
        .order_by(ResultadoTest.fecha_registro.desc())
        .limit(limit)
        .all()
    )


# ── Estadísticas ──────────────────────────────────────────────
@app.get("/estadisticas", tags=["Estadísticas"])
def estadisticas(db: Session = Depends(get_db)):
    from sqlalchemy import func as sqlfunc

    total = db.query(ResultadoTest).count()
    por_categoria = (
        db.query(CategoriaResultado.nombre, sqlfunc.count(ResultadoTest.id).label("total"))
        .join(ResultadoTest, ResultadoTest.categoria_id == CategoriaResultado.id)
        .group_by(CategoriaResultado.nombre)
        .all()
    )

    return {
        "total_resultados": total,
        "por_categoria": [{"categoria": n, "total": t} for n, t in por_categoria],
    }
