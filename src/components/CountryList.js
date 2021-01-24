import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import SearchBar from './Searchbar'
import Dropdown from './Dropdown'
import CountryItem from './CountryItem'


const CountryList = () => {
	const [countrylist, setCountryList] = useState ([])

	const [input, setInput] = useState('')

	const [option, setOption] = useState('')

	let debounce = 200;
	const handleOnChange = (input) => {
		clearTimeout(debounce);
		debounce = setTimeout( async() => {
			if(input) {
				const fetchData = await fetch(`https://restcountries.eu/rest/v2/name/${input}`);
				const data =  await fetchData.json();
				setCountryList(data);
			} else {
				fetchAllCountries();
			}
		}, 1000);
	}

	const fetchAllCountries = () => {
		fetch("https://restcountries.eu/rest/v2/all")
	      .then(res => res.json())
	      .then(
	        (result) => {
	        	setCountryList(result)
	        },
	        // Note: it's important to handle errors here
	        // instead of a catch() block so that we don't swallow
	        // exceptions from actual bugs in components.
	        (error) => {
	          console.log(error)
	        }
	      )
	}

	useEffect(() => {
	    fetchAllCountries()
	}, [])


	const handleDropdownOnChange = (option) => {
	     setOption(option)

	     if (option === "all") {
	     	fetchAllCountries() 
	     	return
	     }

	     const url = `https://restcountries.eu/rest/v2/region/${option}`
	     fetch(url)
	     .then(res => res.json())
	      .then(
	        (result) => {
	        	setCountryList(result)
	        },
	        // Note: it's important to handle errors here
	        // instead of a catch() block so that we don't swallow
	        // exceptions from actual bugs in components.
	        (error) => {
	          console.log(error)
	        }
	      )
	}

	return (
		<div className="countrylist-main">
			<div className="content-header flex">
				<SearchBar input={input} handleOnChange={handleOnChange} />
				<Dropdown option={option} handleDropdownOnChange={handleDropdownOnChange} />
			</div>
			<div className="table-main space-evenly">
			{
				countrylist.length ?
					countrylist.map((value, index) => {
					return (
						<div className="col" key={index}>
							<CountryItem  index={index} value={value} to={`/country/${value.alpha3Code}`} />
						</div>
					)
				}) : <span> No Countries Found </span>
			}
			</div>
		</div>
	)
}

export default CountryList