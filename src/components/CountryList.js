import React, { useState, useEffect } from 'react'
import SearchBar from './Searchbar'
import Dropdown from './Dropdown'
import CountryItem from './CountryItem'
import Loading from './Loading'

const CountryList = () => {
	const [countrylist, setCountryList] = useState ([])
	const [input, setInput] = useState('')
	const [option, setOption] = useState('')
	const defaultUrl = `https://restcountries.eu/rest/v2/all`
	const [url, setUrl] = useState(defaultUrl)
	const [loading, setLoading] = useState (false)

	//set debounce default value first before clearing and adding a new timeout
	let debounce = 1;
	const handleOnChange = (e) => {
		setInput(e.target.value)
		clearTimeout(debounce);
		if (!e.target.value) return setUrl(defaultUrl);
		debounce = setTimeout(() => {
				setOption("all")
				setUrl(`https://restcountries.eu/rest/v2/name/${e.target.value}`)
		}, 2000);
	}

	const handleDropdownOnChange = (option) => {
		setLoading(false)
	    setInput('')
	    setOption(option)
	   	if(option === "all") return setUrl(defaultUrl);
	    setUrl(`https://restcountries.eu/rest/v2/region/${option}`)
	}

	useEffect(() => {
		const fetchCountries = async() => {
			setLoading(false)
			try {
		      const res = await fetch(url);
		      let data;
		      if (res.ok) {
		      	 data = await res.json();
		      	 		setCountryList(data);
						setLoading(true)
		       } else {
			    throw new Error('Something went wrong');
			  }
		    } catch (e) {
		    	setCountryList('');
		    	setLoading(true);
		    	console.log(e)
		    }
		}

	    fetchCountries()
	}, [url])

	return (
		<div className="countrylist-main">
			<div className="content-header flex">
				<SearchBar keyword={input} handleOnChange={handleOnChange} />
				<Dropdown option={option} handleDropdownOnChange={handleDropdownOnChange} />
			</div>
			{
				loading ?
				<div className="table-main">
				{
					countrylist.length ?
						countrylist.map((value, index) => {
						return (
							<div className="col" key={index}>
								<CountryItem  index={index} value={value} to={`/country/${value.alpha3Code}`} />
							</div>
						)
					}) : <div className="col"><h3> No Countries Found </h3> </div>
				}
				</div>
				: <div className="col mt-2 mx-n1"><Loading /></div>
			}
		</div>
	)
}

export default CountryList