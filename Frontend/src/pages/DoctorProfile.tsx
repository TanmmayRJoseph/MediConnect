import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Stack,
  Divider,
  CircularProgress,
  Container,
  Button,
  Grow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { MapPin, Mail, CalendarCheck } from "lucide-react";

import toast from "react-hot-toast";

interface Slot {
  _id: string;
  date: string;
  time: string;
  isBooked: boolean;
}

interface Doctor {
  _id: string;
  profilePic: string;
  specialty: string;
  bio: string;
  location: string;
  fees: number;
  availableSlots: Slot[];
  userId: {
    _id: string;
    name: string;
    email: string;
    role: string;
  };
}

const DoctorDetailPage: React.FC = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await axios.get(`http://localhost:9000/api/doctor/${id}`);
        setDoctor(res.data.doctor);
      } catch (err) {
        console.error("Error fetching doctor:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [id]);

  const handleBookAppointment = async () => {
    if (!date || !time) return toast.error("Date and Time are required");
    try {
      const payload = {
        doctorId: id,
        slot: { date, time },
      };
      const res = await axios.post(
        "http://localhost:9000/api/appointments/book",
        payload,
        {
          withCredentials: true,
        }
      );
      toast.success(res.data.message);
      setOpen(false);
      navigate("/patient-dashboard");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Booking failed");
    }
  };

  if (loading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="80vh"
      >
        <CircularProgress size={60} />
      </Box>
    );

  if (!doctor)
    return (
      <Typography variant="h6" align="center" mt={10}>
        Doctor not found.
      </Typography>
    );

  const { profilePic, specialty, bio, location, fees, availableSlots, userId } =
    doctor;

  const avatar = profilePic?.startsWith("https://res.cloudinary.com")
    ? profilePic
    : "/avatar.png";

  return (
    <Container maxWidth="lg" sx={{ mt: 6, mb: 6 }}>
      <Grow in timeout={600}>
        <Card
          elevation={4}
          sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}
        >
          {/* Doctor Image */}
          <CardMedia
            component="img"
            image={avatar}
            alt={userId.name}
            sx={{
              width: { xs: "100%", md: 400 },
              height: { xs: 250, md: "auto" },
              objectFit: "cover",
              borderRadius: { md: "0 0 0 8px" },
            }}
          />

          {/* Doctor Info */}
          <CardContent sx={{ flex: 1, p: 4 }}>
            <Typography variant="h4" fontWeight={700} color="primary.main">
              {userId.name}
            </Typography>
            <Chip label={specialty} color="info" sx={{ mt: 1, mb: 2 }} />

            <Stack direction="row" spacing={2} alignItems="center" mb={1}>
              <MapPin size={18} strokeWidth={1.5} />
              <Typography variant="body2">{location}</Typography>
            </Stack>

            <Stack direction="row" spacing={2} alignItems="center" mb={1}>
              <Mail size={18} strokeWidth={1.5} />
              <Typography variant="body2">{userId.email}</Typography>
            </Stack>

            <Divider sx={{ my: 2 }} />

            <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
              {bio}
            </Typography>

            <Typography variant="h6" mt={3} color="secondary">
              Consultation Fees: ₹{fees}
            </Typography>

            {/* Slots */}
            <Box mt={4}>
              <Typography
                variant="h6"
                color="primary"
                display="flex"
                alignItems="center"
                gap={1}
              >
                <CalendarCheck size={20} strokeWidth={1.5} />
                Available Slots
              </Typography>
              {availableSlots.length === 0 ? (
                <Typography color="text.secondary">
                  No slots available
                </Typography>
              ) : (
                <Stack direction="row" flexWrap="wrap" gap={1} mt={1}>
                  {availableSlots.map((slot) => (
                    <Chip
                      key={slot._id}
                      label={`${slot.date} @ ${slot.time}`}
                      color={slot.isBooked ? "default" : "success"}
                      variant={slot.isBooked ? "outlined" : "filled"}
                      disabled={slot.isBooked}
                    />
                  ))}
                </Stack>
              )}
            </Box>

            <Button
              variant="contained"
              size="large"
              color="primary"
              sx={{ mt: 4 }}
              fullWidth
              onClick={() => setOpen(true)}
            >
              Book Appointment
            </Button>
          </CardContent>
        </Card>
      </Grow>

      {/* Booking Modal */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Book Appointment</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
        >
          <TextField
            type="date"
            label="Select Date"
            InputLabelProps={{ shrink: true }}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            fullWidth
          />
          <TextField
            type="time"
            label="Select Time"
            InputLabelProps={{ shrink: true }}
            value={time}
            onChange={(e) => setTime(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleBookAppointment} variant="contained">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default DoctorDetailPage;
