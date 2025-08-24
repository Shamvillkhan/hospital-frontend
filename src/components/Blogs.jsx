import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const blogsData = [
  {
    id: 1,
    title: "Heart Health: Tips for a Stronger Heart",
    author: "Dr. Arjun Mehta",
    date: "August 20, 2025",
    image: "https://via.placeholder.com/400x200",
    excerpt:
      "Learn about simple lifestyle changes and diet habits that can help you maintain a healthy heart...",
  },
  {
    id: 2,
    title: "Skincare Essentials for Every Season",
    author: "Dr. Neha Sharma",
    date: "August 15, 2025",
    image: "https://via.placeholder.com/400x200",
    excerpt:
      "Changing seasons can affect your skin in many ways. Here are dermatologist-approved tips...",
  },
  {
    id: 3,
    title: "Back Pain: Causes and Prevention",
    author: "Dr. Ramesh Kumar",
    date: "August 10, 2025",
    image: "https://via.placeholder.com/400x200",
    excerpt:
      "Back pain is one of the most common problems today. Learn how to prevent it with simple exercises...",
  },
];

const Blogs = () => {
  return (
    <div className="container py-5">
      {/* Heading */}
      <div className="text-center mb-5">
        <h1 className="fw-bold text-dark">Hospital Blogs</h1>
        <p className="text-muted">
          Stay updated with health tips and the latest medical insights from our doctors
        </p>
      </div>

      {/* Blog Cards */}
      <div className="row">
        {blogsData.map((blog) => (
          <div key={blog.id} className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow-sm border-0">
              <img
                src={blog.image}
                className="card-img-top"
                alt={blog.title}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-bold">{blog.title}</h5>
                <p className="text-muted small mb-2">
                  {blog.author} | {blog.date}
                </p>
                <p className="card-text">{blog.excerpt}</p>
                <div className="mt-auto">
                  <button className="btn btn-dark btn-sm w-100">Read More</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
