// import { Link } from "react-router-dom";
// import Banner from "./Banner";

// export default function Home() {
//   return (
//     <>
//       <Banner />
//       {/* <h1>Home</h1>
//       <Link to="/jobs/create">Create a Job</Link> */}
//     </>
//   );
// }

import React from "react";
import { Link } from "react-router-dom";
import Banner from "./Banner";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home() {
  return (
    <>
      <Banner />
      <Features />
      <CallToAction />
      <Testimonials />
    </>
  );
}

function Features() {
  return (
    <div className="container my-5">
      <div className="row text-center">
        <div className="col-md-4">
          <i className="bi bi-briefcase-fill h1"></i>
          <h3>Professionalism</h3>
          <p>High standards in every project.</p>
        </div>
        <div className="col-md-4">
          <i className="bi bi-lightbulb-fill h1"></i>
          <h3>Expertise</h3>
          <p>Deep knowledge and skills to deliver top-notch results.</p>
        </div>
        <div className="col-md-4">
          <i className="bi bi-shield-fill-check h1"></i>
          <h3>Trust</h3>
          <p>
            Building long-lasting relationships based on trust and reliability.
          </p>
        </div>
      </div>
    </div>
  );
}

function Testimonials() {
  return (
    <div className="container my-5">
      <h2 className="text-center">Testimonials</h2>
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <p className="card-text">
                "The best freelance platform I have ever used. Highly
                recommended!"
              </p>
              <h5 className="card-title">- Jane Doe</h5>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <p className="card-text">
                "Professional and reliable services. Excellent experience!"
              </p>
              <h5 className="card-title">- John Smith</h5>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <p className="card-text">
                "A great place to find top-notch freelancers. Love it!"
              </p>
              <h5 className="card-title">- Mary Johnson</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CallToAction() {
  return (
    <div className="bg-action-color text-white text-center py-5">
      <h2>Ready to get started?</h2>
      <p style={{ marginBottom: "6px" }}>
        Join our platform and find the perfect freelance job or hire the best
        talent.
      </p>
      <Link className="btn btn-primary" to="/register">
        Sign Up Now
      </Link>
    </div>
  );
}
