import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'
import './styles/index.scss'
import MainContainer from './containers/container'

ReactDOM.render(
    <CookiesProvider>
        <BrowserRouter>
            <MainContainer />
        </BrowserRouter>
    </CookiesProvider>,
    document.getElementById('root')
)
