# React + Vite + Django Authentication

## How to Run This Project

### Backend (Django)
1. Navigate to the backend folder:
   ```
   cd backend
   ```
2. Create and activate a Python virtual environment:
   ```
   python -m venv venv
   venv\Scripts\activate  # On Windows
   ```
3. Install dependencies:
   ```
   pip install django djangorestframework django-cors-headers
   ```
4. Run migrations and start the server:
   ```
   python manage.py migrate
   python manage.py runserver
   ```
5. (Optional) Create a superuser for admin access:
   ```
   python manage.py createsuperuser
   ```

### Frontend (React + Vite)
1. Navigate to the frontend folder:
   ```
   cd frontend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the frontend dev server:
   ```
   npm run dev
   ```

### Usage
- Register or log in from the frontend.
- Only authenticated users can view answers.
- Admin dashboard is available at `/admin` in the backend.

---

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
