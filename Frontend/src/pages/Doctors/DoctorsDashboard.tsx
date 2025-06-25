import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { User, CalendarDays, Mail } from "lucide-react";
import { Dialog } from "@headlessui/react";

// Interfaces
interface Slot {
  date: string;
  time: string;
}

interface Doctor {
  _id: string;
  profilePic: string;
  specialty: string;
  bio: string;
  location: string;
  fees: number;
}

interface Patient {
  _id: string;
  name: string;
  email: string;
  profilePic?: string;
  role: string;
}

interface Appointment {
  _id: string;
  status: "booked" | "cancelled" | "done";
  slot: Slot;
  doctorId: Doctor;
  patientId: Patient;
}

const DoctorsDashboard = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [otp, setOtp] = useState("");
  const [showDialog, setShowDialog] = useState(false);

  const fetchAppointments = async () => {
    try {
      const res = await axios.get("http://localhost:9000/api/appointments/doctorsViewAllAppointments", {
        withCredentials: true,
      });

      const appointments = res.data?.appointments || res.data?.data?.appointments || [];
      setAppointments(appointments);
    } catch (error: any) {
      console.error("❌ Error fetching appointments:", error);
      toast.error("Failed to fetch appointments");
    } finally {
      setLoading(false);
    }
  };

  const confirmAppointment = async () => {
    if (!otp || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    if (!selectedAppointment) return;

    try {
      const res = await axios.patch(
        `http://localhost:9000/api/appointments/updateAppointmentStatus/${selectedAppointment._id}`,
        {otp: Number(otp),   action: "done" },
        { withCredentials: true }
      );
      toast.success(res.data.message);
      setShowDialog(false);
      setOtp("");
      fetchAppointments();
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to confirm appointment");
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  if (loading) {
    return <div className="p-6 text-center text-lg">Loading appointments...</div>;
  }

  const bookedAppointments = appointments.filter((appt) => appt.status === "booked");

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-blue-800">Doctor's Booked Appointments</h1>

      {bookedAppointments.length === 0 ? (
        <p className="text-gray-500">No booked appointments available.</p>
      ) : (
        <div className="space-y-4">
          {bookedAppointments.map((appt) => (
            <div
              key={appt._id}
              className="bg-white shadow border rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <p className="font-semibold text-lg">
                  <User className="inline w-5 h-5 mr-1 text-blue-500" />
                  {appt.patientId.name}
                </p>
                <p className="text-sm text-gray-600">
                  <Mail className="inline w-4 h-4 mr-1 text-gray-400" />
                  {appt.patientId.email}
                </p>
                <p className="text-sm text-gray-600">
                  <CalendarDays className="inline w-4 h-4 mr-1 text-gray-400" />
                  {appt.slot.date} at {appt.slot.time}
                </p>
                <span
                  className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full ${
                    appt.status === "booked"
                      ? "bg-yellow-100 text-yellow-800"
                      : appt.status === "done"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {appt.status}
                </span>
              </div>

              <button
                onClick={() => {
                  setSelectedAppointment(appt);
                  setShowDialog(true);
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Confirm Appointment
              </button>
            </div>
          ))}
        </div>
      )}

      {/* OTP Dialog */}
      <Dialog open={showDialog} onClose={() => setShowDialog(false)} className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-50">
          <Dialog.Panel className="bg-white rounded-xl p-6 w-full max-w-md">
            <Dialog.Title className="text-lg font-semibold mb-2">
              Enter OTP to Confirm Appointment
            </Dialog.Title>
            <input
              type="text"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-2 border rounded-md mb-4"
              placeholder="Enter 6-digit OTP"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowDialog(false)}
                className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmAppointment}
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default DoctorsDashboard;
