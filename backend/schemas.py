from pydantic import BaseModel
from datetime import datetime
import uuid

class ResultadoBase(BaseModel):
    promedio: float
    nivel: str
    color: str
    mensaje: str

class ResultadoCreate(ResultadoBase):
    pass

class ResultadoOut(ResultadoBase):
    id: int
    usuario_id: uuid.UUID
    fecha_registro: datetime

    class Config:
        orm_mode = True
