from faker import Faker
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models import User, Product, RentalDetails

fake = Faker()

def seed_data(db: Session):
    # Users
    for _ in range(10):
        user = User(
            email=fake.email(),
            username=fake.user_name(),
            hashed_password="fakehash",
            full_name=fake.name(),
            is_admin=fake.boolean(chance_of_getting_true=10)
        )
        db.add(user)
    
    # Vehicles
    vehicle_types = ["car", "motorcycle", "boat"]
    for _ in range(20):
        product = Product(
            name=fake.word().capitalize(),
            description=fake.text(),
            price=fake.random_number(digits=5),
            vehicle_type=fake.random.choice(vehicle_types),
            brand=fake.company(),
            model=fake.random_element(["Model X", "Series 5", "C-Class"]),
            year=fake.year(),
            mileage=fake.random_number(digits=6),
            is_for_sale=fake.boolean(),
            is_for_rent=fake.boolean()
        )
        db.add(product)
        db.flush()  # Pour obtenir l'ID
        
        if product.is_for_rent:
            rental = RentalDetails(
                product_id=product.id,
                monthly_price=fake.random_number(digits=3),
                minimum_duration_months=fake.random_int(6, 36),
                includes_insurance=True,
                includes_assistance=True
            )
            db.add(rental)
    
    db.commit()

if __name__ == "__main__":
    db = SessionLocal()
    seed_data(db)
    print("Data seeded successfully!")