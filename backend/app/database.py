from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os

load_dotenv()

POSTGRES_USER = os.getenv("POSTGRES_USER", "postgres")
POSTGRES_PASSWORD = os.getenv("POSTGRES_PASSWORD", "test")
POSTGRES_SERVER = os.getenv("POSTGRES_SERVER", "postgres_db")  # FIXED
POSTGRES_PORT = os.getenv("POSTGRES_PORT", "5432")  # FIXED
POSTGRES_DB = os.getenv("POSTGRES_DB", "mmotors")

SQLALCHEMY_DATABASE_URL = f"postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_SERVER}:{POSTGRES_PORT}/{POSTGRES_DB}"
print(f"Connecting to database: {SQLALCHEMY_DATABASE_URL}")  # Debug print

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
