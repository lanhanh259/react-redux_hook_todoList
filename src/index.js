import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import App from './App'
import Details from './components/Details'
import './index.css'
import reportWebVitals from './reportWebVitals'
import store from './store'

ReactDOM.render(
	<Provider store={store}>
		<React.StrictMode>
			<BrowserRouter>
				<Link
					to={'/'}
					style={{
						padding: '10px 0',
						marginBottom: '20px',
						backgroundColor: '#34b3e3',
						textAlign: 'center',
					}}
				>
					<h1>
						React-Redux with<span style={{ fontWeight: 400 }}> hook</span>
					</h1>
				</Link>
				<Routes>
					<Route path="/" element={<App />}></Route>
					<Route path=":indexTodo" element={<Details />}></Route>
				</Routes>
			</BrowserRouter>
		</React.StrictMode>
	</Provider>,
	document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
