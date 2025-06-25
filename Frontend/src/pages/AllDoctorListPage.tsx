import React, { useEffect, useState } from 'react';
import DoctorCard from '../components/DoctorCard';
import axios from 'axios';

interface Doctor {
  _id: string;
  profilePic: string;
  specialty: string;
  bio: string;
  location: string;
  fees: number;
  availableSlots: {
    date: string;
    time: string;
    isBooked: boolean;
    _id: string;
  }[];
  userId: {
    name: string;
    email: string;
  };
}///

const Doctors: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const limit = 6; // Number of doctors per page
  const [total, setTotal] = useState(0);

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:9000/api/doctor/getAllDoctors?page=${page}&limit=${limit}`
      );
      setDoctors(response.data.doctors);
      setTotal(response.data.total); // total count of doctors
    } catch (error) {
      console.error('Failed to fetch doctors:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, [page]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-blue-800 mb-6 text-center">
        Find the Right Doctor
      </h1>

      {loading ? (
        <p className="text-center text-gray-600">Loading doctors...</p>
      ) : doctors.length === 0 ? (
        <p className="text-center text-gray-500">No doctors found.</p>
      ) : (
        <>
          <div className="grid gap-6 mb-8">
            {doctors.map((doctor) => (
              <DoctorCard key={doctor._id} doctor={doctor} />
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center space-x-4">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className={`px-4 py-2 rounded-md font-medium ${
                page === 1
                  ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700 transition'
              }`}
            >
              Prev
            </button>

            <span className="text-blue-700 font-medium">
              Page {page} of {totalPages}
            </span>

            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className={`px-4 py-2 rounded-md font-medium ${
                page === totalPages
                  ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700 transition'
              }`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Doctors;
