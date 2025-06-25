import React from 'react';
import {
  CalendarCheck,
  Stethoscope,
  HeartPulse,
  ShieldCheck,
  PhoneCall,
  UserPlus,
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <main className="bg-blue-50 text-blue-900">
      {/* Navbar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-md sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-blue-700">MediConnect</h1>
          <ul className="flex space-x-6 font-medium text-blue-800">
            <li>
              <a href="/" className="hover:text-blue-600 transition">Home</a>
            </li>
            <li>
              <a href="/doctors" className="hover:text-blue-600 transition">Doctors</a>
            </li>
            <li>
              <a href="/login" className="hover:text-blue-600 transition">Login</a>
            </li>
          </ul>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="py-16 px-6 flex flex-col items-center text-center">
        <div className="w-64 h-64 bg-blue-100 rounded-full flex items-center justify-center mb-6">
          <Stethoscope className="w-20 h-20 text-blue-600" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Book Your Doctor Online</h1>
        <p className="text-lg text-gray-700 max-w-xl">
          Find the right specialist and book your appointment instantly from anywhere, anytime.
        </p>
        <div className="mt-6 space-x-4">
          <a
            href="/register"
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
          >
            Get Started
          </a>
          <a
            href="/login"
            className="border border-blue-600 text-blue-600 px-6 py-3 rounded-md hover:bg-blue-100 transition"
          >
            Login
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 md:px-20 bg-white">
        <h2 className="text-3xl font-bold text-center mb-12 text-blue-800">Why Choose MediConnect?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: 'Easy Booking',
              desc: 'Book appointments in seconds with a smooth user experience.',
              icon: <CalendarCheck className="w-10 h-10 text-blue-600" />,
            },
            {
              title: 'Expert Doctors',
              desc: 'Connect with certified and experienced medical professionals.',
              icon: <ShieldCheck className="w-10 h-10 text-blue-600" />,
            },
            {
              title: '24/7 Support',
              desc: 'We’re here to help, anytime you need medical assistance.',
              icon: <PhoneCall className="w-10 h-10 text-blue-600" />,
            },
          ].map((item, index) => (
            <div key={index} className="bg-blue-50 p-6 rounded-xl shadow-sm text-center hover:shadow-md transition">
              <div className="mb-4 flex justify-center">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-6 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-12 text-blue-800">Our Specialties</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            { name: 'Cardiology', icon: <HeartPulse className="w-8 h-8 text-red-500" /> },
            { name: 'General Physician', icon: <Stethoscope className="w-8 h-8 text-green-600" /> },
            { name: 'New Patient Registration', icon: <UserPlus className="w-8 h-8 text-blue-600" /> },
          ].map((service, index) => (
            <div key={index} className="bg-white rounded-xl shadow p-5 flex items-center space-x-4 hover:bg-blue-50 transition">
              <div>{service.icon}</div>
              <span className="text-lg font-medium">{service.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-600 text-white py-6 mt-10 text-center">
        <p>&copy; {new Date().getFullYear()} MediConnect. All rights reserved.</p>
      </footer>
    </main>
  );
}
