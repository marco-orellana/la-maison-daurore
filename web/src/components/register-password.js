import React, { Component } from 'react'
import { TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core'
import '../styles/_create-admin.scss'
import Fetch from '../utilities/fetch-datas'
import { withCookies } from 'react-cookie'
import Loading from '../components/loading'
import LockIcon from '@material-ui/icons/LockRounded'
const CreateAdminConfig = require('../forms-files/admin.json').create
const variables = require('../utilities/variables').variables

class CreateAdmin extends Component {
    constructor () {
        super()
        this.state = {
            error: {
                email: false,
                password: false,
                confirmPassword: false
            },
            enableSubmit: false,
            loading: false
        }

        this.fields = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            validation: true
        }
        this.handleBtnClick = this.handleBtnClick.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.saveAdmin = this.saveAdmin.bind(this)
    }

    getLangFile () { return require('../lang/' + this.props.lang + '/create-admin.json') }

    handleInputChange (event, name) {
        if (name === 'email') {
            this.fields[name] = event.target.value.toLowerCase()
        } else if (name === 'validation') {
            this.fields[name] = event.target.checked
        } else {
            this.fields[name] = event.target.value
        }
        this.checkEmptyInput()
    }

    checkEmptyInput () {
        (this.fields.email.length === 0 || this.fields.password.length === 0 || this.fields.confirmPassword.length === 0)
            ? this.setState({ enableSubmit: false })
            : this.setState({ enableSubmit: true })
    }

    handleBtnClick () {
        this.setState({ loading: true })
        if (!Fetch.validateEmail(this.fields.email)) {
            this.setState(state => {
                let newError = state.error
                newError = {
                    email: true,
                    password: false,
                    confirmPassword: false
                }
                return {
                    error: newError,
                    loading: false
                }
            })
        } else if (this.fields.password !== this.fields.confirmPassword) {
            this.setState(state => {
                let newError = state.error
                newError = {
                    email: false,
                    password: true,
                    confirmPassword: true
                }
                return {
                    error: newError,
                    loading: false
                }
            })
        } else {
            const params = {
                token: this.props.cookies.get(variables.cookies.token),
                role_title: 'admin',
                first_name: this.fields.firstName,
                last_name: this.fields.lastName,
                email: this.fields.email,
                password: this.fields.password,
                is_active: this.fields.validation
            }
            Fetch.addUser(params, this.saveAdmin)
        }
    }

    saveAdmin (success) {
        if (success) {
            this.setState(state => {
                let newError = state.error
                newError = {
                    email: false,
                    password: false,
                    confirmPassword: false
                }
                return {
                    error: newError,
                    loading: false
                }
            })
            console.log('Successful !!!')
        } else {
            this.setState(state => {
                let newError = state.error
                newError = {
                    email: false,
                    password: false,
                    confirmPassword: false
                }
                return {
                    error: newError
                }
            })
            console.log('Something wrong !!!')
        }
    }

    buildField (name, lang) {
        if (name !== 'validation') {
            const hasState = (name === 'firstName' || name === 'lastName') ? false : this.state.error[name]
            return (
                <TextField
                    key={variables.id.createAdmin[name]}
                    error={hasState}
                    id={variables.id.createAdmin[name]}
                    label={lang[name].label}
                    type={CreateAdminConfig[name].type}
                    color='primary'
                    helperText={hasState && lang[name].labelError}
                    variant='outlined'
                    onChange={event => this.handleInputChange(event, name)}
                    required={CreateAdminConfig[name].required}
                    value={this.fields[name]}
                />
            )
        } else {
            return (
                <FormControlLabel
                    key={variables.id.createAdmin[name]}
                    control={
                        <Checkbox
                            id={variables.id.createAdmin[name]}
                            checked={this.fields[name]}
                            onChange={event => this.handleInputChange(event, name)}
                            required={CreateAdminConfig[name].required}
                        />
                    }
                    label={lang[name].label}
                />
            )
        }
    }

    render () {
        const lang = this.getLangFile()
        return (
            <div className='create-admin'>
                <form className='' noValidate autoComplete='off'>
                    <h2>{lang.title}</h2>
                    <div className='fields'>
                        {Object.keys(CreateAdminConfig).map(name => this.buildField(name, lang))}
                        {this.state.enableSubmit && (
                            <div className='div-button'>
                                <Button
                                    onClick={this.handleBtnClick}
                                    variant='contained'
                                    color='secondary'
                                    size='small'
                                    fullWidth={false}
                                    startIcon={<LockIcon />}
                                >
                                    {lang.buttonLabel}
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

export default withCookies(CreateAdmin)
