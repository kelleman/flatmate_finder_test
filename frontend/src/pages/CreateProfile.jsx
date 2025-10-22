import { useState } from "react";
import { postData } from "../api/api.js";
import { useNavigate } from "react-router-dom";

export default function CreateProfile() {
  const [form, setForm] = useState({
    fullName: "",
    bio: "",
    location: "",
    occupation: "",
    linkedInUrl: "",
  });

  const [message, setMessage] = useState({ type: "", text: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await postData("/profiles", form);
      setMessage({ type: "success", text: "Profile created successfully!" });
      setTimeout(() => navigate("/"), 1500); // Redirect after 1.5 seconds
    } catch (error) {
      console.error(error);
      setMessage({
        type: "danger",
        text: "Failed to create profile. Please try again.",
      });
    }
  };

  return (
    <div className="container my-4">
      <h2 className="mb-3">Create Profile</h2>

      {/* Alert messages */}
      {message.text && (
        <div className={`alert alert-${message.type}`} role="alert">
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-3">
        {Object.keys(form).map((key) => (
          <div className="mb-3" key={key}>
            <label className="form-label text-capitalize">
              {key === "linkedInUrl" ? "LinkedIn URL" : key}
            </label>
            <input
              type="text"
              className="form-control"
              name={key}
              value={form[key]}
              onChange={handleChange}
              required={key !== "linkedInUrl"}
            />
          </div>
        ))}

        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-success">
            Save
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/")}
          >
            ← Back
          </button>
        </div>
      </form>
    </div>
  );
}
