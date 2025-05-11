LoanManager

LoanManager is a full-stack web application for managing loan applications. Users can apply for loans, admins can view all applications, and verifiers can approve or reject applications. The backend is built with Node.js, Express, and MongoDB, while the frontend is built with React.

## Repository Structure

The repository contains both the backend and frontend code in the following structure:

LoanManager_backend/
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

## Features

- **User Role**: Apply for loans and view application status.
- **Admin Role**: View all loan applications with usernames.
- **Verifier Role**: Approve or reject loan applications.
- **Status Styling**: Loan application status is color-coded (green for approved, red for rejected, yellow for pending).
- **Authentication**: JWT-based authentication for secure access.

## Prerequisites

Before running the project, ensure you have the following installed:

- **Node.js** (v14 or later): [Download](https://nodejs.org/)
- **MongoDB**: Either a local MongoDB instance or a cloud instance (e.g., MongoDB Atlas).
- **Git**: To clone the repository.
- **Vercel CLI** (optional, for frontend deployment): `npm install -g vercel`

## Setup and Installation

### 1. Clone the Repository

```bash
git clone https://github.com/maniyadhav997/LoanManager1.git
cd LoanManager1

2. Backend Setup
Install Backend Dependencies:
bash

npm install

Set Up Environment Variables:
Create a .env file in the LoanManager_backend directory:
bash

echo. > .env

Add the following environment variables to .env:

MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
PORT=5000

Replace <your-mongodb-uri> with your MongoDB connection string (e.g., from MongoDB Atlas).

Replace <your-jwt-secret> with a secure secret key for JWT (e.g., a random string).

Run the Backend:
bash

node server.js

The backend should start on http://localhost:5000.

You should see:

Connected to MongoDB
Users seeded successfully
Server running on port 5000

3. Frontend Setup
Navigate to the Frontend Directory:
bash

cd frontend

Install Frontend Dependencies:
bash

npm install

Run the Frontend:
bash

npm start

The React app should start on http://localhost:3000.

Ensure the backend is running, as the frontend makes API calls to http://localhost:5000 (or the deployed backend URL).

4. Test the Application Locally
Open http://localhost:3000 in your browser.

Use the following test credentials to log in:
User: user1 / password123

Admin: admin1 / admin123

Verifier: verifier1 / verifier123

Test the following features:
As a user, apply for a loan and view your applications.

As an admin, view all applications.

As a verifier, approve or reject applications.

Deployment
Backend Deployment (Render)
The backend is deployed on Render at https://loanmanager1.onrender.com.
Push Changes to GitHub:
The backend code is in the root of the repository (LoanManager_backend).

Render is linked to the LoanManager1 repository and auto-deploys on pushes to the main branch.

Render Configuration:
Root Directory: (Leave as root, since backend files are in the root)

Build Command: npm install

Start Command: node server.js

Environment Variables:
MONGO_URI: Your MongoDB connection string.

JWT_SECRET: Your JWT secret key.

PORT: 5000 (or as required by Render).

Frontend Deployment (Vercel)
The frontend is deployed on Vercel.
Deploy to Vercel:
Navigate to the frontend directory:
bash

cd frontend
vercel

Follow the prompts to deploy the frontend.

Vercel will detect the React app and configure it automatically.

Vercel Configuration:
Root Directory: frontend

Build Command: npm run build

Output Directory: build

Ensure the frontend API calls point to the deployed backend URL (https://loanmanager1.onrender.com).

Link Vercel to GitHub:
In the Vercel dashboard, connect your GitHub repository (maniyadhav997/LoanManager1).

Set the Root Directory to frontend.

Vercel will auto-deploy the frontend on pushes to the main branch.

API Endpoints
POST /api/auth/login: Log in and get a JWT token.
Body: { "username": "user1", "password": "password123" }

GET /api/auth/me: Get the logged-in user's details (requires token).

POST /api/submit-application: Submit a new loan application (user only).

GET /api/applications: Get loan applications (user: own applications; admin/verifier: all applications).

PUT /api/applications/:id: Update application status (verifier only).

Technologies Used
Backend:
Node.js

Express

MongoDB (with Mongoose)

JWT for authentication

Frontend:
React

Axios for API calls

React Router for navigation

CSS for styling

Deployment:
Backend: Render

Frontend: Vercel

Contributing
Fork the repository.

Create a new branch: git checkout -b feature/your-feature.

Make your changes and commit: git commit -m "Add your feature".

Push to your branch: git push origin feature/your-feature.

Create a pull request.

License
This project is licensed under the MIT License.
Contact
For any issues or inquiries, please contact maniyadhav997.

---

### **Step 2: Stage, Commit, and Push the `README.md`**

1. **Stage the `README.md` File**:
   ```powershell
   git add README.md

Commit the Changes:
powershell

git commit -m "Add README.md with project setup and deployment instructions"

Push to GitHub:
powershell

git push origin main

Step 3: Verify on GitHub
Go to https://github.com/maniyadhav997/LoanManager1.

Confirm that the README.md file is present in the root of the repository.

GitHub will render the Markdown content. Ensure the formatting looks good and all links (e.g., to Node.js download) work.

Step 4: Test the Setup Instructions
To ensure the README.md instructions are accurate, follow them to set up a fresh clone of the repository:
Clone the Repository:
powershell

git clone https://github.com/maniyadhav997/LoanManager1.git
cd LoanManager1

Set Up the Backend:
Follow the backend setup steps (install dependencies, set up .env, run the server).

Ensure it starts on http://localhost:5000.

Set Up the Frontend:
Follow the frontend setup steps (navigate to frontend, install dependencies, run the app).

Ensure it starts on http://localhost:3000 and communicates with the backend.

Test the Application:
Log in with the test credentials and verify all features work.

If you encounter any issues, update the README.md accordingly and push the changes.
Step 5: Delete the Empty LoanManager_frontend Folder (Optional)
Since LoanManager_frontend is now empty, you can delete it to clean up your local directory:
powershell

cd C:\Users\yadav\OneDrive\Desktop\LoanManager
rmdir LoanManager_frontend

This step doesn’t affect the Git repository, as LoanManager_frontend was never part of it.

