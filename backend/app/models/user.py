from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import Boolean, String, Integer, DateTime, func
from app.database import Base  # Import Base from database.py
from pydantic import BaseModel, EmailStr
from typing import Optional

class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    email: Mapped[str] = mapped_column(String, unique=True, index=True, nullable=False)
    username: Mapped[str] = mapped_column(String, unique=True, index=True, nullable=False)
    hashed_password: Mapped[str] = mapped_column(String, nullable=False)
    full_name: Mapped[str | None] = mapped_column(String, nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    is_admin: Mapped[bool] = mapped_column(Boolean, default=False)
    created_at: Mapped[DateTime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[DateTime | None] = mapped_column(DateTime(timezone=True), onupdate=func.now(), nullable=True)

    # ✅ Fix the relationship by specifying foreign keys explicitly
    dossiers = relationship("Dossier", foreign_keys="[Dossier.user_id]", back_populates="user")
    reviewed_dossiers = relationship("Dossier", foreign_keys="[Dossier.reviewed_by]", back_populates="reviewer")

# Pydantic Schema for Creating a User
class UserCreate(BaseModel):
    email: EmailStr
    username: str
    password: str  # Will be hashed before saving
    is_admin: bool = False

# Pydantic Schema for Returning User Data
class UserResponse(BaseModel):
    id: int
    email: str
    username: str
    full_name: str | None
    is_active: bool
    is_admin: bool

    class Config:
        from_attributes = True  # Required for Pydantic V2 compatibility with SQLAlchemy

class UserBase(BaseModel):
    email: EmailStr
    username: str
    full_name: Optional[str] = None
