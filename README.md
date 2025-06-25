#  MediConnect - Book Your Doctor Online

<div align="center">

![MediConnect Logo](https://img.shields.io/badge/MediConnect-Healthcare%20Platform-blue?style=for-the-badge&logo=medical-cross&logoColor=white)

**Your trusted platform for seamless healthcare appointment booking**

[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=flat-square&logo=mongodb)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

</div>

---

## 📋 Table of Contents

- [🌟 Features](#-features)
- [🏗️ Tech Stack](#️-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
- [🔧 Installation](#-installation)
- [⚙️ Configuration](#️-configuration)
- [📱 Usage](#-usage)
- [🔐 Authentication & Authorization](#-authentication--authorization)
- [💳 Payment Integration](#-payment-integration)
- [🏥 Core Functionalities](#-core-functionalities)
- [🎨 UI/UX Design](#-uiux-design)
- [📊 Database Schema](#-database-schema)
- [🛡️ Security](#️-security)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## 🌟 Features

### 👥 For Patients

- 🔐 Secure registration and login
- 🏥 Browse and search doctors
- 📅 Book appointments with available slots
- 💳 Pay securely via Razorpay
- 📊 Dashboard to manage profile and appointments
- 📱 View past & upcoming appointments
- 🎯 OTP verification for appointment confirmation

### 👨‍⚕️ For Doctors

- 🧾 Create professional profiles
- 📅 Manage availability and slots
- 📊 View upcoming bookings
- 💰 Set and update consultation fees
- 📍 Add and manage clinic locations
- 📸 Upload profile images via Cloudinary

### 🔒 Security & Performance

- 🛡️ JWT-based token authentication
- 🔐 Role-based route access
- 🍪 Secure HTTP-only cookies
- 🔒 Encrypted passwords via Bcrypt
- 🚀 Fast, mobile-first UI

---

## 🏗️ Tech Stack

### Frontend

React 19.1.0
TypeScript 5.8.3
Vite 6.3.5
Tailwind CSS 4.1.10
Material UI 7.1.2
Framer Motion 12.18.1
Zustand 5.0.5
React Router DOM 7.6.2
Axios 1.10.0
React Hot Toast 2.5.2
Lucide React 0.518.0
Swiper 11.2.8


### Backend
Node.js
Express 4.21.2
MongoDB + Mongoose 8.16.0
JWT 9.0.2
Bcrypt 6.0.0
Cloudinary 2.7.0
Razorpay 2.9.6
CORS, Morgan, Cookie Parser, Dotenv

## 📁 Project Structure
```bash 
bookyourdoc/
├── Backend/
│ ├── server.js
│ ├── app.js
│ ├── config/db.js
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middlewares/
│ ├── services/
│ └── package.json
├── Frontend/
│ ├── index.html
│ ├── vite.config.ts
│ ├── src/
│ │ ├── App.tsx, main.tsx
│ │ ├── pages/
│ │ ├── components/
│ │ ├── store/
│ │ └── assets/
│ └── package.json
└── README.md
```

---
## 🚀 Getting Started
### Prerequisites
- Node.js v18+
- npm or pnpm
- MongoDB (local or Atlas)
- Git
---

## 🔧 Installation

```bash
# Clone the repo
git clone https://github.com/TanmmayRJoseph/MediConnect
cd bookyourdoc

# Install backend dependencies
cd Backend
npm install

# Install frontend dependencies
cd ../Frontend
npm install
```

## ⚙️ Configuration
Backend: .env
```bash
PORT=3000
MONGODB_URI=mongodb://localhost:27017/mediconnect
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
FRONTEND_URL=http://localhost:5173
```

## 📱 Usage
```bash
# Backend
cd Backend
npm run dev

# Frontend
cd ../Frontend
npm run dev
```

## 🔐 Authentication & Authorization

### Roles
- 👤 Patient: Book, manage, and view appointments

- 🩺 Doctor: Manage slots, view bookings
### Auth Flow
- Login/Register

- JWT created & stored in HTTP-only cookie

- Protected routes read token

- Role checked to allow/deny access

---
## 💳 Payment Integration
### Razorpay Flow
- Select doctor and slot

- Razorpay order created

- User completes payment

- Payment verified on backend

- Appointment confirmed

## 🏥 Core Functionalities
### Doctor Management
- Create/edit doctor profiles

- Specialty & location filters

- Upload profile photo

### Appointments
- Slot-based booking

- OTP & status verification

- Real-time slot update

### Patient Dashboard
- View appointment history

- Profile update

- Payment tracking

## 📊 Database Schema
### User Model
```js
{
  name: String,
  email: String,
  password: String,
  role: "patient" | "doctor",
  timestamps
}

```
### Doctor Model
```js
{
  userId: ObjectId,
  profilePic: String,
  specialty: String,
  bio: String,
  location: String,
  fees: Number,
  availableSlots: [
    { date: String, time: String, isBooked: Boolean }
  ],
  timestamps
}
```
### Appointment Model
```js
{
  doctorId: ObjectId,
  patientId: ObjectId,
  slot: { date: String, time: String },
  status: "booked" | "cancelled" | "done",
  otp: Number,
  paymentStatus: "pending" | "paid" | "failed",
  paymentInfo: {
    orderId: String,
    paymentId: String,
    signature: String
  },
  timestamps
}

```
## 🤝 Contributing
### Steps
- Fork the repo

- Create a branch
git checkout -b feature/amazing-feature

- Commit
git commit -m 'Add amazing feature'

- Push
git push origin feature/amazing-feature

- Open PR

## 🙏 Acknowledgments
Thanks to:

React, Express, MongoDB, Tailwind CSS

Razorpay & Cloudinary

Open source community ❤️

<div align="center"> ⭐ Star this repo if you found it helpful! 🚀 Made with ❤️ for better healthcare access. </div>