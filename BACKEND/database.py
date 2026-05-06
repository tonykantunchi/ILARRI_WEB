# backend/database.py
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise RuntimeError("❌ Falta la variable DATABASE_URL en el archivo .env")

# Convertimos a dialecto psycopg (más estable en Windows)
if DATABASE_URL.startswith("postgresql://"):
    DATABASE_URL = DATABASE_URL.replace("postgresql://", "postgresql+psycopg://", 1)

print("🔗 Usando DATABASE_URL con psycopg")
print(f"URL: {DATABASE_URL[:80]}...")  # Muestra parte de la URL (sin mostrar contraseña completa)

engine = create_engine(
    DATABASE_URL,
    echo=False,
    pool_pre_ping=True,           # Ayuda a mantener conexiones estables
    connect_args={"client_encoding": "utf8"}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

print("✅ Engine de SQLAlchemy creado correctamente con psycopg")