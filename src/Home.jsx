import React, { useRef, useState } from 'react';
import './App.css';


function Home() {
  const locationRef = useRef();
  const [loadingLocation, setLoadingLocation] = useState(false);

  const openGoogleMaps = (e) => {
    e.preventDefault();
    const location = locationRef.current.value;
    const url = location
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`
      : 'https://www.google.com/maps';
    window.open(url, '_blank');
  };

  const useMyLocation = async (e) => {
    e.preventDefault();
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    setLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        // Use OpenStreetMap Nominatim for free reverse geocoding
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          if (data.display_name) {
            locationRef.current.value = data.display_name;
          } else {
            locationRef.current.value = `${latitude}, ${longitude}`;
          }
        } catch {
          locationRef.current.value = `${latitude}, ${longitude}`;
        }
        setLoadingLocation(false);
      },
      () => {
        alert('Unable to retrieve your location.');
        setLoadingLocation(false);
      }
    );
  };

  return (
    <div>
      <section className="hero-section">
        <h1>Report Issues Instantly</h1>
        <p>
          Help your community by reporting problems to the right people, right
          away. Fast, easy, and effective!
        </p>
        <a href="#report-form" className="cta-btn">
          Start Reporting
        </a>
      </section>

      <section id="report-form" className="report-form-container">
        <h2>Submit a Report</h2>
        <form>
          <label htmlFor="issue">Describe the issue</label>
          <textarea id="issue" placeholder="What's wrong?" required></textarea>

          <label htmlFor="location">Location</label>
          <div className="location-row">
           <div> <input
              id="location"
              type="text"
              placeholder="Enter location"
              required
              ref={locationRef}
              className="location-input"
            /></div>
            <div>
            <button
              onClick={openGoogleMaps}
              className="location-btn google-maps-btn"
              type="button"
            >
              Google Maps
            </button>
            <button
              onClick={useMyLocation}
              className="location-btn use-location-btn"
              type="button"
              disabled={loadingLocation}
            >
              {loadingLocation ? 'Locating...' : 'Use My Location'}
            </button>
            </div>
          </div>

          <label htmlFor="photo">Photo (optional)</label>
          <input id="photo" type="file" accept="image/*" />

          <button type="submit">Send Report</button>
        </form>
        <p>We’ll send your report to the right place so it can get solved!</p>
      </section>

      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <h3>1. Snap</h3>
            <p>Take a photo or describe the issue you see.</p>
          </div>
          <div className="step">
            <h3>2. Send</h3>
            <p>Submit your report in seconds, no hassle.</p>
          </div>
          <div className="step">
            <h3>3. Solve</h3>
            <p>We’ll get it to the right people so it can be fixed!</p>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <h2>What Our Users Say</h2>
        <div className="testimonial-list">
          <div className="testimonial">
            <p>“Super easy to use and my issue was fixed fast!”</p>
            <span>- Alex</span>
          </div>
          <div className="testimonial">
            <p>“A great way to help my community.”</p>
            <span>- Priya</span>
          </div>
          <div className="testimonial">
            <p>“Love how simple and quick it is.”</p>
            <span>- Sam</span>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>© 2025 . All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
