import React, { useEffect, useState } from "react";
import axios from "axios";
import { Mail, ShieldCheck, User } from "lucide-react";
import toast from "react-hot-toast";

interface UserProfileData {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

const UserProfile = () => {
  const [user, setUser] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const res = await axios.get("http://localhost:9000/api/user/profile", {
        withCredentials: true, // ⬅️ reads token from cookie
      });

      setUser(res.data.user);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch user");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-blue-700">Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-600 font-semibold">User data not available</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-md w-full space-y-6">
        <div className="flex items-center gap-4">
          <div className="bg-blue-100 p-3 rounded-full">
            <User className="text-blue-600" size={32} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
            <p className="text-sm text-gray-500">User ID: {user._id}</p>
          </div>
        </div>

        <div className="space-y-4 text-gray-700">
          <div className="flex items-center gap-2">
            <Mail className="text-gray-500" size={20} />
            <span>{user.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="text-gray-500" size={20} />
            <span className="capitalize">Role: {user.role}</span>
          </div>
          <div className="text-sm text-gray-500">
            <p>Joined: {new Date(user.createdAt).toLocaleString()}</p>
            <p>Last Updated: {new Date(user.updatedAt).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
