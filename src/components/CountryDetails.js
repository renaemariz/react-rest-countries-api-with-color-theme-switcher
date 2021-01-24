import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

const CountryDetails = () => {
	const { name } = useParams()
	const [country, setCountry] = useState ([])

	const { flag, nativeName, population, region, subregion, capital, topLevelDomain, currencies, languages, borders } = country;

	const fetchCountryDetails = async () => {
		const fetchData = await fetch(`https://restcountries.eu/rest/v2/alpha/${name}`);
		return await fetchData.json();
	}

	const fetchBorderCountries = async (borders) => {
		let borderStr = borders.toString();
		let newBorder = borderStr.replace(/,/g, ";");
		if(borders.length == 0) return
		const fetchData = await fetch(`https://restcountries.eu/rest/v2/alpha?codes=${newBorder}&fields=name;alpha3Code`)
		return await fetchData.json();
	}

	const setDetails = async () => {
		const countryDetails = await fetchCountryDetails();
		const countryBorders = await fetchBorderCountries(countryDetails.borders);
		countryDetails.borders = countryBorders;
		let details = countryDetails;
		setCountry(details);
	}

	useEffect(() => {
		setDetails();
	}, [name])

	return (
		<div className="country-details-main">
			<div className="content-header flex">
				<Link to="/" className="btn back-btn rounded shadow-overlay"> <i className="fas fa-arrow-left"></i> Back </Link> 
			</div>

		{
				country ?

			<div className="card card-lg card-horizontal">
			    <div className="card-image">
			    	<img src={flag} alt="flag" />
                </div>
                <div className="card-content">
	                <div className="card-body">
	                    <h2 className="card-title"> { name } </h2>
						<span> Native name: { nativeName } </span>
	                    <span> Population: { population } </span>
	                    <span>Region: { region } </span>
	                    <span>Sub Region: {subregion}</span>
	                    <span>Capital: { capital } </span>
	                    <span>Top Level Domain: { topLevelDomain } </span>
	                    <span> Currencies:
							{	
								currencies ?
								currencies.map((value, index) => { 
									return (
										<span key={index}> {value.name} </span>
									)
								})
								: <span> N/A </span>	
							}
	                	</span>
	                    <span> Languages: 
							{	
								languages ?
								languages.map((value, index) => { 
									return (
										<span key={index}>{ (index ? ', ' : ' ')+value.name }</span>
									)
								})
								: <span> N/A </span>	
							}
	                	</span>	                	
	                </div>
	                <div className="card-footer">
	                	<div className="tags">
		                    <p className="tags-title"> Border Countries: </p>
		                    <div>
								{	
									borders ?
										borders.slice(0, 3).map((value, index) => { 
												return (
													<Link key={index} className="btn tags-btn rounded shadow-overlay" to={`/country/${value.alpha3Code}`}>
														<span> {value.name} </span>
													</Link>
												)
										})
									: <span> N/A </span>	
								}
		                    </div> 
		                </div>
	                </div>
	            </div>    
			</div> : <span> No Country Found </span>
		}
		</div>
	)
}

export default CountryDetails