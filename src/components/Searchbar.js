import React from 'react'

const SearchBar = ({handleOnChange}) => {
	return (
		<div className="searchbar rounded">
			<button className="searchbar-btn">
				<i className="fas fa-search"></i>
			</button>
			<input type="text" className="searchbar-input shadow-overlay" placeholder="Search for a country" name="country" defaultValue="" onChange={(e) => handleOnChange(e.target.value)} />
		</div>
	)
}

export default SearchBar