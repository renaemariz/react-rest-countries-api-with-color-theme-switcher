import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Loading from './Loading'

const CountryDetails = () => {
	console.log("deets")
	const { name } = useParams()
	const [country, setCountry] = useState ([])
	const [loading, setLoading] = useState (false)

	const { flag, nativeName, population, region, subregion, capital, topLevelDomain, currencies, languages, borders } = country;

	useEffect(() => {
		const controller = new AbortController()
		const { signal } = controller;
		let errMsg = '';

		setLoading(false);

		const setDetails = async () => {
			const countryDetails = await fetchCountryDetails();
			const countryBorders = await fetchBorderCountries(countryDetails.borders);
			
			if (errMsg) return

			countryDetails.borders = countryBorders;
			let details = countryDetails;
			setCountry(details);
			setLoading(true);
		}

		const fetchCountryDetails = async () => {
			try {
		      const res = await fetch(`https://restcountries.eu/rest/v2/alpha/${name}`, {signal: signal});
		      if (res.ok) {
		      	 return await res.json()
		       } else {
			    throw new Error('Something went wrong')
			  }
		    } catch (e) {
		    	console.log(e)
		    	errMsg = e
		    }
		}

		const fetchBorderCountries = async (borders) => {
			if(borders.length === 0) return
			let borderStr = borders.toString()
			let newBorder = borderStr.replace(/,/g, ";")
			try {
		      const res = await fetch(`https://restcountries.eu/rest/v2/alpha?codes=${newBorder}&fields=name;alpha3Code`, {signal: signal});
		      if (res.ok) {
		      	 return await res.json();
		       } else {
			    throw new Error('Something went wrong');
			  }
		    } catch (e) {
		    	console.log(e)
		    	errMsg = e
		    }
		}
		setDetails();

		return () => controller.abort()
	}, [name])

	return (
		<div className="country-details-main">
			<div className="content-header flex">
				<Link to="/" className="btn back-btn rounded shadowed"> <i className="fas fa-arrow-left"></i> Back </Link> 
			</div>

		{
			loading ?
				country ?

			<div className="card card-lg card-horizontal">
			    <div className="card-image">
			    	<img src={flag} alt="flag" />
                </div>
                <div className="card-content">
	                <h2 className="card-title"> { country.name } </h2>
	                <div className="card-body">
	                	<div className="row">
							<span> <strong>Native name:</strong> { nativeName } </span>
		                    <span> <strong>Population:</strong> { population } </span>
		                    <span> <strong>Region: </strong>{ region } </span>
		                    <span> <strong>Sub Region: </strong> {subregion}</span>
		                    <span> <strong>Capital: </strong> { capital } </span>
	                    </div>
	                    <div className="row">
		                    <span> <strong>Top Level Domain: </strong> { topLevelDomain } </span>
		                    <span> <strong>Currencies: </strong>
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
		                    <span> <strong>Languages: </strong>
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
	                </div>
	                <div className="card-footer">
	                	<div className="tags">
		                    <p className="tags-title"> <strong> Border Countries: </strong> </p>
		                    <div className="tags-list">
								<ul>
								{	
									borders ?
										borders.slice(0, 3).map((value, index) => { 
												return (
													<li key={index} >
													<Link className="btn tags-btn rounded shadowed" to={`/country/${value.alpha3Code}`}>
														<span> {value.name} </span>
													</Link>

													</li>
												)
										}) 
									: <span> N/A </span>	
								}
								</ul>
		                    </div> 
		                </div>
	                </div>
	            </div>    
			</div> : <span> No Country Found </span>
			 : <Loading />
		}
		</div>
	)
}

export default CountryDetails