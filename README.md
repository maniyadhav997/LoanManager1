# LoanManager

LoanManager is a full-stack web application for managing loan applications. Users can apply for loans, admins can view all applications, and verifiers can approve or reject applications. The backend is built with **Node.js**, **Express**, and **MongoDB**, while the frontend is built with **React**.

## 📁 Repository Structure

```

LoanManager\_backend/
├── models/           # Backend models (Mongoose schemas)
├── routes/           # Backend API routes
├── server.js         # Backend entry point
├── package.json      # Backend dependencies
├── frontend/         # Frontend code (React)
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
├── .gitignore
└── README.md

````

## 🚀 Features

- **User Role**: Apply for loans and view application status.
- **Admin Role**: View all loan applications with usernames.
- **Verifier Role**: Approve or reject loan applications.
- **Status Styling**: Application status is color-coded:
  - ✅ Green: Approved
  - ❌ Red: Rejected
  - 🕒 Yellow: Pending
- **Authentication**: Secure JWT-based login and route protection.

## 🔧 Prerequisites

Ensure the following are installed:

- [Node.js](https://nodejs.org/) (v14 or later)
- [MongoDB](https://www.mongodb.com/)
- [Git](https://git-scm.com/)
- [Vercel CLI](https://vercel.com/docs/cli) (optional, for frontend deployment)

## 🛠️ Setup and Installation

### 1. Clone the Repository

```bash
git clone https://github.com/maniyadhav997/LoanManager1.git
cd LoanManager1
````

---

### 2. Backend Setup

#### Install Dependencies

```bash
npm install
```

#### Create `.env` File

In the `LoanManager_backend` directory:

```bash
echo. > .env
```

Add the following:

```
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
PORT=5000
```

Replace placeholders with actual values.

#### Run the Backend

```bash
node server.js
```

You should see:

```
Connected to MongoDB
Users seeded successfully
Server running on port 5000
```

---

### 3. Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend runs at: [http://localhost:3000](http://localhost:3000)

Ensure backend (`localhost:5000`) is running for API calls.

---

### 4. Test the Application Locally

Open [http://localhost:3000](http://localhost:3000)

Use these test credentials:

* **User**: `user1 / password123`
* **Admin**: `admin1 / admin123`
* **Verifier**: `verifier1 / verifier123`

✅ Test user loan submission
✅ Admin viewing applications
✅ Verifier approval/rejection

---

## 🌐 Deployment

### Backend on Render

Deployed at: [https://loanmanager1.onrender.com](https://loanmanager1.onrender.com)

**Render Config:**

* **Build Command**: `npm install`
* **Start Command**: `node server.js`
* **Environment Variables**:

  * `MONGO_URI`
  * `JWT_SECRET`
  * `PORT` = 5000

---

### Frontend on Vercel

```bash
cd frontend
vercel
```

Follow prompts for deployment.

**Vercel Config:**

* **Root Directory**: `frontend`
* **Build Command**: `npm run build`
* **Output Directory**: `build`
* Ensure API calls use: `https://loanmanager1.onrender.com`

---

## 📌 API Endpoints

| Method | Endpoint                  | Description                           |
| ------ | ------------------------- | ------------------------------------- |
| POST   | `/api/auth/login`         | Log in and receive JWT                |
| GET    | `/api/auth/me`            | Get current user details              |
| POST   | `/api/submit-application` | Submit a loan application (user)      |
| GET    | `/api/applications`       | Fetch applications (role-based)       |
| PUT    | `/api/applications/:id`   | Approve/reject application (verifier) |

---

## 🛠 Technologies Used

### Backend

* Node.js
* Express
* MongoDB (Mongoose)
* JWT Authentication

### Frontend

* React
* Axios
* React Router
* CSS

### Deployment

* **Backend**: Render
* **Frontend**: Vercel

---

## 🤝 Contributing

1. Fork the repository
2. Create a branch:

   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit changes:

   ```bash
   git commit -m "Add your feature"
   ```
4. Push to GitHub:

   ```bash
   git push origin feature/your-feature
   ```
5. Create a Pull Request

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 📬 Contact

For queries or support, contact **[maniyadhav997](https://github.com/maniyadhav997)**

```

---

```
