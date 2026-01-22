# Jerry's Portfolio

## 📌 Project Overview

Jerry's Portfolio is a **production-ready full-stack portfolio application** built with **Next.js 16**, combining a modern frontend with a secure backend to showcase projects, manage content, and handle visitor inquiries seamlessly.

The application is designed with scalability, maintainability, and developer experience in mind, making it suitable for both personal branding and professional use.

---

## ✨ Key Features

### 🔐 Authentication & Authorization

* Secure admin authentication powered by **NextAuth.js**
* Role-based access for managing portfolio content

### 🛠 Admin Dashboard

* Intuitive admin interface for managing portfolio projects
* Create, read, update, and manage showcased work
* Seeded data support for rapid setup and testing

### 📂 Project Management API

* RESTful API endpoints for portfolio projects
* Fully typed API routes using **TypeScript**
* Prisma-powered data access layer

### 📬 Contact System

* Fully functional contact form
* Backend API endpoint to process visitor inquiries securely

### 🗄 Database & ORM

* **SQLite** database for lightweight and efficient storage
* **Prisma ORM** for schema management, migrations, and type-safe queries

### 🎨 Frontend & UI

* Built with **React 19** and **Tailwind CSS**
* Smooth animations using **Framer Motion**
* Fully responsive design across all devices
* Modular UI components including:

  * Hero
  * About
  * Portfolio Showcase
  * Contact Form
  * Navigation
  * Footer

### 🧪 Testing & Quality Assurance

* Automated testing using **Jest** and **React Testing Library**
* Component and API-level test coverage
* **ESLint** configuration for consistent code quality

### 🐳 DevOps & Deployment

* Dockerized setup using **Docker** and **docker-compose**
* Consistent local and production environments
* Optimized for deployment on **Render**
* Environment variable support for secure configuration
* Persistent storage configuration for production database

---

## 🧰 Tech Stack

| Layer      | Technology                                        |
| ---------- | ------------------------------------------------- |
| Frontend   | Next.js 16, React 19, Tailwind CSS, Framer Motion |
| Backend    | Next.js API Routes, NextAuth.js                   |
| Database   | SQLite                                            |
| ORM        | Prisma                                            |
| Language   | TypeScript                                        |
| Testing    | Jest, React Testing Library                       |
| DevOps     | Docker, Docker Compose                            |
| Deployment | Render                                            |

---

## 🚀 Getting Started

### Prerequisites

* Node.js (v18+ recommended)
* Docker & Docker Compose (optional but recommended)

### Installation

```bash
# Install dependencies
npm install

# Run database migrations
npx prisma migrate dev

# Seed the database (optional)
npx prisma db seed

# Start the development server
npm run dev
```

### Using Docker

```bash
docker-compose up --build
```

---

## 🔐 Environment Variables

Create a `.env` file and configure the following:

```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000
```

(Additional variables may be required for production deployment on Render.)

---

## 📦 Deployment

* Configured for **Render** with production-ready settings
* Supports persistent storage for the SQLite database
* Uses environment variables for secure configuration

---

## 📈 Future Improvements

* Role-based permissions for multiple admins
* Analytics dashboard for portfolio views
* CMS-style content editing
* Migration to PostgreSQL for large-scale deployments

---

## 📝 License

This project is open-source and available under the **MIT License**.

---

## 👤 Author

**Courage Dei** – Full-Stack Developer

Feel free to fork, customize, and use this project as a foundation for your own professional portfolio.
