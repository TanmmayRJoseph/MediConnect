import React from "react";
import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";

interface Slot {
  date: string;
  time: string;
  isBooked: boolean;
  _id: string;
}

interface DoctorCardProps {
  doctor: {
    _id: string;
    profilePic: string;
    specialty: string;
    bio: string;
    location: string;
    fees: number;
    availableSlots: Slot[];
    userId: {
      name: string;
      email: string;
    };
  };
}

const getProfileImage = (profilePic: string): string => {
  if (
    profilePic &&
    typeof profilePic === "string" &&
    profilePic.startsWith("https://res.cloudinary.com")
  ) {
    return profilePic;
  }
  return "/avatar.png";
};

const DoctorCard: React.FC<{ doctor: DoctorCardProps["doctor"] }> = ({
  doctor,
}) => {
  const { userId, specialty, location, bio, fees, profilePic, availableSlots } =
    doctor;

  const shortBio = bio.length > 120 ? `${bio.slice(0, 120)}...` : bio;
  const avatar = getProfileImage(profilePic);

  return (
    <div className="bg-white border border-blue-100 rounded-2xl p-6 shadow-md flex flex-col md:flex-row gap-6 transition hover:shadow-lg">
      {/* Profile Image */}
      <div className="flex-shrink-0">
        <img
          src={avatar}
          alt={userId.name}
          className="w-28 h-36 rounded-xl object-cover border-2 border-blue-200 shadow-sm"
        />
      </div>

      {/* Doctor Info */}
      <div className="flex flex-col flex-grow">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-blue-800">{userId.name}</h2>
          <span className="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-full font-medium">
            {specialty}
          </span>
        </div>

        <div className="flex items-center text-gray-500 text-sm mt-1">
          <MapPin className="w-4 h-4 mr-1" />
          {location}
        </div>

        <p className="mt-3 text-gray-700 text-sm leading-relaxed">{shortBio}</p>

        <div className="mt-3 text-gray-800 font-medium">
          <span className="text-blue-700">Fees:</span> ₹{fees}
        </div>

        {/* Slots */}
        {availableSlots.length > 0 && (
          <div className="mt-4">
            <p className="text-sm font-semibold text-blue-700 mb-1">
              Next Available Slots:
            </p>
            <ul className="flex flex-wrap gap-2">
              {availableSlots.slice(0, 2).map((slot) => (
                <li
                  key={slot._id}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg text-xs font-medium"
                >
                  {slot.date} @ {slot.time}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Book Now Button */}
        <div className="mt-4">
          <Link
            to={`/doctors/${doctor._id}`}
            className="inline-block bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
