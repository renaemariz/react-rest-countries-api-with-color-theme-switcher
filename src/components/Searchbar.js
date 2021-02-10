import React from 'react'

const SearchBar = ({keyword, handleOnChange}) => {
	return (
		<div className="searchbar rounded">
			<button className="searchbar-btn">
				<i className="fas fa-search"></i>
			</button>
			<input type="text" className="searchbar-input shadowed" placeholder="Search for a country" name="country" value={keyword} onChange={handleOnChange} />
		</div>
	)
}

export default SearchBar