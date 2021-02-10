import React from 'react'
import { Link } from 'react-router-dom'

const CountryItem = ({to, value}) => {
	const { name, flag, population, region, capital } = value
	return (
		<div className="card rounded shadowed">
			<Link to={to}>
				<div className="card-image shadowed">
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