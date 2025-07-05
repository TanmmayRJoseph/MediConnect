import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Dialog } from "@headlessui/react";
import { User, CalendarDays, Mail } from "lucide-react";

// Interfaces
interface Slot {
  date: string;
  time: string;
  isBooked: boolean;
}

interface Stats {
  totalAppointments: number;
  completed: number;
}

interface Doctor {
  _id: string;
  profilePic: string;
  specialty: string;
  bio: string;
  location: string;
  fees: number;
  availableSlots: Slot[];
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
  // Existing states
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [otp, setOtp] = useState("");
  const [showDialog, setShowDialog] = useState(false);

  // Availability dialog state
  const [availabilityDialogOpen, setAvailabilityDialogOpen] = useState(false);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [submittingSlots, setSubmittingSlots] = useState(false);

  // Fetch appointments
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

  // Fetch stats
  const fetchStats = async () => {
    try {
      const res = await axios.get("http://localhost:9000/api/doctors/statistics", {
        withCredentials: true,
      });
      setStats(res.data);
    } catch (error: any) {
      console.error("❌ Error fetching stats:", error);
      toast.error("Failed to fetch doctor stats");
    } finally {
      setStatsLoading(false);
    }
  };

  // Add slot to local list
  const addSlot = () => {
    if (!currentDate || !currentTime) {
      toast.error("Please provide both date and time");
      return;
    }
    setSlots(prev => [
      ...prev,
      { date: currentDate, time: currentTime, isBooked: false }
    ]);
    setCurrentDate("");
    setCurrentTime("");
  };

  // Submit availability
  const submitAvailability = async () => {
    if (slots.length === 0) {
      toast.error("Add at least one slot");
      return;
    }
    try {
      setSubmittingSlots(true);
      const res = await axios.patch(
        "http://localhost:9000/api/doctor/availability",
        { availableSlots: slots },
        { withCredentials: true }
      );
      toast.success(res.data.message || "Availability updated");
      setSlots([]);
      setAvailabilityDialogOpen(false);
    } catch (err: any) {
      console.error("❌ Availability update failed:", err);
      toast.error(err.response?.data?.message || "Failed to update availability");
    } finally {
      setSubmittingSlots(false);
    }
  };

  // Confirm appointment
  const confirmAppointment = async () => {
    if (!otp || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    if (!selectedAppointment) return;

    try {
      const res = await axios.patch(
        `http://localhost:9000/api/appointments/updateAppointmentStatus/${selectedAppointment._id}`,
        { otp: Number(otp), action: "done" },
        { withCredentials: true }
      );
      toast.success(res.data.message);
      setShowDialog(false);
      setOtp("");
      fetchAppointments();
      fetchStats();
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to confirm appointment");
    }
  };

  useEffect(() => {
    fetchAppointments();
    fetchStats();
  }, []);

  if (loading) {
    return <div className="p-6 text-center text-lg">Loading appointments...</div>;
  }

  const bookedAppointments = appointments.filter((appt) => appt.status === "booked");

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-blue-800">Doctor's Dashboard</h1>

      {/* Button to open availability dialog */}
      <button
        onClick={() => setAvailabilityDialogOpen(true)}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Add Availability
      </button>

      {/* Stats */}
      <div className="bg-white p-4 rounded shadow border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        {statsLoading ? (
          <p className="text-gray-500">Loading stats...</p>
        ) : stats ? (
          <>
            <p className="text-gray-700 font-medium">
              Total Appointments: <span className="font-bold">{stats.totalAppointments}</span>
            </p>
            <p className="text-gray-700 font-medium">
              Completed: <span className="font-bold">{stats.completed}</span>
            </p>
          </>
        ) : (
          <p className="text-red-500">Failed to load stats</p>
        )}
      </div>

      {/* Appointments */}
      <h2 className="text-xl font-semibold text-blue-700">Booked Appointments</h2>

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

      {/* Availability Dialog */}
      <Dialog open={availabilityDialogOpen} onClose={() => setAvailabilityDialogOpen(false)} className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-50">
          <Dialog.Panel className="bg-white rounded-xl p-6 w-full max-w-md space-y-4">
            <Dialog.Title className="text-lg font-semibold">Add Available Slot</Dialog.Title>

            <div className="space-y-2">
              <input
                type="date"
                value={currentDate}
                onChange={(e) => setCurrentDate(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
              <input
                type="time"
                value={currentTime}
                onChange={(e) => setCurrentTime(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
              <button
                onClick={addSlot}
                className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
              >
                Add Slot
              </button>
            </div>

            {slots.length > 0 && (
              <div className="border p-2 rounded bg-gray-50 space-y-1">
                <p className="font-medium">Slots to be added:</p>
                {slots.map((s, idx) => (
                  <div key={idx} className="text-sm text-gray-700">
                    {s.date} at {s.time}
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setAvailabilityDialogOpen(false)}
                className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={submitAvailability}
                disabled={submittingSlots}
                className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
              >
                {submittingSlots ? "Submitting..." : "Submit All Slots"}
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

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
