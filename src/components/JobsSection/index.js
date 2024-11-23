import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import {BsSearch} from 'react-icons/bs'

import Header from '../Header'
import FilterCard from '../FilterCard'
import JobCard from '../JobCard'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class JobsSection extends Component {
  state = {
    jobsList: [],
    activeEmploymentTypeIdList: [],
    activeSalaryRangeId: '',
    searchInput: '',
    activSearchValue: '',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobsData()
  }

  getJobsData = async () => {
    const {activeEmploymentTypeIdList, activeSalaryRangeId, activSearchValue} =
      this.state
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${activeEmploymentTypeIdList.join()}&minimum_package=${activeSalaryRangeId}&search=${activSearchValue}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    this.setState({apiStatus: apiStatusConstants.inProgress})

    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const data = await response.json()
      const jobsData = data.jobs
      const updatedJobsList = jobsData.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))

      this.setState({
        jobsList: updatedJobsList,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickRetryButton = () => {
    this.getJobsData()
  }

  onClickSearchButton = () => {
    const {searchInput} = this.state

    this.setState({activSearchValue: searchInput}, this.getJobsData)
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onChangeSalaryRange = salaryRangeId => {
    this.setState({activeSalaryRangeId: salaryRangeId}, this.getJobsData)
  }

  onChangeEmploymentType = employmentTypeId => {
    const {activeEmploymentTypeIdList} = this.state

    if (activeEmploymentTypeIdList.includes(employmentTypeId)) {
      this.setState(
        prevState => ({
          activeEmploymentTypeIdList:
            prevState.activeEmploymentTypeIdList.filter(
              eachItem => eachItem !== employmentTypeId,
            ),
        }),
        this.getJobsData,
      )
    } else {
      this.setState(
        prevState => ({
          activeEmploymentTypeIdList: [
            ...prevState.activeEmploymentTypeIdList,
            employmentTypeId,
          ],
        }),
        this.getJobsData,
      )
    }
  }

  renderSuccessView = () => {
    const {jobsList, searchInput} = this.state
    const isListEmpty = jobsList.length === 0

    return (
      <>
        {!isListEmpty ? (
          <div className="jobs-container">
            <div className="input-container">
              <input
                type="search"
                value={searchInput}
                placeholder="Search"
                className="search-input-text"
                onChange={this.onChangeSearchInput}
              />
              <button
                type="button"
                className="search-button"
                onClick={this.onClickSearchButton}
                data-testid="searchButton"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            <ul className="jobs-list-container">
              {jobsList.map(eachJob => (
                <JobCard jobItem={eachJob} key={eachJob.id} />
              ))}
            </ul>
          </div>
        ) : (
          <div className="jobs-section-failure-view-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png "
              alt="no jobs"
              className="jobs-section-failure-view-img"
            />
            <h1 className="jobs-section-failure-heading">No Jobs Found</h1>
            <p className="jobs-section-failure-text">
              We could not find any jobs. Try other filters.
            </p>
          </div>
        )}
      </>
    )
  }

  renderLoaderView = () => (
    <div className="jobs-section-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="jobs-section-failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="jobs-section-failure-view-img"
      />
      <h1 className="jobs-section-failure-heading">
        Oops! Something went Wrong
      </h1>
      <p className="jobs-section-failure-text">
        We cannot seem to find the page you looking for
      </p>
      <button
        type="button"
        className="jobs-section-retry-button"
        onClick={this.onClickRetryButton}
      >
        Retry
      </button>
    </div>
  )

  renderStatusView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        null
    }
  }

  render() {
    const {searchInput} = this.state

    return (
      <div className="jobs-section-bg-container">
        <Header />
        <div className="jobs-section-container">
          <div className="mobile-input-container">
            <input
              type="search"
              value={searchInput}
              placeholder="Search"
              className="search-input-text"
              onChange={this.onChangeSearchInput}
            />
            <button
              className="search-button"
              onClick={this.onClickSearchButton}
              data-testid="searchButton"
            >
              <BsSearch className="search-icon" />
            </button>
          </div>
          <FilterCard
            employmentTypesList={employmentTypesList}
            salaryRangesList={salaryRangesList}
            onChangeEmploymentType={this.onChangeEmploymentType}
            onChangeSalaryRange={this.onChangeSalaryRange}
          />
          {this.renderStatusView()}
        </div>
      </div>
    )
  }
}

export default JobsSection
