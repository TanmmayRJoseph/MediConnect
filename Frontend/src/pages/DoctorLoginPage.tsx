import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Loader2, Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";

const JoinAsDoctorPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [profilePic, setProfilePic] = useState<string | null>(null);

  const [form, setForm] = useState({
    specialty: "",
    bio: "",
    location: "",
    fees: "",
    availableSlots: [{ date: "", time: "" }],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSlotChange = (index: number, key: string, value: string) => {
    const newSlots: any = [...form.availableSlots];
    newSlots[index][key] = value;
    setForm((prev) => ({ ...prev, availableSlots: newSlots }));
  };

  const addSlot = () => {
    setForm((prev) => ({
      ...prev,
      availableSlots: [...prev.availableSlots, { date: "", time: "" }],
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePic(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const validateForm = () => {
    const { specialty, bio, location, fees, availableSlots } = form;
    if (!profilePic) return toast.error("Profile picture is required.");
    if (!specialty.trim() || !bio.trim() || !location.trim() || !fees.trim())
      return toast.error("All fields are required.");
    if (isNaN(Number(fees))) return toast.error("Fees must be a number.");
    if (
      !availableSlots.length ||
      availableSlots.some((s) => !s.date || !s.time)
    )
      return toast.error("Each slot must have both date and time.");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload = {
      ...form,
      profilePic, // include base64 string
    };

    setLoading(true);
    try {
      await axios.post(
        "http://localhost:9000/api/doctor/createDoctor",
        payload,
        {
          withCredentials: true,
        }
      );
      toast.success("Doctor profile created successfully!");
      navigate("/patient-dashboard");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to create profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold text-center text-blue-800 mb-6">
        Become a Doctor on Our Platform
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-6 rounded-xl shadow-md"
      >
        {/* Image Upload */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <img
              src={profilePic || "/avatar.png"}
              alt="Profile"
              className="size-32 rounded-full object-cover border-4 shadow-md"
            />
            <label
              htmlFor="profile-upload"
              className="absolute bottom-0 right-0 bg-base-content p-2 rounded-full cursor-pointer hover:scale-105 transition"
            >
              <Camera className="w-5 h-5 text-white" />
              <input
                type="file"
                id="profile-upload"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>
          </div>
          <p className="text-sm text-zinc-400">
            Upload a professional profile picture
          </p>
        </div>

        {/* Form Fields */}
        <div>
          <label className="block font-medium mb-1">Specialty</label>
          <input
            type="text"
            name="specialty"
            value={form.specialty}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="e.g. Cardiologist"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Bio</label>
          <textarea
            name="bio"
            rows={4}
            value={form.bio}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
            placeholder="Write something about your experience"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Location</label>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="City / Clinic Address"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">
              Consultation Fees (₹)
            </label>
            <input
              type="text"
              name="fees"
              value={form.fees}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="e.g. 1000"
            />
          </div>
        </div>

        <div>
          <label className="block font-medium mb-2">Available Slots</label>
          {form.availableSlots.map((slot, index) => (
            <div key={index} className="flex gap-4 mb-2">
              <input
                type="date"
                value={slot.date}
                onChange={(e) =>
                  handleSlotChange(index, "date", e.target.value)
                }
                className="input input-bordered w-full"
              />
              <input
                type="time"
                value={slot.time}
                onChange={(e) =>
                  handleSlotChange(index, "time", e.target.value)
                }
                className="input input-bordered w-full"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addSlot}
            className="btn btn-sm btn-outline mt-2"
          >
            + Add Slot
          </button>
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin mr-2" /> Creating Profile...
            </>
          ) : (
            "Submit Doctor Application"
          )}
        </button>
      </form>
    </div>
  );
};

export default JoinAsDoctorPage;
