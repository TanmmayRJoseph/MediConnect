import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore"; // adjust the path if needed

const PatientProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { authUser, isAuthLoading, checkingAuth }:any = useAuthStore();

  useEffect(() => {
    if (!authUser) {
      checkingAuth();
    }
  }, []);

  useEffect(() => {
    if (!isAuthLoading) {
      if (!authUser) {
        navigate("/login");
      } else if (authUser.role !== "patient") {
        navigate("/doctor-dashboard");
      }
    }
  }, [authUser, isAuthLoading]);

  if (isAuthLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        Checking authentication...
      </div>
    );
  }

  return <>{children}</>;
};

export default PatientProtectedRoute;
