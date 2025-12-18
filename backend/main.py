from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import uuid

import models, schemas
from models import CategoriaResultado
from database import engine, SessionLocal


# ===============================
# Crear tablas si no existen
# ===============================
models.Base.metadata.create_all(bind=engine)


# ===============================
# Inicializar aplicación
# ===============================
app = FastAPI(title="API de Ilarri — Resultados Test")


# ===============================
# Configuración CORS (React)
# ===============================
origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ===============================
# Dependencia DB
# ===============================
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ===============================
# Crear resultado (POST)
# ===============================
@app.post("/resultados", response_model=schemas.ResultadoOut)
def crear_resultado(
    resultado: schemas.ResultadoCreate,
    db: Session = Depends(get_db)
):
    # 🔎 Buscar categoría según promedio
    categoria = db.query(CategoriaResultado).filter(
        CategoriaResultado.promedio_min <= resultado.promedio,
        CategoriaResultado.promedio_max >= resultado.promedio
    ).first()

    if not categoria:
        raise HTTPException(
            status_code=400,
            detail="No se encontró una categoría para el promedio enviado"
        )

    # ✅ Crear resultado (usuario_id generado aquí)
    nuevo = models.ResultadoTest(
        usuario_id=uuid.uuid4(),
        promedio=resultado.promedio,
        categoria_id=categoria.id,
        nivel=resultado.nivel,
        color=resultado.color,
        mensaje=resultado.mensaje
    )

    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)

    return nuevo


# ===============================
# Listar últimos resultados (GET)
# ===============================
@app.get("/resultados", response_model=list[schemas.ResultadoOut])
def listar_resultados(db: Session = Depends(get_db)):
    return (
        db.query(models.ResultadoTest)
        .order_by(models.ResultadoTest.fecha_registro.desc())
        .limit(20)
        .all()
    )
