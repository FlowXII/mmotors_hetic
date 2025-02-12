from typing import Union

from fastapi import FastAPI, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from sqlalchemy import text
from app.database import get_db
from app.models import Product

app = FastAPI()

class Item(BaseModel):
    name: str
    price: float
    is_offer: Union[bool, None] = None

@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}

@app.put("/items/{item_id}")
def update_item(item_id: int, item: Item):
    return {"item_name": item.name, "item_id": item_id}

@app.get("/test-db")
def test_db(db: Session = Depends(get_db)):
    try:
        # Utiliser une requête ORM pour compter les produits
        count = db.query(Product).count()
        return {"message": "Connexion à la base de données réussie !", "products_count": count}
    except Exception as e:
        return {"error": f"Erreur de connexion : {str(e)}"}