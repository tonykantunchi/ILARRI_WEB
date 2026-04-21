# backend/schemas.py
# Compatible con Pydantic V2 (FastAPI moderno)
from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional
import uuid


class CategoriaOut(BaseModel):
    id:           int
    nombre:       str
    promedio_min: float
    promedio_max: float

    model_config = {"from_attributes": True}   # ← Pydantic V2


class ResultadoBase(BaseModel):
    promedio: float = Field(..., ge=0.0, le=5.0)
    nivel:    str
    color:    str
    mensaje:  str


class ResultadoCreate(ResultadoBase):
    pass


class ResultadoOut(ResultadoBase):
    id:             int
    usuario_id:     uuid.UUID
    categoria_id:   int
    categoria:      Optional[CategoriaOut] = None
    fecha_registro: datetime

    model_config = {"from_attributes": True}   # ← Pydantic V2