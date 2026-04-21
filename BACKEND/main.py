# backend/main.py
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import uuid

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

# CORS — permite peticiones desde React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
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
    return {"status": "ok", "proyecto": "Illari — Decide Resplandecer"}


# ── Categorías ────────────────────────────────────────────────
@app.get("/categorias", response_model=list[schemas.CategoriaOut], tags=["Categorías"])
def listar_categorias(db: Session = Depends(get_db)):
    return db.query(CategoriaResultado).order_by(CategoriaResultado.promedio_min).all()


# ── Crear resultado ───────────────────────────────────────────
@app.post("/resultados", response_model=schemas.ResultadoOut, status_code=201, tags=["Resultados"])
def crear_resultado(resultado: schemas.ResultadoCreate, db: Session = Depends(get_db)):
    """
    Recibe el resultado del test desde el frontend.
    Busca la categoría según el promedio y guarda el registro.
    """
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

    # Si no encuentra por rango exacto, busca la más cercana
    if not categoria:
        todas = db.query(CategoriaResultado).all()
        for cat in todas:
            if float(cat.promedio_min) <= resultado.promedio <= float(cat.promedio_max):
                categoria = cat
                break

    if not categoria:
        raise HTTPException(
            status_code=400,
            detail=f"No hay categoría para promedio={resultado.promedio}. "
                   "Verifica que la tabla categorias_resultado esté poblada.",
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