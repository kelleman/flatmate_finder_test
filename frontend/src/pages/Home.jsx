import { useEffect, useState } from "react";
import { getData, deleteData } from "../api/api.js";
import { Link } from "react-router-dom";
import "../css/Home.css";

export default function Home() {
  const [profiles, setProfiles] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadProfiles = async (search = "") => {
    try {
      setLoading(true);
      setError(""); // reset error state
      let endpoint = "/profiles";
      if (search) endpoint = `/profiles/search/filter?name=${search}&location=${search}`;
      
      const data = await getData(endpoint);
      
      // If backend returns no results (e.g., []), handle it gracefully
      if (Array.isArray(data) && data.length === 0) {
        setProfiles([]);
      } else {
        setProfiles(data);
      }
    } catch (err) {
      console.error("Error fetching profiles:", err);
      // Instead of error message from backend, show friendly text
      setProfiles([]);
      setError("No profiles found or server unavailable.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this profile?")) return;
    await deleteData(`/profiles/${id}`);
    loadProfiles();
  };

  useEffect(() => {
    loadProfiles();
  }, []);

  const handleSearch = () => {
    if (query.trim() === "") {
      loadProfiles();
    } else {
      loadProfiles(query.trim());
    }
  };

  const clearSearch = () => {
    setQuery("");
    setError(""); // clear error message
    loadProfiles(); // reload homepage data
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container my-4" style={{ paddingBottom: "100px" }}>
      <h1 className="text-center mb-4">Flatmate Finder 🏡</h1>

      <Link to="/create" className="btn btn-success mb-4">
        + New Profile
      </Link>

      {/* Search Bar */}
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name or city name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={clearSearch}
          >
            ❌
          </button>
        )}
        <button className="btn btn-primary" type="button" onClick={handleSearch}>
          Search
        </button>
      </div>


      {/* Profiles Section */}
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-danger text-center">{error}</p>
      ) : profiles.length === 0 ? (
        <p className="text-center">No profiles found</p>
      ) : (
        <div className="row gy-3">
          {profiles.map((p) => (
            <div className="col-sm-6 col-md-4 col-lg-3" key={p._id}>
              <div className="card shadow-sm h-100 profile-card">
                {p.imageUrl && (
                  <img
                    src={p.imageUrl}
                    className="card-img-top profile-img"
                    alt={p.fullName}
                  />
                )}
                <div className="card-body p-2">
                  <h6 className="fw-bold mb-1">{p.fullName}</h6>
                  <p className="small text-muted mb-2">{p.bio}</p>
                </div>
                <div className="card-footer d-flex justify-content-between p-2">
                  <Link to={`/edit/${p._id}`} className="btn btn-sm btn-outline-primary">
                    Edit
                  </Link>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(p._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <footer className="text-center mt-5 py-3 bg-grey fixed-bottom border-top">
        <small>© {new Date().getFullYear()} Flatmate Finder | Built by Godfrey</small>
      </footer>
    </div>
  );
}
