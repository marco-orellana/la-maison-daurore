import React, { Component } from 'react'
import '../styles/_create-admin.scss'
import Fetch from '../utilities/fetch-datas'
import { withCookies } from 'react-cookie'
import Loading from '../components/loading'
import LockIcon from '@material-ui/icons/LockRounded'
import Snack from '../components/snack'
import { Button } from '@material-ui/core'
import Form from './forms/builds'
const CreateAdminConfig = require('../forms-files/admin.json').create
const variables = require('../utilities/variables').variables

const fieldsState = {
    fields: {
        sex: null,
        firstName: null,
        lastName: null,
        contactPersonal: null,
        contactWork: null,
        email: null,
        password: null,
        confirmPassword: null,
        validation: true
    },
    errors: {
        sex: false,
        firstName: false,
        lastName: false,
        email: false,
        password: false,
        confirmPassword: false
    }
}

class CreateAdmin extends Component {
    constructor () {
        super()
        this.state = {
            ...fieldsState,
            loading: false,
            showSnack: false
        }
        this.handleBtnClick = this.handleBtnClick.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.savedUser = this.savedUser.bind(this)
        this.handleCloseSnack = this.handleCloseSnack.bind(this)
        this.checkValidation = this.checkValidation.bind(this)
        this.setEmailError = this.setEmailError.bind(this)
    }
    componentDidMount(){
        // Initiate all fields
        this.setState({
            fields: {
                ...this.state.fields,
                ...fieldsState.fields
            },
            errors: {
                ...this.state.errors,
                ...fieldsState.errors
            },
            loading: false,
            showSnack: false
        })
    }

    getLangFile () { return require('../lang/' + this.props.lang + '/create-admin.json') }

    handleInputChange (event, name, type) {
        let newValue = null
        if (name === 'validation') {
            newValue = event.target.checked
        } else {
            newValue = event.target.value === '' ? null : event.target.value
        }
        this.setState(state => {
            const fields = state.fields
            fields[name] = newValue
            return { fields: fields }
        })
    }

    setEmailError(found){
        this.setState({
            errors: {
                ...this.state.errors,
                email: found
            }
        })
    }

    checkEmailValidity () {
        const email = this.state.fields.email
        if (email !== null && Fetch.validateEmail(email)) {
            Fetch.login.checkIfExist(email, this.setEmailError)
        } else {
            return true
        }
    }

    checkValidation(){
        const fields = this.state.fields
        const newErrors = {
            sex: fields.sex === null,
            lastName: fields.lastName === null,
            firstName: fields.firstName === null,
            email: this.checkEmailValidity(),
            password: fields.password === null || fields.password !== fields.confirmPassword,
            confirmPassword: fields.confirmPassword === null || fields.password !== fields.confirmPassword
        }
        this.setState({
            errors: {
                ...this.state.errors,
                ...newErrors
            }
        })
        const value = Object.values(newErrors).filter(val => val === true)
        return value.length !== 0
    }

    handleBtnClick () {
        this.setState({ loading: true })
        if(!this.checkValidation()){
            const fields = this.state.fields
            fields.lastName = fields.lastName.toUpperCase()

            const idRole = this.props.roles.filter(x => x.title === 'admin')[0]._id

            const templateUser = require('../utilities/variables').variables.templateUser
            const user = {
                ...templateUser,
                role_title: 'admin',
                first_name: fields.firstName,
                last_name: fields.lastName,
                sex: fields.sex,
                contact:[
                    {
                        ...templateUser.contact[0],
                        personal: fields.contactPersonal,
                        work: fields.contactWork
                    }
                ],
                id_user: null,
                email: fields.email,
                password: fields.password,
                is_active: fields.validation,
                token: this.props.cookies.get(variables.cookies.token)
            }
            Fetch.addUser(user, this.savedUser)
        } else {
            this.setState({ loading: false })
        }
    }

    savedUser (data) {
        if(data){
            this.setState({ loading: false, showSnack: true })
            this.props.onGetBack('register')
        }
    }

    handleCloseSnack () {
        this.setState({ showSnack: false })
    }

    render () {
        const lang = this.getLangFile()
        return (
            <div className='create-admin'>
                <form className='' noValidate autoComplete='off'>
                    <h2>{lang.title}</h2>
                    <div className='fields'>
                        {CreateAdminConfig.map(field => (
                            Form[field.type](field, this.props.lang, lang, this.state.fields, this.state.errors, this.handleInputChange, variables.id.createAdmin)
                        ))}
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
                        {this.state.loading && (<Loading lang={this.props.lang} />)}
                    </div>
                </form>
                <Snack show={this.state.showSnack} duration={3000} message='Nouvel administrateur ajoutee avec succes' onClose={this.handleCloseSnack} severity='success' />
            </div>
        )
    }
}

export default withCookies(CreateAdmin)
