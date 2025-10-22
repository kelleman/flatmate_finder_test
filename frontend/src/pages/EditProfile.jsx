import { useEffect, useState } from "react";
import { getData, patchData } from "../api/api.js";
import { useParams, useNavigate } from "react-router-dom";

export default function EditProfile() {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getData(`/profiles/${id}`);
        // Exclude system fields only
        const { imageUrl, _id, __v, createdAt, updatedAt, ...filteredData } = data;
        setForm(filteredData);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setMessage({ type: "danger", text: "Failed to load profile." });
      }
    };
    fetchProfile();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await patchData(`/profiles/${id}`, form);
      setMessage({ type: "success", text: "Profile updated successfully!" });
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      console.error(error);
      setMessage({ type: "danger", text: "Failed to update profile." });
    }
  };

  if (!form) return <p className="text-center my-5">Loading profile...</p>;

  return (
    <div className="container my-4">
      <h2 className="mb-3">Edit Profile</h2>

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
              {key === "linkedinUrl" ? "LinkedIn URL" : key}
            </label>
            <input
              type="text"
              className="form-control"
              name={key}
              value={form[key] ?? ""}
              onChange={handleChange}
              required={key !== "linkedinUrl"}
            />
          </div>
        ))}

        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary">
            Update
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
