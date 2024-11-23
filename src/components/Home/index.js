import {Link} from 'react-router-dom'

import Header from '../Header'

import './index.css'

const Home = () => (
  <div className="home-bg-container">
    <Header />
    <div className="home-container">
      <div className="text-container">
        <h1 className="find-job-heading">Find The Job That Fits Your Life</h1>
        <p className="find-job-details">
          Millions of people are searching for jobs, salary information, company
          reviews. Find the job that fits your abilities and potential
        </p>
        <Link to="/jobs">
          <button className="find-button" type="button">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  </div>
)

export default Home
