# 📝 Notes App  

A full-stack **MERN + TypeScript** Notes application with **OTP-based authentication** and **Google Sign-In**.  
Users can securely sign up, sign in, create, delete, and view personal notes.  

---

## 🚀 Features  

- **Authentication**  
  - Sign up using **Email + OTP verification**  
  - Login with **Email + OTP**  
  - **Google Sign-In / Sign-Up** using Google OAuth  
  - Secure **JWT-based sessions**  

- **Notes Management**  
  - Create new notes  
  - View all personal notes  
  - Delete notes  
  - Responsive UI (mobile, tablet, desktop)  

- **Frontend**  
  - Built with **React + TypeScript + Vite**  
  - TailwindCSS for styling  
  - React Router DOM for navigation  
  - Lazy loading with Suspense for performance  
  - Toast notifications for feedback  

- **Backend**  
  - Node.js + Express.js  
  - MongoDB with Mongoose  
  - Nodemailer for OTP email delivery  
  - JSON Web Tokens (JWT)  
  - Google Auth library for token verification  

---

## 🛠️ Tech Stack  

**Frontend**  
- React (TypeScript, Vite)  
- TailwindCSS  
- React Router DOM  
- Axios  
- React Hot Toast  
- @react-oauth/google  

**Backend**  
- Node.js + Express.js  
- MongoDB + Mongoose  
- Nodemailer  
- JSON Web Tokens (JWT)  
- Google Auth Library  

---

## ⚙️ Installation & Setup  

### 1. Clone the Repository  
```bash
git clone https://github.com/your-username/notes-app.git
cd notes-app
```
### 2. Install Dependencies
Backend
```bash
cd backend
npm install
```
Frontend
```bash
cd ../frontend
npm install
```
### 3. Environment Variables

Backend(.env)
```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

# Nodemailer (use Gmail App Passwords)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
```
Frontend(.env)
```
VITE_API_URL=http://localhost:5000/api(optional)
VITE_GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
```

### 4. Run the Project
Backend
```bash
cd backend
npm run dev
```
Frontend
```bash
cd frontend
npm run dev
```


## 📂 Project Structure

```
notes-app/
│── backend/
│   ├── src/
│   │   ├── controllers/   # Auth & Notes logic
│   │   ├── middleware/    # JWT middleware
│   │   ├── models/        # Mongoose schemas
│   │   ├── routes/        # Express routes
|   |   ├── config/       # database config
|   |   ├── utils/        # send mail nodemailer
│   │   └── index.ts      # App entry
│   └── .env
│
│── frontend/
│   ├── src/
│   │   ├── api/           # Axios setup
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # SignIn, SignUp, Dashboard, Welcome
│   │   ├── routes/        # appRoutes.tsx
│   │   └── App.tsx
│   └── .env

```

## 🔒 Authentication Flow

**1. Signup**

- User enters Name, DOB, Email
- OTP sent to email
- Verify OTP → user created → JWT issued

**2. Login**

- Enter Email
- OTP sent → verify OTP
- JWT issued on success

**3. Google Auth**

- Google popup → token returned
- Backend verifies token → creates/finds user → issues JWT

## 🌟 Future Improvements

- Rich-text notes (Markdown editor)
- Note categories / tags
- Edit existing notes
- Dark mode toggle
- Deploy with CI/CD pipelines
- Role-based access (admin/users)
- Forgot password flow (for password-based auth extension)

## 📦 Deployment

- **Frontend:** Deploy on Vercel or Netlify
- **Backend:** Deploy on Render, Railway, or Heroku


