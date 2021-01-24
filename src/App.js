import React, {useState} from 'react'
import { Switch, Route} from 'react-router-dom'

import CountryList from './components/CountryList'
import CountryDetails from	'./components/CountryDetails'
import Navbar from './components/Navbar'


const App = () => {
	const [isDarkMode, setIsDarkMode] = useState(false)
	const handleDarkMode = () => {
		setIsDarkMode(!isDarkMode)
	}

	return (
		<div className='app-main' data-theme={(isDarkMode ? 'dark' : 'light')}>
			<Navbar isDarkMode={isDarkMode} handleDarkMode={handleDarkMode}/>
			<div className="container">
				<Switch>
					<Route path="/country/:name"> <CountryDetails/> </Route>
					<Route path="/"> <CountryList /> </Route>
				</Switch>
			</div>
		</div>
	)
}

export default App