import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

interface Appointment {
  _id: string;
  status: string;
  slot: {
    date: string;
    time: string;
  };
  doctorId: {
    _id: string;
    profilePic: string;
    specialty: string;
    bio: string;
    location: string;
    fees: number;
  };
}

const MyAppointmentsPage = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get("http://localhost:9000/api/appointments/my-appointments", {
          withCredentials: true,
        });
        setAppointments(res.data.appointments);
      } catch (err: any) {
        toast.error(err.response?.data?.message || "Failed to load appointments");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin w-6 h-6 text-blue-500" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-blue-800 mb-6 text-center">My Appointments</h1>

      {appointments.length === 0 ? (
        <p className="text-center text-zinc-500">You have no upcoming appointments.</p>
      ) : (
        <div className="grid gap-6">
          {appointments.map((appt) => {
            const profilePic = appt.doctorId.profilePic;
            const avatar = profilePic?.startsWith("https://res.cloudinary.com")
              ? profilePic
              : "/avatar.png";

            return (
              <div
                key={appt._id}
                className="bg-white shadow-md rounded-xl p-5 border flex flex-col md:flex-row gap-6"
              >
                <img
                  src={avatar}
                  alt="Doctor"
                  className="w-28 h-28 rounded-full object-cover border"
                />

                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-blue-700 mb-1">
                    {appt.doctorId.specialty}
                  </h2>
                  <p className="text-sm text-zinc-600 mb-2 line-clamp-2">
                    {appt.doctorId.bio}
                  </p>
                  <p className="text-sm text-zinc-500">📍 {appt.doctorId.location}</p>
                </div>

                <div className="flex flex-col justify-between text-right">
                  <p className="text-sm">
                    <span className="font-semibold">Date:</span> {appt.slot.date}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Time:</span> {appt.slot.time}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Fees:</span> ₹{appt.doctorId.fees}
                  </p>
                  <p
                    className={`text-sm font-semibold ${
                      appt.status === "booked" ? "text-green-600" : "text-yellow-500"
                    }`}
                  >
                    {appt.status.toUpperCase()}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyAppointmentsPage;
