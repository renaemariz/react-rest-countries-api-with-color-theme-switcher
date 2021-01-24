import React from 'react'

const Navbar = ({isDarkMode, handleDarkMode}) => {
	return (
		<div className="nav">
			<nav>
				<div className="container flex">
					<h1 className="nav__title"> Where in the world? </h1>
					<div className="nav__toggle"  onClick={() => handleDarkMode(isDarkMode)}>
						<i className="far fa-moon"></i>
						Dark Mode
					</div>
				</div>
			</nav>
		</div>
	)
}

export default Navbar