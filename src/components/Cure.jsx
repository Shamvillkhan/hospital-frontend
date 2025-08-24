import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Cure = () => {
  const diseases = [
    {
      id: 1,
      name: "Diabetes",
      image: "https://images.pexels.com/photos/1001897/pexels-photo-1001897.jpeg", // replace with real image
      cure: "Maintain a balanced diet, regular exercise, and prescribed medication can help control blood sugar levels."
    },
    {
      id: 2,
      name: "Hypertension",
      image: "https://images.pexels.com/photos/7659567/pexels-photo-7659567.jpeg",
      cure: "Reduce salt intake, manage stress, exercise regularly, and take prescribed medicines."
    },
    {
      id: 3,
      name: "Asthma",
      image: "https://images.pexels.com/photos/30425664/pexels-photo-30425664.jpeg",
      cure: "Avoid allergens, use inhalers, and follow the treatment plan suggested by the doctor."
    },
    {
      id: 4,
      name: "Flu",
      image: "https://images.pexels.com/photos/3807629/pexels-photo-3807629.jpeg",
      cure: "Rest, hydration, antiviral medications (if severe), and over-the-counter medicines for relief."
    },
  ];

  return (
    <div className="container py-5" style={{ marginTop: "80px" }}>
      <h2 className="text-center mb-4">Disease & Cure</h2>
      <div className="row">
        {diseases.map((disease) => (
          <div className="col-md-4 mb-4" key={disease.id}>
            <div className="card h-100 shadow-sm">
              <img
                src={disease.image}
                className="card-img-top"
                alt={disease.name}
                style={{ height: "180px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{disease.name}</h5>
                <p className="card-text">{disease.cure}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cure;
