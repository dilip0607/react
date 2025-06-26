// ProductPage.js
// src/components/ReportForm.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';
import './App.css'
import './login.css';
import './Productpage.css';

const ReportForm = () => {
  const [image, setImage] = useState(null);
  const [coords, setCoords] = useState({ lat: null, lng: null });
  const [description, setDescription] = useState('');

  // Grab user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      }, err => {
        console.error('Geolocation error:', err);
      }, { enableHighAccuracy: true });
    }
  }, []);

  const onFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return alert('Please select an image.');

    const formData = new FormData();
    formData.append('image', image);
    formData.append('lat', coords.lat);
    formData.append('lng', coords.lng);
    formData.append('description', description);

    try {
      await axios.post('http://localhost:5000/api/reports', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Report submitted!');
      setImage(null);
      setDescription('');
    } catch (err) {
      console.error(err);
      alert('Submission failed.');
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <h2>Submit a Report</h2>
      <div>
        <label>
          Image:
          <input type="file" accept="image/*" onChange={onFileChange} />
        </label>
      </div>
      <div>
        <label>
          Description:
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Describe the issue..."
          />
        </label>
      </div>
      <div>
        {coords.lat && coords.lng
          ? <p>Location: {coords.lat.toFixed(4)}, {coords.lng.toFixed(4)}</p>
          : <p>Determining location...</p>
        }
      </div>
      <button type="submit">Send Report</button>
    </form>
  );
};

export default ReportForm;
