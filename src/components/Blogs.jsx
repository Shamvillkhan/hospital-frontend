import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { BASE_URL } from "../api";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const isAdmin = true; // 👉 abhi ke liye hardcode
  const navigate = useNavigate();

  // Fetch blogs
  const fetchBlogs = () => {
    axios
      .get("http://localhost:6996/hosp/blogs/getAll")
      .then((response) => {
        setBlogs(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Delete blog
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      await axios.delete(`${BASE_URL}/blogs/delete/${id}`);
      alert("Blog deleted successfully!");
      fetchBlogs();
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("Failed to delete blog");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <h4>Loading Blogs...</h4>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold text-dark">Hospital Blogs</h1>
        <p className="text-muted">
          Stay updated with health tips and the latest medical insights from our doctors
        </p>
      </div>

      <div className="text-end mb-3">
        <button
          className="btn btn-success"
          onClick={() => navigate("/add-blog")}
        >
          ➕ Add Blog
        </button>
      </div>

      <div className="row">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div key={blog.id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100 shadow-sm border-0">
                <img
                  src={
                    blog.image
                      ? `http://localhost:6996/hosp/uploads/${blog.image}`
                      : "https://via.placeholder.com/400x200"
                  }
                  className="card-img-top"
                  alt={blog.title}
                  style={{ height: "200px", objectFit: "cover" }}
                />

                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-bold">{blog.title}</h5>
                  <p className="text-muted small mb-2">
                    {blog.author} |{" "}
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </p>
                  <p className="card-text">{blog.content}</p>

                  <div className="mt-auto d-flex flex-column gap-2">
                    <button className="btn btn-dark btn-sm w-100">
                      Read More
                    </button>

                    {isAdmin && (
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-warning btn-sm w-50"
                          onClick={() => navigate(`/update-blog/${blog.id}`)}
                        >
                          Update
                        </button>
                        <button
                          className="btn btn-danger btn-sm w-50"
                          onClick={() => handleDelete(blog.id)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center">
            <p>No blogs available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;
