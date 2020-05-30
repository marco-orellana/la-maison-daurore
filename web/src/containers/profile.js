import React, { Component } from 'react'
import '../styles/_profile.scss'
import Fetch from '../utilities/fetch-datas'
import { withCookies } from 'react-cookie'
import EditIcon from '@material-ui/icons/Edit'
import Snack from '../components/snack'
import { Button } from '@material-ui/core'
import Form from '../components/forms/builds'
const UpdateProfileConfig = require('../forms-files/user-profile.json').update
const variables = require('../utilities/variables').variables

const fieldsState = {
    fields: {
        first_name: null,
        last_name: null,
        email: null,
        personal: null,
        work: null,
        home: null,
        emergency: null,
        oldPassword: null,
        newPassword: null,
        newConfirmPassword: null
    },
    errors: {
        email: false,
        last_name: false,
        first_name: false,
        personal: false,
        work: false,
        home: false,
        emergency: false,
        password: false,
        oldPassword: false,
        newConfirmPassword: false
    }
}

class Profile extends Component {
    constructor () {
        super()
        this.state = {
            ...fieldsState,
            currentUser: null,
            showSnack: false
        }
        this.initiateState = this.initiateState.bind(this)
        this.setCurrentUser = this.setCurrentUser.bind(this)
        this.handleBtnClick = this.handleBtnClick.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.updatedUser = this.updatedUser.bind(this)
        this.handleCloseSnack = this.handleCloseSnack.bind(this)
        this.checkValidation = this.checkValidation.bind(this)
        this.setEmailError = this.setEmailError.bind(this)
    }

    setCurrentUser(token, data){
        const getCurrentUser = {...data.data}
        this.setState({
            currentUser: { ...getCurrentUser },
            fields: {
                ...fieldsState.fields,
                ...this.state.fields,
                last_name: getCurrentUser.last_name,
                first_name: getCurrentUser.first_name,
                personal: getCurrentUser.contact.length > 0 ? getCurrentUser.contact[0].personal : null,
                work: getCurrentUser.contact.length > 0 ? getCurrentUser.contact[0].work : null,
                home: getCurrentUser.contact.length > 0 ? getCurrentUser.contact[0].home : null,
                emergency: getCurrentUser.contact.length > 0 ? getCurrentUser.contact[0].emergency : null
            }
        })
    }

    initiateState(){
        Fetch.auth.currentUser(this.props.cookies.get(variables.cookies.token), this.setCurrentUser)
        const currentUserLogin = this.getCurrentUserLogin()
        this.setState({
            fields: {
                ...fieldsState.fields,
                ...this.state.fields,
                email: currentUserLogin.email
            },
            errors: {
                ...this.state.errors,
                ...fieldsState.errors
            },
            showSnack: false
        })
    }

    componentDidMount(){
        // Initiate all fields
        this.initiateState()
    }

    getLangFile () { return require('../lang/' + this.props.lang + '/profile.json') }

    handleInputChange (event, name, type) {
        const newValue = event.target.value === '' ? null : event.target.value
        this.setState(state => {
            const fields = state.fields
            fields[name] = newValue
            return { fields: fields }
        })
    }

    setEmailError(found){
        this.setState({ errors: { ...this.state.errors, email: found } })
    }

    checkEmailValidity () {
        const email = this.state.fields.email
        if(email !== null && Fetch.validateEmail(email) && email !== this.getCurrentUserLogin().email)
            Fetch.login.checkIfExist(email, this.setEmailError)
        else if(email !== null && Fetch.validateEmail(email) && email === this.getCurrentUserLogin().email)
            return false
        else
            return true
    }

    checkValidation() {
        const fields = this.state.fields
        const newErrors = {
            last_name: fields.last_name === null,
            first_name: fields.first_name === null,
            email: this.checkEmailValidity(),
            personal: fields.personal === null && fields.work === null && fields.home === null && fields.emergency === null,
            work: fields.personal === null && fields.work === null && fields.home === null && fields.emergency === null,
            home: fields.personal === null && fields.work === null && fields.home === null && fields.emergency === null,
            emergency: fields.personal === null && fields.work === null && fields.home === null && fields.emergency === null,
            oldPassword: fields.oldPassword !== this.getCurrentUserLogin().password,
            newPassword: (fields.newPassword !== null || fields.newConfirmPassword !== null) && fields.newPassword !== fields.newConfirmPassword,
            newConfirmPassword: (fields.newPassword !== null || fields.newConfirmPassword !== null) && fields.newPassword !== fields.newConfirmPassword
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

    getCurrentUserLogin () {
        const loginToken = (this.props.cookies.get(variables.cookies.login))
        return Fetch.decodeData(loginToken)
    }

    handleBtnClick () {
        if(!this.checkValidation()){
            const fields = this.state.fields
            fields.first_name = fields.first_name !== null ? fields.first_name : fields.first_name
            fields.last_name = fields.last_name !== null ? fields.last_name.toUpperCase() : fields.last_name

            const user = {
                ...this.state.currentUser,
                first_name: fields.first_name,
                last_name: fields.last_name,
                email: fields.email,
                contact:[
                    {
                        personal: fields.personal,
                        work: fields.work,
                        home: fields.home,
                        emergency: fields.emergency
                    }
                ]
            }
            const updateEmail = {
                currentPassword: this.getCurrentUserLogin().password,
                newEmail: fields.email
            }
            const updatePassword = {
                currentPassword: this.getCurrentUserLogin().password,
                newPassword: fields.newPassword === null ? fields.oldPassword : fields.newPassword
            }
            const func = {
                email: fields.email === this.getCurrentUserLogin().email ? null : updateEmail,
                password: fields.newPassword === null ? null : updatePassword
            }
            Fetch.user.updateProfile(this.props.cookies.get(variables.cookies.token), func, user, updateEmail, updatePassword, this.updatedUser)
        }
    }

    updatedUser (dataUser, dataEmail, dataPassword) {
        this.props.cookies.set(variables.cookies.user, Fetch.encodeData(dataUser), { path: '/' })
        this.props.cookies.set(variables.cookies.login, Fetch.encodeData({ password: dataPassword.newPassword, email: dataEmail.newEmail }), { path: '/' })
        this.initiateState()
        this.setState({ showSnack: true })
    }

    handleCloseSnack () {
        this.setState({ showSnack: false })
    }

    render () {
        const lang = this.getLangFile()
        return (
            <div className='profile'>
                <form className='' noValidate autoComplete='off'>
                    <h2>{lang.title}</h2>
                    <div className='fields'>
                        {UpdateProfileConfig.map(field => (
                            Form[field.type](field, this.props.lang, lang, this.state.fields, this.state.errors, this.handleInputChange, variables.id.updateUser)
                        ))}
                        <div className='div-button'>
                            <Button
                                onClick={this.handleBtnClick}
                                variant='contained'
                                color='secondary'
                                size='small'
                                fullWidth={false}
                                startIcon={<EditIcon />}
                            >
                                {lang.buttonLabel}
                            </Button>
                        </div>
                    </div>
                </form>
                <Snack show={this.state.showSnack} duration={3000} message={lang.messageSnack} onClose={this.handleCloseSnack} severity='success' />
            </div>
        )
    }
}

export default withCookies(Profile)
