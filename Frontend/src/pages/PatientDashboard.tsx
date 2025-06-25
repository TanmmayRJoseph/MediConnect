import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import toast from "react-hot-toast";
import { CalendarDays, User, Stethoscope } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PatientDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [upcoming, setUpcoming] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Load Razorpay script
  useEffect(() => {
    const razorpayScriptId = "razorpay-checkout-js";
    if (!document.getElementById(razorpayScriptId)) {
      const script = document.createElement("script");
      script.id = razorpayScriptId;
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // ✅ Fetch profile + appointments
  useEffect(() => {
    const fetchUserAndAppointments = async () => {
      try {
        const userRes = await axios.get(
          "http://localhost:9000/api/user/profile",
          { withCredentials: true }
        );
        setUser(userRes.data.user);

        if (userRes.data.user.role === "patient") {
          const apptRes = await axios.get(
            "http://localhost:9000/api/appointments/my-appointments",
            { withCredentials: true }
          );

          const futureAppointments = apptRes.data.appointments.filter(
            (appt: any) => new Date(appt.slot.date) >= new Date()
          );

          setUpcoming(futureAppointments);
        }
      } catch (err: any) {
        toast.error(err.response?.data?.message || "Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndAppointments();
  }, []);

  // ✅ Handle Razorpay Payment
  const handlePayment = async (appt: any) => {
    try {
      const res = await axios.post(
        "http://localhost:9000/api/payment",
        {
          appointmentId: appt._id,
          fees: appt.doctorId.fees,
        },
        { withCredentials: true }
      );

      const { orderId, amount, currency } = res.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_123456",
        amount: amount.toString(),
        currency,
        name: "DocLink",
        description: "Appointment Payment",
        image: "/logo.png",
        order_id: orderId,
        handler: async function (response: any) {
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
            response;

          const verifyRes = await axios.post(
            "http://localhost:9000/api/verify",
            {
              appointmentId: appt._id,
              paymentId: razorpay_payment_id,
              orderId: razorpay_order_id,
              signature: razorpay_signature,
            },
            { withCredentials: true }
          );

          if (verifyRes.data.success) {
            toast.success("Payment successful!");
            window.location.reload();
          } else {
            toast.error("Payment verification failed");
          }
        },
        prefill: {
          name: appt.patientId.name,
          email: appt.patientId.email,
        },
        theme: {
          color: "#1e40af",
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err: any) {
      console.error("Payment error", err);
      toast.error(err.response?.data?.message || "Payment failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />

      <main className="pl-64 p-6">
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <p className="text-gray-600 text-lg">Loading your dashboard...</p>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto space-y-8">
            <h1 className="text-2xl font-bold text-blue-800">
              Welcome back, {user?.name} 👋
            </h1>

            {/* Quick Action Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div
                onClick={() => navigate("/doctors")}
                className="cursor-pointer p-6 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 transition"
              >
                <Stethoscope className="w-8 h-8 text-blue-600 mb-2" />
                <h2 className="font-semibold text-lg">
                  Book a New Appointment
                </h2>
                <p className="text-sm text-zinc-500">
                  Find and book slots with doctors
                </p>
              </div>

              <div
                onClick={() => navigate("/patient-dashboard/appointments")}
                className="cursor-pointer p-6 rounded-xl bg-green-50 hover:bg-green-100 border border-green-200 transition"
              >
                <CalendarDays className="w-8 h-8 text-green-600 mb-2" />
                <h2 className="font-semibold text-lg">My Appointments</h2>
                <p className="text-sm text-zinc-500">
                  View your appointment history
                </p>
              </div>

              <div
                onClick={() => navigate("/patient-dashboard/profile")}
                className="cursor-pointer p-6 rounded-xl bg-yellow-50 hover:bg-yellow-100 border border-yellow-200 transition"
              >
                <User className="w-8 h-8 text-yellow-600 mb-2" />
                <h2 className="font-semibold text-lg">Edit Profile</h2>
                <p className="text-sm text-zinc-500">
                  Update your personal information
                </p>
              </div>
            </div>

            {/* Upcoming Appointments */}
            <div className="mt-8 space-y-4">
              <h2 className="text-xl font-semibold text-blue-800">
                Your Upcoming Appointments
              </h2>
              {upcoming.length > 0 ? (
                upcoming.map((appt: any) => (
                  <div
                    key={appt._id}
                    className="p-4 border rounded-xl shadow-sm bg-white flex flex-col md:flex-row gap-4 items-start"
                  >
                    <img
                      src={
                        appt.doctorId?.profilePic?.startsWith(
                          "https://res.cloudinary.com"
                        )
                          ? appt.doctorId.profilePic
                          : "/avatar.png"
                      }
                      alt="Doctor"
                      className="w-20 h-20 rounded-full object-cover border"
                    />
                    <div className="flex-1">
                      <p className="font-semibold">
                        {appt.doctorId.userId?.name}
                      </p>
                      <p className="text-sm text-zinc-600">
                        {appt.doctorId.specialty}
                      </p>
                      <p className="text-sm text-zinc-600">
                        {appt.doctorId.location}
                      </p>
                      <p className="text-sm">
                        <strong>Date:</strong> {appt.slot.date}
                      </p>
                      <p className="text-sm">
                        <strong>Time:</strong> {appt.slot.time}
                      </p>
                      <p className="text-sm">
                        <strong>Fees:</strong> ₹{appt.doctorId.fees}
                      </p>
                      <p className="text-sm font-medium text-green-600">
                        {appt.status.toUpperCase()}
                      </p>
                      <p className="text-sm font-medium text-blue-600">
                        <strong>OTP</strong>: {appt.otp}
                      </p>

                      {/* ✅ Show Pay Now only if not already paid */}
                      {appt.paymentStatus !== "paid" && (
                        <button
                          onClick={() => handlePayment(appt)}
                          className="mt-2 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                        >
                          Pay Now
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-zinc-500">No upcoming appointments found.</p>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default PatientDashboard;