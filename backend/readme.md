# MMotors E-commerce API

## Description

FastAPI application for an e-commerce platform selling motor vehicles, utilizing PostgreSQL for the database.

## Prerequisites

- **Python** 3.8+
- **PostgreSQL** installed and running
- **Git**

## Setup Instructions
**

2. **Create and Activate Virtual Environment**
   ```bash
   python -m venv .venv

   # On Windows (PowerShell)
   .\.venv\Scripts\Activate.ps1

   # On Unix/MacOS
   source .venv/bin/activate
   ```

3. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure Environment Variables**
   
   Create a `.env` file in the `backend` directory with the following content:
   ```env
   POSTGRES_USER=postgres
   POSTGRES_PASSWORD=your_password
   POSTGRES_SERVER=localhost
   POSTGRES_PORT=5432
   POSTGRES_DB=mmotors
   ```

5. **Run Database Migrations**
   ```bash
   alembic upgrade head
   ```

6. **Start the Application**
   ```bash
   uvicorn backend.main:app --reload
   ```

7. **Access the API**
   
   - Open your browser and navigate to [http://127.0.0.1:8000](http://127.0.0.1:8000)
   - API Documentation:
     - **Swagger UI:** [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
     - **ReDoc:** [http://127.0.0.1:8000/redoc](http://127.0.0.1:8000/redoc)

## Notes

- **Virtual Environment:** Ensure the virtual environment is activated before running commands.
- **Dependencies:** Do not commit the `.venv` folder. Dependencies are managed via `requirements.txt`.
- **.gitignore:** Make sure `.venv/` is listed in your `.gitignore` to prevent it from being tracked by Git.

## Common Commands

- **Activate Virtual Environment**
  ```bash
  # Windows
  .\.venv\Scripts\Activate.ps1

  # Unix/MacOS
  source .venv/bin/activate
  ```

- **Deactivate Virtual Environment**
  ```bash
  deactivate
  ```

- **Install Dependencies**
  ```bash
  pip install -r requirements.txt
  ```

- **Generate `requirements.txt`**
  ```bash
  pip freeze > requirements.txt
  ```

## Troubleshooting

- **Alembic Errors:** Ensure your `.env` file is correctly configured and PostgreSQL is running.
- **Environment Activation Issues:** Verify the virtual environment path and execution policies (especially on Windows PowerShell).

---