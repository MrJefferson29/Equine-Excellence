import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { FiUploadCloud, FiAlertCircle } from "react-icons/fi";

const UploadHorse = () => {
  const { api, token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    category: "",
    sex: "",
    age: "",
    price: "",
    saleType: "",
    certificate: "",
    description: "",
  });
  const [images, setImages] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImagesChange = (e) => {
    setImages(Array.from(e.target.files || []));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const fd = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        fd.append(key, value);
      });
      images.forEach((file) => {
        fd.append("images", file);
      });

      const { data } = await api.post("https://equine-excellence.onrender.com/horses", fd, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${token || localStorage.getItem("authToken")}`,
        },
      });

      const slug = data.slug || data.name.replace(/\s+/g, "-").toLowerCase();
      navigate(`/pet/${slug}`);
    } catch (err) {
      console.error("Error uploading horse", err);
      setError(
        err?.response?.data?.message ||
          "Unable to upload horse. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Wrapper>
      <header className="form-header">
        <span className="accent">Registry Management</span>
        <h2>Add a New Horse</h2>
        <p>Ensure all pedigree and health details are accurate before submission.</p>
      </header>

      <form onSubmit={handleSubmit} className="form">
        <div className="input-group">
          <div className="field">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Midnight Thunder"
            />
          </div>

          <div className="field">
            <label htmlFor="category">Status Category</label>
            <select
              id="category"
              name="category"
              required
              value={form.category}
              onChange={handleChange}
            >
              <option value="">Select Category</option>
              <option value="Elite Collection">Elite Collection</option>
              <option value="New Arrival">New Arrival</option>
              <option value="Recently Rehomed">Recently Rehomed</option>
              <option value="Top Views">Top Views</option>
            </select>
          </div>
        </div>

        <div className="grid-3">
          <div className="field">
            <label htmlFor="sex">Sex</label>
            <select
              id="sex"
              name="sex"
              required
              value={form.sex}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="Stallion">Stallion</option>
              <option value="Mare">Mare</option>
              <option value="Gelding">Gelding</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor="age">Age</label>
            <input
              id="age"
              name="age"
              type="text"
              required
              value={form.age}
              onChange={handleChange}
              placeholder="e.g. 5 Years"
            />
          </div>

          <div className="field">
            <label htmlFor="saleType">Sale Type</label>
            <select
              id="saleType"
              name="saleType"
              required
              value={form.saleType}
              onChange={handleChange}
            >
              <option value="">Select type</option>
              <option value="free">Free</option>
              <option value="for_sale">For Sale</option>
              <option value="adoption">For Adoption</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor="price">Rehoming Fee</label>
            <input
              id="price"
              name="price"
              type="text"
              required
              value={form.price}
              onChange={handleChange}
              placeholder="$ 450"
            />
          </div>
        </div>

        <div className="field">
          <label htmlFor="certificate">Pedigree / Certification</label>
          <input
            id="certificate"
            name="certificate"
            type="text"
            value={form.certificate}
            onChange={handleChange}
            placeholder="e.g. AQHA Registered, Health Screened"
          />
        </div>

        <div className="field">
          <label htmlFor="description">Detailed History</label>
          <textarea
            id="description"
            name="description"
            rows={5}
            value={form.description}
            onChange={handleChange}
            placeholder="Describe temperament, training level, and medical history..."
          />
        </div>

        <div className="field">
          <label htmlFor="images" className="file-label">
            <FiUploadCloud />
            <span>Click to upload gallery images</span>
            <input
              id="images"
              name="images"
              type="file"
              multiple
              accept="image/*"
              onChange={handleImagesChange}
              required
            />
          </label>
          {images.length > 0 && (
            <div className="file-count">{images.length} images selected</div>
          )}
        </div>

        {error && (
          <div className="error-box">
            <FiAlertCircle /> {error}
          </div>
        )}

        <button type="submit" className="submit-btn" disabled={submitting}>
          {submitting ? "Processing Registry..." : "Confirm & Add to Collection"}
        </button>
      </form>
    </Wrapper>
  );
};

export default UploadHorse;

const Wrapper = styled.div`
  max-width: 800px;
  margin: 8rem auto 4rem;
  padding: 3rem;
  border-radius: 4px;
  background: #ffffff;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.05);
  border: 1px solid #f0efeb;

  .form-header {
    text-align: center;
    margin-bottom: 3rem;
    
    .accent {
      color: #c5a059;
      text-transform: uppercase;
      letter-spacing: 3px;
      font-weight: 700;
      font-size: 0.75rem;
      display: block;
      margin-bottom: 0.5rem;
    }

    h2 {
      font-family: 'Playfair Display', serif;
      font-size: 2.2rem;
      color: #1a2e26;
      margin-bottom: 10px;
    }

    p {
      color: #777;
      font-size: 0.95rem;
    }
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .input-group, .grid-3 {
    display: grid;
    gap: 1.5rem;
  }

  .input-group { grid-template-columns: 1fr 1fr; }
  .grid-3 { grid-template-columns: 1fr 1fr 1fr; }

  @media (max-width: 600px) {
    .input-group, .grid-3 { grid-template-columns: 1fr; }
  }

  .field {
    display: flex;
    flex-direction: column;

    label {
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 1px;
      font-weight: 700;
      margin-bottom: 8px;
      color: #1a2e26;
    }

    input, select, textarea {
      padding: 12px 16px;
      border-radius: 2px;
      border: 1px solid #e0e0e0;
      font-size: 1rem;
      transition: all 0.3s ease;
      background: #fafafa;

      &:focus {
        outline: none;
        border-color: #c5a059;
        background: white;
      }
    }
  }

  .file-label {
    border: 2px dashed #e0e0e0;
    padding: 30px;
    text-align: center;
    cursor: pointer;
    background: #fafafa;
    transition: 0.3s;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;

    input { display: none; }
    svg { font-size: 2rem; color: #c5a059; }
    span { font-weight: 600; color: #666; font-size: 0.9rem; }

    &:hover {
      border-color: #c5a059;
      background: #fdfcf8;
    }
  }

  .file-count {
    margin-top: 10px;
    font-size: 0.85rem;
    color: #1a2e26;
    font-weight: 700;
    text-align: center;
  }

  .error-box {
    background: #fff5f5;
    color: #c00;
    padding: 15px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 0.9rem;
    font-weight: 600;
  }

  .submit-btn {
    margin-top: 1rem;
    padding: 18px;
    border: none;
    background-color: #1a2e26;
    color: white;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 2px;
    cursor: pointer;
    transition: 0.3s;

    &:hover:not(:disabled) {
      background-color: #c5a059;
      transform: translateY(-2px);
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }
`;