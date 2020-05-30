import React, { Component } from 'react'
import Fetch from '../utilities/fetch-datas'
import '../styles/_login.scss'
import { withCookies } from 'react-cookie'
import Loading from '../components/loading'
import LockIcon from '@material-ui/icons/LockRounded'
import { TextField, Button } from '@material-ui/core'
const LoginConfig = require('../forms-files/login.json')
const variables = require('../utilities/variables').variables

class Login extends Component {
    constructor () {
        super()
        this.state = {
            loginConfig: null,
            error: false,
            enableSubmit: false,
            userToken: null,
            loading: false
        }
        this.email = ''
        this.password = ''
        this.userRole = null
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleBtnClick = this.handleBtnClick.bind(this)
        this.validateUser = this.validateUser.bind(this)
    }

    getLangFile () { return require('../lang/' + this.props.lang + '/login.json') }

    componentDidMount () {
        this.setState({ loginConfig: LoginConfig })
    }

    validateUser (datas) {
        if (datas.success) {
            this.setState({ error: false, loading: false })
            this.props.cookies.set(variables.cookies.login, Fetch.encodeData({ password: this.password, email: this.email }), { path: '/' })
            this.props.handleConnectedEvent(event, datas.token, this.password)
        } else this.setState({ error: true, loading: false })
    }

    handleBtnClick () {
        this.setState({ loading: true })
        Fetch.validateEmail(this.email)
            ? Fetch.authLogin(this.email, this.password, this.validateUser)
            : this.setState({ error: true, loading: false })
    }

    handleInputChange (event) {
        (event.target.id === variables.id.login.email
            ? this.email = event.target.value.toLowerCase()
            : this.password = event.target.value)

        this.checkEmptyInput()
    }

    checkEmptyInput () {
        (this.email.length === 0 || this.password.length === 0)
            ? this.setState({ enableSubmit: false })
            : this.setState({ enableSubmit: true })
    }

    buildFields (lang) {
        const error = this.state.error
        const fields = this.state.loginConfig
        return (
            <>
                <TextField
                    error={error}
                    key={variables.id.login.email}
                    id={variables.id.login.email}
                    label={lang.emailLabel}
                    type={fields.email.type}
                    color='primary'
                    helperText={error && lang.messageErrorLogin}
                    variant='outlined'
                    onChange={this.handleInputChange}
                    required={fields.email.required}
                    value={this.email}
                />
                <TextField
                    error={error}
                    key={variables.id.login.password}
                    id={variables.id.login.password}
                    label={lang.passwordLabel}
                    type={fields.password.type}
                    color='primary'
                    helperText={error && lang.messageErrorLogin}
                    variant='outlined'
                    onChange={this.handleInputChange}
                    required={fields.password.required}
                />
            </>
        )
    }

    render () {
        const langFile = this.getLangFile()
        const { loginConfig } = this.state
        return (
            <div className='login'>
                <form noValidate autoComplete='off'>
                    <h2>{langFile.title}</h2>
                    <div className='fields'>
                        {loginConfig !== null && (this.buildFields(langFile))}
                        {this.state.enableSubmit && (
                            <div className='div-button'>
                                <Button
                                    onClick={this.handleBtnClick}
                                    variant='contained'
                                    color='secondary'
                                    size='medium'
                                    fullWidth={false}
                                    startIcon={<LockIcon />}
                                >
                                    {langFile.buttonLabel}
                                </Button>
                            </div>
                        )}
                        {this.state.loading && (<Loading lang={this.props.lang} />)}
                    </div>
                </form>
            </div>
        )
    }
}
export default withCookies(Login)
