import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUserMd, FaCalendarCheck, FaFileAlt, FaPhoneAlt, FaHospitalUser } from "react-icons/fa";

const FAQ = () => {
  const styles = {
    section: {
      padding: "5rem 0",
      backgroundColor: "#f9fafb",
    },
    title: {
      fontSize: "2.8rem",
      fontWeight: "700",
      color: "#000", // Bootstrap primary color
      marginBottom: "1rem",
    },
    subtitle: {
      fontSize: "1.2rem",
      color: "#4b5563",
      maxWidth: "40rem",
      margin: "0 auto 3rem",
    },
    questionBox: {
      background: "#fff",
      borderRadius: "12px",
      padding: "1.5rem",
      marginBottom: "1.5rem",
      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      transition: "all 0.3s ease",
    },
    questionBoxHover: {
      transform: "translateY(-3px)",
      boxShadow: "0 6px 16px rgba(0,0,0,0.12)",
    },
    question: {
      fontSize: "1.3rem",
      fontWeight: "600",
      color: "#111827",
      display: "flex",
      alignItems: "center",
      gap: "0.6rem",
    },
    answer: {
      fontSize: "1rem",
      color: "#6B7280",
      marginTop: "0.75rem",
      lineHeight: "1.6",
    },
  };

  const faqs = [
    {
      icon: <FaCalendarCheck color="#0d6efd" />,
      question: "Can I book an appointment online?",
      answer:
        "Yes, you can easily schedule your appointment online through our hospital portal or mobile app. Select your preferred doctor, date, and time slot.",
    },
    {
      icon: <FaUserMd color="#0d6efd" />,
      question: "How do I choose the right doctor?",
      answer:
        "You can search doctors by specialty, experience, or patient reviews on our website. Our staff can also guide you in selecting the best doctor for your needs.",
    },
    {
      icon: <FaFileAlt color="#0d6efd" />,
      question: "Can I access my medical reports online?",
      answer:
        "Yes, registered patients can securely access their test results, prescriptions, and medical history through our online patient portal.",
    },
    {
      icon: <FaPhoneAlt color="#0d6efd" />,
      question: "What should I do in case of an emergency?",
      answer:
        "In case of an emergency, please call our 24x7 helpline or rush to our emergency department. Our doctors and staff are available at all times.",
    },
    {
      icon: <FaHospitalUser color="#0d6efd" />,
      question: "Do you provide health insurance support?",
      answer:
        "Yes, we accept most major health insurance policies and our team will assist you with cashless hospitalization and claim procedures.",
    },
  ];

  return (
    <section style={styles.section}>
      <div className="container text-center">
        <h2 style={styles.title}>Frequently Asked Questions</h2>
        <p style={styles.subtitle}>
          Find answers to the most common questions about appointments, doctors,
          medical records, emergencies, and insurance.
        </p>

        <div className="row justify-content-center">
          <div className="col-lg-9 text-start">
            {faqs.map((faq, index) => (
              <div
                key={index}
                style={styles.questionBox}
                className="faq-card"
              >
                <h3 style={styles.question}>
                  {faq.icon} {faq.question}
                </h3>
                <p style={styles.answer}>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
