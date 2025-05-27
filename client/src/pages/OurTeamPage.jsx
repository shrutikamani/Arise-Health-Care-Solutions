import React from 'react'
import Team from '../components/features/Team'
import { Link } from 'react-router-dom'


const OurTeamPage = () =>
{
  return (
    <>
      <div className="container-fluid bg-breadcrumb">
        <div className="container text-center py-5" style={{ maxWidth: "900px" }}>
          <h3
            className="text-white display-1 mb-4 wow animate__animated animate__fadeInDown"
            data-wow-delay="0.1s"
          >
            Our Team
          </h3>
          <ul
            className="breadcrumb d-flex justify-content-center items-center mb-0 wow animate__animated animate__fadeInDown"
            data-wow-delay="0.3s"
          >
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/">Features</Link>
            </li>
            <li className="breadcrumb-item active text-info">Team</li>
          </ul>
        </div>
      </div>

      <div className="wow animate__animated animate__fadeInUp" data-wow-delay="0.2s">
        <Team />
      </div>

    </>
  )
}

export default OurTeamPage