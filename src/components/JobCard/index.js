import {Link} from 'react-router-dom'

import {FaStar} from 'react-icons/fa'

import {MdLocationOn} from 'react-icons/md'

import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

const JobCard = props => {
  const {jobItem} = props
  const {
    id,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobItem

  return (
      <li className="job-list-item">
      <Link to={`/jobs/${id}`} className="job-item-link">
        <div className="company-job-container">
          <img
            src={companyLogoUrl}
            className="company-logo"
            alt="company logo"
          />
          <div className="job-role-container">
            <h1 className="job-role">{title}</h1>
            <div className="rating-container">
              <FaStar className="star-img" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="job-details-container">
          <div className="job-profile-container">
            <div className="job-location-container">
              <MdLocationOn className="location-img" />
              <p className="location">{location}</p>
            </div>
            <div className="job-location-container">
              <BsBriefcaseFill className="location-img" />
              <p className="location">{employmentType}</p>
            </div>
          </div>
          <p className="package">{packagePerAnnum}</p>
        </div>
        <div className="description-container">
          <h1 className="description-heading">Description</h1>
          <p className="description">{jobDescription}</p>
        </div>
        </Link>
      </li>
  )
}

export default JobCard
