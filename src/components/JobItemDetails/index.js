import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import {FaStar} from 'react-icons/fa'

import {MdLocationOn} from 'react-icons/md'

import {BsBriefcaseFill} from 'react-icons/bs'

import {FiExternalLink} from 'react-icons/fi'

import Header from '../Header'

import './index.css'

const apisStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class JobItemDetails extends Component {
  state = {jobDetails: {}, apiStatus: apisStatusConstants.initial}

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    this.setState({apiStatus: apisStatusConstants.inProgress})

    const response = await fetch(apiUrl, options)
    console.log(response)

    if (response.ok) {
      const jobData = await response.json()
      console.log(jobData)
      const jobDataDetails = jobData.job_details
      console.log(jobDataDetails)
      const jobSkills = jobDataDetails.skills
      const updatedSkills = jobSkills.map(skill => ({
        imageUrl: skill.image_url,
        name: skill.name,
      }))

      const updatedJobDataDetails = {
        companyLogoUrl: jobDataDetails.company_logo_url,
        companyWebsiteUrl: jobDataDetails.company_website_url,
        employmentType: jobDataDetails.employment_type,
        id: jobDataDetails.id,
        jobDescription: jobDataDetails.job_description,
        skills: updatedSkills,
        lifeAtCompany: {
          description: jobDataDetails.life_at_company.description,
          skillImageUrl: jobDataDetails.life_at_company.image_url,
        },
        location: jobDataDetails.location,
        packageperAnnum: jobDataDetails.package_per_annum,
        rating: jobDataDetails.rating,
        title: jobDataDetails.title,
      }

      console.log(updatedJobDataDetails)

      const similarJobsList = jobData.similar_jobs
      const updatedSimilarJobsList = similarJobsList.map(similarJob => ({
        similarCompanyLogoUrl: similarJob.company_logo_url,
        similarEmploymentType: similarJob.employment_type,
        similarId: similarJob.id,
        similarJobDescription: similarJob.job_description,
        similarLocation: similarJob.location,
        similarRating: similarJob.rating,
        similarTitle: similarJob.title,
      }))
      const updatedJobData = {
        updatedJobDataDetails,
        updatedSimilarJobsList,
      }

      this.setState({
        jobDetails: updatedJobData,
        apiStatus: apisStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apisStatusConstants.failure})
    }
  }

  onClickRetry = () => {
    this.getJobDetails()
  }

  renderSuccessView() {
    const {jobDetails} = this.state
    console.log(jobDetails)
    const {updatedJobDataDetails, updatedSimilarJobsList} = jobDetails
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      skills,
      lifeAtCompany,
      location,
      packageperAnnum,
      rating,
      title,
    } = updatedJobDataDetails
    const {description, skillImageUrl} = lifeAtCompany
    return (
      <div className="job-item-details-container">
        <div className="job-description-container">
          <div className="job-item-title-container">
            <img
              src={companyLogoUrl}
              className="job-item-logo-img"
              alt="job details company logo"
            />
            <div className="job-item-title-text-container">
              <h1 className="job-item-title">{title}</h1>
              <div className="job-item-rating-container">
                <FaStar className="job-item-star-img" />
                <p className="job-item-rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="job-item-package-container">
            <div className="job-item-location-type-container">
              <MdLocationOn className="job-item-location-type-img" />
              <p className="job-item-location-type">{location}</p>
            </div>
            <div className="job-item-location-type-container">
              <BsBriefcaseFill className="job-item-location-type-img" />
              <p className="job-item-location-type">{employmentType}</p>
            </div>
            <p className="job-item-package">{packageperAnnum}</p>
          </div>
          <div className="job-item-description-heading-container">
            <h1 className="job-item-description-heading">Description</h1>
            <div className="job-item-visit-container">
              <a className="visit-link" href={companyWebsiteUrl} target="blank">
                Visit
              </a>
              <FiExternalLink className="visit-img" />
            </div>
          </div>
          <p className="job-item-text">{jobDescription}</p>
          <h1 className="job-item-skills-heading">Skills</h1>
          <ul className="job-item-skills-list-container">
            {skills.map(skill => (
              <li className="job-item-skill" key={skill.name}>
                <img
                  src={skill.imageUrl}
                  className="skill-image"
                  alt={skill.name}
                />
                <p className="skill-title">{skill.name}</p>
              </li>
            ))}
          </ul>
          <h1 className="job-item-skills-heading">Life at Company</h1>
          <div className="company-details-container">
            <p className="job-item-text">{description}</p>
            <img
              src={skillImageUrl}
              className="job-item-company-img"
              alt="life at company"
            />
          </div>
        </div>
        <h1 className="similar-jobs-heading">Similar Jobs</h1>
        <ul className="similar-jobs-container">
          {updatedSimilarJobsList.map(similarJob => (
            <li className="similar-job-item-container" key={similarJob.id}>
              <div className="similar-job-item-title-container">
                <img
                  src={similarJob.similarCompanyLogoUrl}
                  className="similar-logo-img"
                  alt="similar job company logo"
                />
                <div className="similar-job-item-title-text-container">
                  <h1 className="similar-job-item-title">
                    {similarJob.similarTitle}
                  </h1>
                  <div className="similar-job-item-rating-container">
                    <FaStar className="job-item-similar-star-img" />
                    <p className="similar-job-item-title">
                      {similarJob.similarRating}
                    </p>
                  </div>
                </div>
              </div>
              <h1 className="similar-description-heading">Description</h1>
              <p className="similar-job-item-description">
                {similarJob.similarJobDescription}
              </p>
              <div className="similar-job-locaction-type-container">
                <div className="similar-job-locaction-container">
                  <MdLocationOn className="similar-job-locaction-type-img" />
                  <p className="similar-job-locaction-type">
                    {similarJob.similarLocation}
                  </p>
                </div>
                <div className="similar-job-locaction-container">
                  <BsBriefcaseFill className="similar-job-locaction-type-img" />
                  <p className="similar-job-locaction-type">
                    {similarJob.similarEmploymentType}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="job-item-failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="job-item-failure-view-img"
      />
      <h1 className="job-item-failure-heading">Oops! Something went Wrong</h1>
      <p className="job-item-failure-text">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        className="job-item-retry-button"
        onClick={this.onClickRetry}
      >
        Retry
      </button>
    </div>
  )

  renderStatusView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apisStatusConstants.success:
        return this.renderSuccessView()
      case apisStatusConstants.inProgress:
        return this.renderLoaderView()
      case apisStatusConstants.failure:
        return this.renderFailureView()
    }
  }

  render() {
    return (
      <div className="job-item-details-bg-container">
        <Header />
        {this.renderStatusView()}
      </div>
    )
  }
}

export default JobItemDetails
