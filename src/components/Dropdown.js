import React from 'react'

const Dropdown = ({option, handleDropdownOnChange}) => {
	return (
		<div className="dropdown">
			<select className="dropdown-select rounded shadowed" name="region" id="region" value={option} onChange={(e) => handleDropdownOnChange(e.target.value)}>
			    <option value="all">Filter by Region</option>
			    <option value="africa">Africa</option>
			    <option value="americas">America</option>
			    <option value="asia">Asia</option>
			    <option value="europe">Europe</option>
			    <option value="oceania">Oceania</option>
		  	</select>
		</div>
	)
}

export default Dropdown