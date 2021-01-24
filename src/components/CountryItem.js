import React from 'react'
import { Link } from 'react-router-dom'

const CountryItem = props => {
	const {
		to,
		value
	} = props

	const { name, flag, population, region, capital } = value
	return (

		<div className="card rounded shadow-overlay">
			<Link to={to}>
				<div className="card-image">
					<img src={flag} alt="Flag" />
				</div>
				<div className="card-body">
					<p className="card-title"> {name} </p>
					<span> Population: {population} </span>
					<span> Region: {region} </span>
					<span> Capital: {capital} </span> 
				</div>
			</Link>
		</div>
	)
}

export default CountryItem