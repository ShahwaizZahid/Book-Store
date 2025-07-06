# 📚 Book-Store

Book-Store is a full-stack web application built using the **MERN** stack (MongoDB, Express.js, React, and Node.js) with **TypeScript**. It offers a seamless experience for browsing, exploring, and reading books online, with user authentication and access control to premium content.

---

## 🚀 Features

- 🔓 **Public Home Page** – View a selection of free books available to all users.
- 🔐 **Protected Course Page** – Access to the full book library is restricted to authenticated users.
- 📖 **Book Detail Page** – Get more information about a specific book including description, author, and other metadata.
- ✅ **Authentication System** – Sign up, log in, and manage sessions using **JWT-based auth**.
- 🔄 **OTP Verification** – Email-based OTP verification after signup ensures secure account creation.
- 🔁 **Resend OTP** – Users can request a new OTP if the previous one expires.

---

## 🧑‍💻 Tech Stack

| Layer      | Technology                      |
| ---------- | ------------------------------- |
| Frontend   | React.js + TypeScript           |
| Backend    | Node.js + Express.js            |
| Database   | MongoDB                         |
| Auth       | JSON Web Tokens (JWT), OTP Flow |
| Styling    | Tailwind CSS                    |
| State Mgmt | React Query                     |
| Forms      | React Hook Form                 |
| Toasts     | React Hot Toast                 |

---

## 📁 Project Structure

book-store/
├── client/ # Frontend - React with TS
│ ├── src/
│ │ ├── components/ # UI components
│ │ ├── pages/ # Routes (Home, Course, Book Details, etc.)
│ │ ├── hooks/ # React Query & form hooks
│ │ ├── config/ # API URL config
│ │ └── App.tsx
│ └── public/
│
├── server/ # Backend - Express with TS
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ ├── utils/
│ └── server.ts
│
├── data.json # Sample book data
└── README.md

yaml
Copy
Edit

---

## 📸 Screenshots

> You can insert images here using markdown if needed. For example:

markdown
Copy
Edit

---

## 🔐 Authentication Flow

1. **Signup:**

   - User signs up with name, email, and password.
   - Backend sends a 6-digit OTP to the provided email.
   - User must verify using the OTP before accessing the application.

2. **Login:**

   - Authenticated using email and password.
   - JWT token is issued and stored (usually in HTTP-only cookie).

3. **Protected Routes:**
   - `/course`, `/book/:id` – require a valid JWT token to access.
   - Middleware on the server checks and verifies token validity.

---

## 🧪 Development Setup

### Prerequisites

- Node.js
- npm / yarn
- MongoDB (local or Atlas)

### Environment Variables

In both `client/.env` and `server/.env`:

```env
# client/.env
VITE_API_URL=http://localhost:5000

# server/.env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
Running the App
bash
Copy
Edit
# Clone the repo
git clone https://github.com/your-username/book-store.git
cd book-store

# Install server dependencies
cd server
npm install
npm run dev

# Install client dependencies
cd ../client
npm install
npm run dev
📝 API Endpoints (Sample)
Method	Endpoint	Description
POST	/signup	Register a user
POST	/verify-email	OTP email verification
POST	/login	Login user
GET	/books	Get all books
GET	/book/:id	Get specific book info

🧠 Future Enhancements
📘 Add book categorization & search

⭐ Favorite & review books

📥 Download PDF / ePub support

📊 Admin dashboard for managing books

🧑‍🎓 Author
Shahwaiz Mughal

If you'd like, you can add more contributors or your socials here.

📄 License
This project is licensed under the MIT License.

Made with ❤️ using MERN + TypeScript

yaml
Copy
Edit

---

Would you like me to help you generate badges (like GitHub stars, license, tech stack) or add more content to the README?
```
