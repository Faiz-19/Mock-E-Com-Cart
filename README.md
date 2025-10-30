# Vibe Commerce - Mock E-Com Cart Assignment

A full-stack e-commerce cart application for the Vibe Commerce screening.
* **Frontend:** React (with Vite)
* **Backend:** Node.js, Express, MongoDB

---

## 📸 Screenshots

| Product Page | Cart & Checkout Modal |
| :---: | :---: |
| <img width="1918" height="865" alt="Screenshot 2025-10-29 212539" src="https://github.com/user-attachments/assets/1b304cb6-6616-423f-8f05-5f62d4f64d67" />| <img width="1919" height="865" alt="Screenshot 2025-10-29 212631" src="https://github.com/user-attachments/assets/d90c4897-d465-41ab-8ef6-988674636d73" />|

---

## ✨ Features (Explanation)

* **View Products:** Fetches and displays a list of products from the backend API.
* **Full Cart Management:** Users can add, remove, and update the quantity (`+` / `-`) of items in the cart.
* **Live Total:** The cart's total price is calculated by the backend and updated in real-time.
* **Mock Checkout:** A checkout modal collects user info and, on submission, clears the cart and returns a mock receipt.
* **Database Seeding:** The backend automatically adds 5-6 mock products to the database on its first run.
* **Responsive Design:** Styled with plain CSS for a clean, dark-themed, responsive UI.

---

## ⚙️ Setup & Installation

### 1. Backend

```bash
# 1. Go to the backend folder
cd backend

# 2. Install dependencies
npm install

# 3. Create a .env file and add your MongoDB URI
# (e.g., PORT=5000, MONGO_URI=mongodb+srv://...)
touch .env

# 4. Run the server
npm run dev
```
### 2. Frontend

```bash
# 1. Go to the frontend folder
cd frontend

# 2. Install dependencies
npm install

# 3. Run the client
npm run dev
```
---

## 📋 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/products` | Fetches all products. |
| `GET` | `/api/cart` | Fetches all cart items and the total. |
| `POST` | `/api/cart` | Adds an item to the cart. |
| `PUT` | `/api/cart/:id` | Updates an item's quantity ('increment'/'decrement'). |
| `DELETE` | `/api/cart/:id` | Removes an item from the cart. |
| `POST` | `/api/checkout` | Clears the cart and returns a receipt. |
