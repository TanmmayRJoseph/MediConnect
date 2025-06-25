import { Link, useLocation } from "react-router-dom";
import {
  CalendarClock,
  LayoutDashboard,
  UserCircle,
  PlusCircle,
  LogOut,
} from "lucide-react";
import { Button } from "@mui/material";
import { useAuthStore } from "../store/authStore";

const Sidebar = () => {
  const location = useLocation();
  const { logout }: any = useAuthStore();
  const navItems = [
    {
      name: "Dashboard",
      path: "/patient-dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      name: "My Appointments",
      path: "/patient-dashboard/appointments",
      icon: <CalendarClock className="w-5 h-5" />,
    },
    {
      name: "Book New",
      path: "/doctors",
      icon: <PlusCircle className="w-5 h-5" />,
    },
    {
      name: "View Profile",
      path: "/patient-dashboard/profile",
      icon: <UserCircle className="w-5 h-5" />,
    },
    {
      name: "Login as Doctor",
      path: "/doctors/login",
      icon: <UserCircle className="w-5 h-5" />,
    },
  ];

  return (
    <div className="h-screen w-64 bg-white border-r border-gray-200 p-6 shadow-md fixed left-0 top-0 flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">
          MediConnect
        </h2>
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-blue-50 text-sm font-medium ${
                  location.pathname === item.path
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600"
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <Button
        variant="outlined"
        startIcon={<LogOut className="w-5 h-5" />}
        className="w-full"
        onClick={logout}
      >
        Logout
      </Button>
    </div>
  );
};

export default Sidebar;
