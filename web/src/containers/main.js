import React, { Component } from 'react'
import Login from './login'
import Register from './register'
import RegisterStart from '../components/register-start'
import Dashbord from './dashbord'
import { withCookies } from 'react-cookie'
import '../styles/_main.scss'
const variablesCookies = require('../utilities/variables').variables.cookies
const ids = require('../utilities/variables').variables.id.loginRegister

class Main extends Component {
    constructor () {
        super()
        this.state = {
            showRegisterForm: false,
            currentActor: null
        }
        this.toggleForm = React.createRef()
        this.handleCheckActor = this.handleCheckActor.bind(this)
        this.handleToggleForm = this.handleToggleForm.bind(this)
    }

    handleCheckActor () {
        this.setState({ currentActor: event.target.id })
    }

    handleToggleForm () {
        event.target.id === ids.showLogin && this.setState({ currentActor: null })
        this.toggleForm.current.classList.toggle('show-register')
    }

    getLangFile () {
        return require('../lang/' + this.props.lang + '/main.json')
    }

    render () {
        const lang = this.getLangFile()
        return (
            <main>
                {this.props.cookies.get(variablesCookies.user) === undefined
                    ? (
                        <div>
                            <div className='main-container' ref={this.toggleForm}>
                                <div className='main-connexion'>
                                    <Login
                                        lang={this.props.lang}
                                        handleConnectedEvent={this.props.onhandleLogInClick}
                                    />
                                    <h1>{lang.or}</h1>
                                    <RegisterStart
                                        lang={this.props.lang}
                                        onShowRegisterForm={this.handleToggleForm}
                                        onCheckActor={this.handleCheckActor}
                                        currentActor={this.state.currentActor}
                                    />
                                </div>
                                <div className='main-register'>
                                    <Register lang={this.props.lang} onShowLoginForm={this.handleToggleForm} currentActor={this.state.currentActor} />
                                </div>
                            </div>
                        </div>
                    )
                    : <Dashbord lang={this.props.lang} handleLogOutEvent={this.props.onhandleLogOutClick} />}
            </main>
        )
    }
}
export default withCookies(Main)
