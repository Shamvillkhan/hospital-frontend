import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUserFriends, FaPiggyBank, FaHeadset } from "react-icons/fa";

const About = () => {
  const features = [
    {
      title: "Easy To Use",
      description: "Our platform is designed with simplicity in mind, so you can access services in just a few clicks.",
      icon: <FaUserFriends size={40} className="mb-3 text-primary" />
    },
    {
      title: "Save Your Money",
      description: "Affordable pricing with no hidden charges. Get the best value for your money every time.",
      icon: <FaPiggyBank size={40} className="mb-3 text-success" />
    },
    {
      title: "24/7 Online Support",
      description: "Our team is always available to assist you anytime, anywhere with instant responses.",
      icon: <FaHeadset size={40} className="mb-3 text-danger" />
    }
  ];

  return (
    <div className="py-5 bg-light">
      <div className="container text-center py-5">
        <h2 className="mb-4 fw-bold display-5">Why You Should Choose AZZOLO ?</h2>
        <p className="mb-5 mx-auto text-muted" style={{ maxWidth: '600px', fontSize: '1.1rem' }}>
          Discover the features that make our service unique and user-friendly. We focus on providing you the 
          best experience with easy navigation, cost-saving options, and 24/7 assistance.
        </p>
        
        <div className="row">
          {features.map((feature, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div 
                className="p-4 h-100 shadow-sm bg-white rounded-4 feature-card" 
                style={{ transition: 'transform 0.3s, box-shadow 0.3s' }}
              >
                {feature.icon}
                <h3 className="fw-semibold mb-3">{feature.title}</h3>
                <p className="text-muted">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Extra CSS for hover effect */}
      <style>
        {`
          .feature-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 8px 20px rgba(0,0,0,0.15);
          }
        `}
      </style>
    </div>
  );
};

export default About;
