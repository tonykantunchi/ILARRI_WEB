from sqlalchemy import Column, Integer, String, Numeric, Text, TIMESTAMP, func, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid
from database import Base


class CategoriaResultado(Base):
    __tablename__ = "categorias_resultado"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(20), nullable=False)
    promedio_min = Column(Numeric(3, 2), nullable=False)
    promedio_max = Column(Numeric(3, 2), nullable=False)


    resultados = relationship("ResultadoTest", back_populates="categoria")


class ResultadoTest(Base):
    __tablename__ = "resultados_test"

    id = Column(Integer, primary_key=True, index=True)
    usuario_id = Column(UUID(as_uuid=True), default=uuid.uuid4, nullable=False)

    promedio = Column(Numeric(3, 2), nullable=False)

   
    categoria_id = Column(
        Integer,
        ForeignKey("categorias_resultado.id"),
        nullable=False
    )

   
    nivel = Column(String(50), nullable=False)
    color = Column(String(20), nullable=False)
    mensaje = Column(Text, nullable=False)

    fecha_registro = Column(TIMESTAMP, server_default=func.now())

    # Relación ORM
    categoria = relationship("CategoriaResultado", back_populates="resultados")
