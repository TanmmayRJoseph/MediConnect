import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useAuthStore } from "./store/authStore";
// Pages
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import Doctors from "./pages/AllDoctorListPage";
import RegisterPage from "./pages/RegisterPage";
import DoctorDetailPage from "./pages/DoctorProfile";
import PatientDashboard from "./pages/PatientDashboard";
import JoinAsDoctorPage from "./pages/DoctorLoginPage";
import UserProfile from "./pages/UserProfilePage";
import DoctorsDashboard from "./pages/Doctors/DoctorsDashboard";
import MyAppointmentsPage from "./pages/PatientsAppointment";
import PatientProtectedRoute from "./components/ProtectedUserRoute";
import DoctorProtectedRoute from "./components/ProtectedDoctorRoute";

function App() {
  const { authUser, checkingAuth, isAuthLoading }: any = useAuthStore();

  useEffect(() => {
    checkingAuth();
  }, [checkingAuth]);
  console.log(authUser);

  // Show loading screen until auth check finishes
  if (isAuthLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <p className="text-lg text-blue-700 font-semibold">
          Checking authentication...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      <Routes>


        
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            !authUser ? <LoginPage /> : <Navigate to="/patient-dashboard" />
          }
        />
        <Route
          path="/register"
          element={
            !authUser ? <RegisterPage /> : <Navigate to="/patient-dashboard" />
          }
        />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:id" element={<DoctorDetailPage />} />
        <Route path="/doctors/login" element={<JoinAsDoctorPage />} />

        {/* Protected Route for patients */}
        <Route
          path="/patient-dashboard"
          element={
            <PatientProtectedRoute>
              <PatientDashboard />
            </PatientProtectedRoute>
          }
        />

        <Route
          path="/patient-dashboard/profile"
          element={
            <PatientProtectedRoute>
              <UserProfile />
            </PatientProtectedRoute>
          }
        />

        <Route
          path="/patient-dashboard/appointments"
          element={
            <PatientProtectedRoute>
              <MyAppointmentsPage />
            </PatientProtectedRoute>
          }
        />

        {/* Doctors routes */}
        <Route
          path="/doctor-dashboard"
          element={
            <DoctorProtectedRoute>
              <DoctorsDashboard />
            </DoctorProtectedRoute>
          }
        />
      </Routes>

      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
    </div>
  );
}

export default App;
