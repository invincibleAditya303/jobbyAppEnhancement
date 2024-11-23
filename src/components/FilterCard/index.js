import JobProfile from '../JobProfile'

import './index.css'

const FilterCard = props => {
  const {
    employmentTypesList,
    salaryRangesList,
    onChangeEmploymentType,
    onChangeSalaryRange,
  } = props

  const onChangeEmployment = event => onChangeEmploymentType(event.target.value)
  const onChangeSalaryRangeType = event =>
    onChangeSalaryRange(event.target.value)

  return (
    <div className="filter-card-container">
      <JobProfile />
      <div className="employment-container">
        <h1 className="employment-heading">Type of Employement</h1>
        <ul className="employment-list-container">
          {employmentTypesList.map(eachItem => (
            <li className="list-item-container" key={eachItem.employmentTypeId}>
              <input
                type="checkbox"
                value={eachItem.employmentTypeId}
                id={eachItem.employmentTypeId}
                className="list-input"
                onChange={onChangeEmployment}
              />
              <label
                htmlFor={eachItem.employmentTypeId}
                className="label-heading"
              >
                {eachItem.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div className="employment-container">
        <h1 className="employment-heading">Salary Range</h1>
        <ul className="employment-list-container">
          {salaryRangesList.map(eachItem => (
            <li className="list-item-container" key={eachItem.salaryRangeId}>
              <input
                type="radio"
                value={eachItem.salaryRangeId}
                id={eachItem.salaryRangeId}
                name="salary"
                onChange={onChangeSalaryRangeType}
              />
              <label htmlFor={eachItem.salaryRangeId} className="label-heading">
                {eachItem.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default FilterCard
