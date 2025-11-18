# 🛡️ Role-Based E-commerce Admin Dashboard

This project is a sophisticated, production-ready, and fully **responsive Admin Dashboard** for managing an e-commerce platform's Users and Products. It features a complete **Role-Based Access Control (RBAC)** system, full **CRUD** functionality, advanced state management with **Redux Toolkit Query (RTK Query)**, **i18n** (internationalization), and **Light/Dark Theming**.

---

## ✨ Core Features

| Feature | Description | Access Level |
| :--- | :--- | :--- |
| **Role-Based Access** | Strictly enforced permissions for **Admin** (Full CRUD) and **User** (Read-Only). | Admin & User |
| **CRUD Operations** | Complete **C**reate, **R**ead, **U**pdate, **D**elete for Users and Products. | **Admin Only** (for C/U/D) |
| **Search, Filter & Pagination** | Server-side simulated lists with **debounced search** (300ms) and multi-criteria filtering (Role, Category, Price Range). | All |

| **Protected Routing** | Dynamic sidebar navigation and route protection (redirect to **403 Forbidden** page for unauthorized access). | All |
| **Reusable Components** | Atomic component library for UI elements like `Table`, `Modal`, `Button`, and `Input` with validation. | All |

---

## 🚀 Tech Stack

| Category | Technology | Notes |
| :--- | :--- | :--- |
| **Framework** | **React 18+** (with Hooks) | Built with **Vite** for a fast development experience. |
| **Styling** | **Tailwind CSS** | Used for rapid, mobile-first, and utility-driven styling. |
| **Routing** | **React Router v6+** | Used for protected routes and role-based navigation guards. |
| **Notifications** | **React Hot Toast** | Global notifications for success and error messages. |

---

## 🛠️ Setup and Installation

Follow these steps to get the project running locally.

### 1. Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18+) and npm/yarn installed.

### 2. Clone the Repository

```bash
git clone [YOUR_GITHUB_REPOSITORY_LINK]
cd [your-project-folder]
```



## 3. Installation and Running 🛠️

Since the entire application, including the mock data and API logic, is handled by the client codebase using **RTK Query**, only one installation step is required.

---

### Install Dependencies

Navigate to the project root and install all required packages.

```bash
npm install
# or
yarn install
```