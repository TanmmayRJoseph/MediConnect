--- README.md
+++ README.md
@@ -0,0 +1,508 @@
+# 🏥 MediConnect - Book Your Doctor Online
+
+<div align="center">
+  
+  ![MediConnect Logo](https://img.shields.io/badge/MediConnect-Healthcare%20Platform-blue?style=for-the-badge&logo=medical-cross&logoColor=white)
+  
+  **Your trusted platform for seamless healthcare appointment booking**
+  
+  [![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
+  [![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
+  [![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js)](https://nodejs.org/)
+  [![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=flat-square&logo=mongodb)](https://www.mongodb.com/)
+  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
+
+</div>
+
+---
+
+## 📋 Table of Contents
+
+- [🌟 Features](#-features)
+- [🏗️ Tech Stack](#️-tech-stack)
+- [📁 Project Structure](#-project-structure)
+- [🚀 Getting Started](#-getting-started)
+- [🔧 Installation](#-installation)
+- [⚙️ Configuration](#️-configuration)
+- [📱 Usage](#-usage)
+- [🔐 Authentication & Authorization](#-authentication--authorization)
+- [💳 Payment Integration](#-payment-integration)
+- [🏥 Core Functionalities](#-core-functionalities)
+- [🎨 UI/UX Design](#-uiux-design)
+- [📊 Database Schema](#-database-schema)
+- [🛡️ Security](#️-security)
+- [🤝 Contributing](#-contributing)
+- [📄 License](#-license)
+
+---
+
+## 🌟 Features
+
+### 👥 **For Patients**
+- 🔐 **User Authentication** - Secure registration and login system
+- 🏥 **Doctor Discovery** - Browse and search qualified healthcare professionals
+- 📅 **Appointment Booking** - Easy scheduling with available time slots
+- 💳 **Secure Payments** - Integrated Razorpay payment gateway
+- 📊 **Patient Dashboard** - Manage appointments and profile
+- 📱 **Appointment History** - Track past and upcoming appointments
+- 🎯 **OTP Verification** - Secure appointment verification system
+
+### 👨‍⚕️ **For Doctors**
+- 🏥 **Doctor Profiles** - Comprehensive professional profiles
+- 📅 **Schedule Management** - Set availability and manage time slots
+- 📊 **Appointment Dashboard** - View and manage patient appointments
+- 💰 **Fee Management** - Set consultation fees
+- 📍 **Location Services** - Manage clinic locations
+- 📸 **Profile Pictures** - Upload and manage profile images via Cloudinary
+
+### 🔒 **Security & Performance**
+- 🛡️ **JWT Authentication** - Secure token-based authentication
+- 🔐 **Role-Based Access Control** - Separate access for patients and doctors
+- 🍪 **Cookie Management** - Secure session handling
+- 🔒 **Password Encryption** - BCrypt password hashing
+- 🚀 **Optimized Performance** - Fast loading and responsive design
+
+---
+
+## 🏗️ Tech Stack
+
+### **Frontend**
+```
+React 19.1.0          - Modern UI framework
+TypeScript 5.8.3      - Type-safe JavaScript
+Vite 6.3.5            - Fast build tool and dev server
+Tailwind CSS 4.1.10   - Utility-first CSS framework
+Material UI 7.1.2     - React component library
+Framer Motion 12.18.1 - Animation library
+Zustand 5.0.5         - State management
+React Router DOM 7.6.2 - Client-side routing
+Axios 1.10.0          - HTTP client
+React Hot Toast 2.5.2 - Toast notifications
+Lucide React 0.518.0  - Icon library
+Swiper 11.2.8         - Touch slider component
+```
+
+### **Backend**  
+```
+Node.js               - JavaScript runtime
+Express 4.21.2        - Web application framework
+MongoDB               - NoSQL database
+Mongoose 8.16.0       - MongoDB object modeling
+JWT 9.0.2             - JSON Web Token authentication
+BCrypt 6.0.0          - Password hashing
+Cloudinary 2.7.0      - Image and video management
+Razorpay 2.9.6        - Payment gateway integration
+CORS 2.8.5            - Cross-origin resource sharing
+Morgan 1.10.0         - HTTP request logger
+Cookie Parser 1.4.7   - Cookie parsing middleware
+Dotenv 16.5.0         - Environment variable management
+```
+
+---
+
+## 📁 Project Structure
+
+```
+bookyourdoc/
+├── 📂 Backend/
+│   ├── 📄 server.js                 # Server entry point
+│   ├── 📄 app.js                    # Express app configuration
+│   ├── 📂 config/
+│   │   └── 📄 db.js                 # Database connection
+│   ├── 📂 controllers/
+│   │   ├── 📄 user.controller.js    # User operations
+│   │   ├── 📄 doctor.controller.js  # Doctor operations
+│   │   ├── 📄 appointment.controller.js
+│   │   └── 📄 payments.controller.js
+│   ├── 📂 models/
+│   │   ├── 📄 user.model.js         # User schema
+│   │   ├── 📄 doctor.model.js       # Doctor schema
+│   │   └── 📄 appointment.model.js  # Appointment schema
+│   ├── 📂 routes/
+│   │   ├── 📄 user.route.js         # User API routes
+│   │   ├── 📄 doctor.route.js       # Doctor API routes
+│   │   ├── 📄 appointment.route.js  # Appointment API routes
+│   │   └── 📄 payment.route.js      # Payment API routes
+│   ├── 📂 middlewares/
+│   │   └── 📄 authRoles.js          # Authentication middleware
+│   ├── 📂 services/
+│   │   ├── 📄 cloudinary.service.js # Image upload service
+│   │   ├── 📄 razorpay.service.js   # Payment service
+│   │   └── 📄 user.service.js       # User business logic
+│   └── 📄 package.json
+│
+├── 📂 Frontend/
+│   ├── 📄 index.html                # Entry HTML
+│   ├── 📄 vite.config.ts           # Vite configuration
+│   ├── 📂 src/
+│   │   ├── 📄 App.tsx               # Main app component
+│   │   ├── 📄 main.tsx              # React DOM entry
+│   │   ├── 📂 pages/
+│   │   │   ├── 📄 Home.tsx          # Landing page
+│   │   │   ├── 📄 LoginPage.tsx     # User login
+│   │   │   ├── 📄 RegisterPage.tsx  # User registration
+│   │   │   ├── 📄 AllDoctorListPage.tsx
+│   │   │   ├── 📄 DoctorProfile.tsx
+│   │   │   ├── 📄 PatientDashboard.tsx
+│   │   │   ├── 📄 UserProfilePage.tsx
+│   │   │   ├── 📄 PatientsAppointment.tsx
+│   │   │   ├── 📄 DoctorLoginPage.tsx
+│   │   │   └── 📂 Doctors/
+│   │   │       └── 📄 DoctorsDashboard.tsx
+│   │   ├── 📂 components/
+│   │   │   ├── 📄 DoctorCard.tsx
+│   │   │   ├── 📄 Sidebar.tsx
+│   │   │   ├── 📄 ProtectedUserRoute.tsx
+│   │   │   └── 📄 ProtectedDoctorRoute.tsx
+│   │   ├── 📂 store/
+│   │   │   └── 📄 authStore.ts       # Zustand auth store
+│   │   └── 📂 assets/
+│   └── 📄 package.json
+│
+└── 📄 README.md
+```
+
+---
+
+## 🚀 Getting Started
+
+### Prerequisites
+
+Ensure you have the following installed:
+- **Node.js** (v18 or later)
+- **npm** or **pnpm**
+- **MongoDB** (local or cloud)
+- **Git**
+
+### 🔧 Installation
+
+1. **Clone the repository**
+```bash
+git clone https://github.com/yourusername/bookyourdoc.git
+cd bookyourdoc
+```
+
+2. **Install Backend Dependencies**
+```bash
+cd Backend
+npm install
+```
+
+3. **Install Frontend Dependencies**
+```bash
+cd ../Frontend
+npm install
+```
+
+---
+
+## ⚙️ Configuration
+
+### **Backend Environment Variables**
+
+Create a `.env` file in the `Backend` directory:
+
+```env
+# Server Configuration
+PORT=3000
+NODE_ENV=development
+
+# Database
+MONGODB_URI=mongodb://localhost:27017/mediconnect
+# or for MongoDB Atlas:
+# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mediconnect
+
+# JWT Configuration
+JWT_SECRET=your_super_secret_jwt_key_here
+JWT_EXPIRES_IN=7d
+
+# Cloudinary Configuration (for image uploads)
+CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
+CLOUDINARY_API_KEY=your_cloudinary_api_key
+CLOUDINARY_API_SECRET=your_cloudinary_api_secret
+
+# Razorpay Configuration (for payments)
+RAZORPAY_KEY_ID=your_razorpay_key_id
+RAZORPAY_KEY_SECRET=your_razorpay_key_secret
+
+# Frontend URL (for CORS)
+FRONTEND_URL=http://localhost:5173
+```
+
+### **Frontend Configuration**
+
+The frontend connects to the backend at `http://localhost:3000` by default. Update API endpoints in your axios configurations if needed.
+
+---
+
+## 📱 Usage
+
+### **Starting the Application**
+
+1. **Start the Backend Server**
+```bash
+cd Backend
+npm run dev
+```
+Server will run on: `http://localhost:3000`
+
+2. **Start the Frontend Development Server**
+```bash
+cd Frontend
+npm run dev
+```
+Application will be available at: `http://localhost:5173`
+
+### **API Endpoints**
+
+#### **User Authentication**
+```
+POST /api/register          # User registration
+POST /api/login             # User login
+POST /api/logout            # User logout
+GET  /api/profile           # Get user profile
+```
+
+#### **Doctor Management**
+```
+GET    /api/doctors         # Get all doctors
+GET    /api/doctors/:id     # Get doctor by ID
+POST   /api/doctors         # Create doctor profile
+PUT    /api/doctors/:id     # Update doctor profile
+DELETE /api/doctors/:id     # Delete doctor profile
+```
+
+#### **Appointment Management**
+```
+GET    /api/appointments       # Get user appointments
+POST   /api/appointments       # Book appointment
+PUT    /api/appointments/:id   # Update appointment
+DELETE /api/appointments/:id   # Cancel appointment
+```
+
+#### **Payment Processing**
+```
+POST /api/payments/create-order    # Create Razorpay order
+POST /api/payments/verify-payment  # Verify payment
+```
+
+---
+
+## 🔐 Authentication & Authorization
+
+### **User Roles**
+- **Patient**: Can book appointments, view doctors, manage profile
+- **Doctor**: Can manage appointments, update availability, view patient details
+
+### **Protected Routes**
+- Patient routes require `patient` role authentication
+- Doctor routes require `doctor` role authentication
+- JWT tokens are stored in HTTP-only cookies for security
+
+### **Authentication Flow**
+1. User registers/logs in
+2. Server generates JWT token
+3. Token stored in HTTP-only cookie
+4. Protected routes verify token and user role
+5. Access granted based on role permissions
+
+---
+
+## 💳 Payment Integration
+
+### **Razorpay Integration**
+- Secure payment processing for appointment fees
+- Order creation and payment verification
+- Automatic appointment confirmation on successful payment
+- Payment status tracking in appointment records
+
+### **Payment Flow**
+1. User selects appointment slot
+2. System creates Razorpay order
+3. User completes payment via Razorpay
+4. Payment verification on server
+5. Appointment confirmed and slot marked as booked
+
+---
+
+## 🏥 Core Functionalities
+
+### **Doctor Management**
+- **Profile Creation**: Doctors can create comprehensive profiles
+- **Specialty Selection**: Multiple medical specialties supported
+- **Schedule Management**: Flexible time slot management
+- **Fee Setting**: Customizable consultation fees
+- **Image Upload**: Profile picture upload via Cloudinary
+
+### **Appointment System**
+- **Slot-based Booking**: Time-slot based appointment system
+- **Real-time Availability**: Live slot availability updates
+- **OTP Verification**: Secure appointment verification
+- **Status Tracking**: Track appointment status (booked/cancelled/done)
+- **History Management**: Complete appointment history
+
+### **Patient Dashboard**
+- **Appointment Overview**: View all appointments
+- **Doctor Search**: Find doctors by specialty/location
+- **Profile Management**: Update personal information
+- **Payment History**: Track payment records
+
+---
+
+## 🎨 UI/UX Design
+
+### **Design System**
+- **Color Scheme**: Blue-based medical theme
+- **Typography**: Clean, readable fonts
+- **Responsive Design**: Mobile-first approach
+- **Accessibility**: WCAG compliant design principles
+
+### **Key Components**
+- **DoctorCard**: Reusable doctor profile cards
+- **Sidebar**: Navigation component for dashboards
+- **Protected Routes**: Role-based route protection
+- **Toast Notifications**: User feedback system
+
+### **Animations**
+- **Framer Motion**: Smooth page transitions
+- **Loading States**: Enhanced user experience
+- **Micro-interactions**: Button hover effects and form interactions
+
+---
+
+## 📊 Database Schema
+
+### **User Model**
+```javascript
+{
+  name: String,
+  email: String (unique),
+  password: String (hashed),
+  role: Enum["patient", "doctor"],
+  timestamps
+}
+```
+
+### **Doctor Model**
+```javascript
+{
+  userId: ObjectId (ref: User),
+  profilePic: String,
+  specialty: String,
+  bio: String,
+  location: String,
+  fees: Number,
+  availableSlots: [{
+    date: String,
+    time: String,
+    isBooked: Boolean
+  }],
+  timestamps
+}
+```
+
+### **Appointment Model**
+```javascript
+{
+  doctorId: ObjectId (ref: Doctor),
+  patientId: ObjectId (ref: User),
+  slot: {
+    date: String,
+    time: String
+  },
+  status: Enum["booked", "cancelled", "done"],
+  otp: Number,
+  paymentStatus: Enum["pending", "paid", "failed"],
+  paymentInfo: {
+    orderId: String,
+    paymentId: String,
+    signature: String
+  },
+  timestamps
+}
+```
+
+---
+
+## 🛡️ Security
+
+### **Security Measures**
+- **Password Hashing**: BCrypt with salt rounds
+- **JWT Authentication**: Secure token-based auth
+- **HTTP-Only Cookies**: Prevent XSS attacks
+- **CORS Configuration**: Controlled cross-origin requests
+- **Input Validation**: Server-side data validation
+- **Environment Variables**: Sensitive data protection
+
+### **Best Practices**
+- Regular security updates
+- Secure API endpoints
+- Rate limiting (can be implemented)
+- Input sanitization
+- Error handling without information leakage
+
+---
+
+## 🤝 Contributing
+
+We welcome contributions! Please follow these steps:
+
+1. **Fork the repository**
+2. **Create a feature branch**
+   ```bash
+   git checkout -b feature/amazing-feature
+   ```
+3. **Commit your changes**
+   ```bash
+   git commit -m 'Add some amazing feature'
+   ```
+4. **Push to the branch**
+   ```bash
+   git push origin feature/amazing-feature
+   ```
+5. **Open a Pull Request**
+
+### **Development Guidelines**
+- Follow TypeScript/JavaScript best practices
+- Write meaningful commit messages
+- Add comments for complex logic
+- Test your changes thoroughly
+- Update documentation when needed
+
+---
+
+## 📄 License
+
+This project is licensed under the ISC License. See the `LICENSE` file for details.
+
+---
+
+## 🙏 Acknowledgments
+
+- **React Team** for the amazing framework
+- **Express.js** for the robust backend framework
+- **MongoDB** for the flexible database solution
+- **Tailwind CSS** for the utility-first CSS framework
+- **Material-UI** for the beautiful React components
+- **Razorpay** for the secure payment gateway
+- **Cloudinary** for the image management service
+
+---
+
+## 📞 Support & Contact
+
+For support, email tanmmayrj@gmail.com or create an issue on GitHub.
+
+---
+
+<div align="center">
+  
+**⭐ Star this repository if you found it helpful!**
+
+**Made with ❤️ for better healthcare accessibility**
+
+</div>
+
+---
+
+*Last updated: June 2025*