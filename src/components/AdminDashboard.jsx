import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUserMd, FaBed, FaClipboardList, FaNotesMedical, FaBlog, FaUsers, FaPlusCircle, FaBell, FaUserCircle, FaSun, FaMoon } from "react-icons/fa";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import "./AdminDashboard.css";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [stats, setStats] = useState({
    doctors: 0,
    rooms: 0,
    slots: 0,
    appointments: 0,
    blogs: 0,
    staff: 0,
    patients: 0,
  });

  const toggleDarkMode = () => setDarkMode(!darkMode);

  // Fetch stats from backend
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const doctorsRes = await axios.get("http://localhost:6996/hosp/staff/doctors/count");console.log(doctorsRes.data);
        const roomsRes = await axios.get("http://localhost:6996/hosp/rooms/count");
        console.log(roomsRes.data);
        const slotsRes = await axios.get("http://localhost:6996/hosp/slots/count");
      //  const appointmentsRes = await axios.get("http://localhost:6996/hosp/appointments/count");
        const blogsRes = await axios.get("http://localhost:6996/hosp/blogs/count");
        const staffRes = await axios.get("http://localhost:6996/hosp/staff/count");
        const patientsRes = await axios.get("http://localhost:6996/hosp/patients/count");

        setStats({
          doctors: doctorsRes.data,
          rooms: roomsRes.data,
          slots: slotsRes.data,
          //appointments: appointmentsRes.data,
          blogs: blogsRes.data,
          staff: staffRes.data,
          patients: patientsRes.data,
        });
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };

    fetchStats();
  }, []);

  const sections = [
    { title: "Doctor Management", actions: [{ name: "Add Doctor Slot", path: "/adddoctorslot" }, { name: "Doctor Slots List", path: "/doctorslotlist" }] },
    { title: "Room Management", actions: [{ name: "Add Room", path: "/addroom" }, { name: "Room List", path: "/rooms" }] },
    { title: "Slot Management", actions: [{ name: "Add Slot", path: "/addslot" }, { name: "All Slots", path: "/slotlist" }] },
    { title: "Appointment Management", actions: [{ name: "Doctor Appointments", path: "/doctorappp" }, { name: "Health Appointments", path: "/healthapp" }] },
    { title: "Blog & Info", actions: [{ name: "Add Blog", path: "/add-blog" }, { name: "All Blogs", path: "/blogs" }, { name: "Add Disease", path: "/add" }] },
    { title: "Staff & Department", actions: [{ name: "Add Staff", path: "/staffform" }, { name: "All Staff", path: "/allstaff" }, { name: "Add Department", path: "/departmentform" }] },
    { title: "Patient Management", actions: [{ name: "Add Patient", path: "/patientform" }, { name: "Patient List", path: "/patientlist" }] },
  ];

  // Chart data using real stats
  const chartData = {
    labels: ["Doctors", "Rooms", "Slots", "Appointments", "Blogs", "Staff", "Patients"],
    datasets: [
      {
        label: "Counts",
        data: [
          stats.doctors,
          stats.rooms,
          stats.slots,
          stats.appointments,
          stats.blogs,
          stats.staff,
          stats.patients,
        ],
        borderColor: darkMode ? "#4bc0c0" : "#007bff",
        backgroundColor: "rgba(0,123,255,0.2)",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className={`dashboard-wrapper ${darkMode ? "dark" : ""}`}>
      {/* Sidebar */}
      <div className="sidebar">
        <h2 className="sidebar-title">Hospital Admin</h2>
        <button className="mode-toggle mb-3" onClick={() => toggleDarkMode()}>
          {darkMode ? <FaSun /> : <FaMoon />} {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
        <ul className="sidebar-links">
          {sections.map((section, idx) => (
            <li key={idx}>
              <span className="section-title">{section.title}</span>
              {section.actions.map((action, i) => (
                <button key={i} className="sidebar-btn" onClick={() => navigate(action.path)}>
                  {action.name}
                </button>
              ))}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Top Navbar */}
        <div className="top-navbar d-flex justify-content-between align-items-center mb-4">
          <h3>Welcome, Admin!</h3>
          <div className="top-icons d-flex align-items-center">
            <FaBell size={22} className="me-3" />
            <FaUserCircle size={30} />
          </div>
        </div>

        {/* Stats Widgets */}
        <div className="stats-container row g-4 my-4">
          {[
            { title: "Doctors", count: stats.doctors, icon: <FaUserMd color="#fff" /> },
            { title: "Rooms", count: stats.rooms, icon: <FaBed color="#fff" /> },
            { title: "Slots", count: stats.slots, icon: <FaClipboardList color="#fff" /> },
            { title: "Appointments", count: stats.appointments, icon: <FaNotesMedical color="#fff" /> },
            { title: "Blogs", count: stats.blogs, icon: <FaBlog color="#fff" /> },
            { title: "Staff", count: stats.staff, icon: <FaUsers color="#fff" /> },
            { title: "Patients", count: stats.patients, icon: <FaPlusCircle color="#fff" /> },
          ].map((stat, idx) => (
            <div key={idx} className="col-md-3 col-sm-6">
              <div className="stat-card d-flex align-items-center p-3">
                <div className="stat-icon me-3">{stat.icon}</div>
                <div>
                  <h5 className="stat-title">{stat.title}</h5>
                  <h3 className="stat-count">{stat.count}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="charts-container my-4">
          <h5>Hospital Data Overview</h5>
          <Line data={chartData} />
        </div>

        {/* Quick Action Cards */}
        <div className="quick-actions row g-4 my-4">
          {sections.map((section, idx) => (
            <div key={idx} className="col-md-4">
              <div className="action-card p-3 shadow-sm">
                <h5 className="fw-bold mb-3">{section.title}</h5>
                {section.actions.map((action, i) => (
                  <button key={i} className="btn btn-primary w-100 mb-2" onClick={() => navigate(action.path)}>
                    {action.name}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
