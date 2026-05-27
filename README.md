🧑‍💼 Employee Management System (EMS)

A full-stack Employee Management System built using **React** and **Express**.  
This system allows an admin to manage employees, track departments, monitor salaries, and generate reports through a clean dashboard interface.

🚀 Features

🔐 Authentication
- Admin login system
- Token stored in localStorage
- Protected dashboard access

📊 Dashboard
- Total Employees overview
- Total Departments count
- Total Salary computation
- Recent employees table

👨‍💼 Employee Management
- Add new employee
- Edit employee details
- Delete employee
- View employee list in table format

📄 Reports
- Generate downloadable employee report (.txt file)
- Includes:
  - Employee list
  - Total employees
  - Departments count
  - Total salary summary

🎨 UI/UX
- Responsive Ant Design layout
- Sidebar navigation
- Modern dashboard cards
- Clean login page design
- Admin profile header with logout button
  
🛠️ Tech Stack
Frontend
- React JS
- Ant Design
- Axios
- React Router DOM
  
Backend
- Node.js
- Express.js
- REST API

Database 
- MSSQL

⚙️ Installation Guide ⚙️

Follow these steps to run the Employee Management System locally.
📌 Prerequisites
Make sure you have installed:

- Node.js (v16 or higher)
- npm
- Git
- Microsoft SQL Server (MSSQL)
- SQL Server Management Studio (SSMS)
--------------------------------------------------------------------
 1. Clone the Repository

git clone https://github.com/your-username/employee-management-system.git
cd employee-management-system
---------------------------------------------------------------------
2. Database Setup (MS SQL)

Open SSMS and run:
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE employees (
    id INT IDENTITY(1,1) PRIMARY KEY,
    fullname VARCHAR(255) NOT NULL,
    department VARCHAR(100) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    created_at DATETIME DEFAULT GETDATE()
);
CREATE TABLE users (
    id INT IDENTITY(1,1) PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

--------------------------------------------------------------------
3. Backend Setup

cd backend
npm install
npm install mssql

Create db.js:
const sql = require("mssql");

const config = {
    user: "your_username",
    password: "your_password",
    server: "localhost",
    database: "employee_db",
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

module.exports = sql.connect(config);

npm start
----------------------------------------------------------------------
4. Frontend Setup

cd frontend
npm install
npm run dev

npm start
---------------------------------------------------------------------
5. Login Credentials

Username: admin
Password: 123456

----------------------------------------------------------------------

⚠️ Challenges Encountered

During the development of this project, I encountered several challenges:

- This was my first time using **Microsoft SQL Server (MSSQL)**, so setting up the database connection and configuration was initially difficult.
- Configuring the `mssql` package and ensuring proper connection between backend and database required a lot of debugging.
- Handling SQL queries and making sure data is correctly inserted, updated, and deleted was challenging at first.
- Managing API integration between frontend and backend while keeping data in sync required careful state handling.
- Aligning the UI properly using Ant Design components took time to ensure a clean and responsive layout.
- Debugging connection issues between frontend requests and backend responses.

Despite these challenges, I was able to successfully complete the system and improve my understanding of full-stack development using MSSQL and React.

🎥 Demo Video

Watch here: 
