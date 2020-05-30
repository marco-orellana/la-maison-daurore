import React, { Component } from 'react'
import ChildrenInscription from './forms/children-inscription'
import Fetch from '../utilities/fetch-datas'
import '../styles/_register.scss'
import { Button, TextField } from '@material-ui/core'
import SaveIcon from '@material-ui/icons/SaveOutlined'
import { Autocomplete } from '@material-ui/lab'
import { withCookies } from 'react-cookie'
const variables = require('../utilities/variables').variables

const closeId = require('../utilities/variables').variables.id.loginRegister.showLogin
const isParent = ({ roleTitle, isValid }) => ((roleTitle === 'parent' || roleTitle === 'collab_parent') && isValid === true)

const types = {
    date: 'dateField',
    checkBox: 'checkboxField'
}

const initialiseState = {
    childrenInscription: {
        fields: {
            sex: 'female',
            last_name: 'Trudeau',
            first_name: 'Aurélie',
            birthday: null,
            garde: null,
            gardeParentOption: null,
            gardeOtherOption: null,

            school: 'Bruschési',
            schoolLevel: 'Secondaire3',
            adlRegister: true,
            lastRedoubleLevel: 'Primaire5',
            registerReason: "Raison de l'inscrpition",
            evaluation: true,
            daycareServiceYesName: null,
            daycareServiceYesPhone: null,

            expiration: null,
            allergies: 'Cannelle',
            drug: null,
            othersInfos: 'Other Informations',

            autorisationPapper: true,
            autorisationInternet: false
        },
        errors: {
            sex: false,
            last_name: false,
            first_name: false,
            birthday: false,
            garde: false,

            school: false,
            schoolLevel: false,
            registerReason: false
        }
    },
    roles: [],
    idParent: null,
    disabledInput: false
}

class RegisterContainer extends Component {
    constructor () {
        super()
        this.state = initialiseState
        this.onChildrenInputChange = this.onChildrenInputChange.bind(this)
        this.handleRessetStepAndRedirect = this.handleRessetStepAndRedirect.bind(this)
        this.setRolesAndDays = this.setRolesAndDays.bind(this)
        this.savedUser = this.savedUser.bind(this)
        this.saveChildren = this.saveChildren.bind(this)
        this.handleGetIdParent = this.handleGetIdParent.bind(this)
        this.handleBtnClick = this.handleBtnClick.bind(this)
    }

    componentDidMount () {
        Fetch.getRolesAndDays(this.setRolesAndDays)
        const currentUser = this.getCurrentUser()
        if (currentUser.role !== 'super_admin' && currentUser.role !== 'admin') {
            this.setState({
                disabledInput: true,
                idParent: currentUser._id
            })
        }
    }

    getLangFile () { return require('../lang/' + this.props.lang + '/register.json') }

    stepChildrenHasErrors () {
        const fields = this.state.childrenInscription.fields
        const newErrors = {
            sex: fields.sex === null,
            last_name: fields.last_name === null,
            first_name: fields.first_name === null,
            birthday: fields.birthday === null,
            garde: (fields.garde === null ||
                    ((fields.garde === 'gardeMother' || fields.garde === 'gardeFather') && fields.gardeParentOption === null)),

            school: fields.school === null,
            schoolLevel: fields.schoolLevel === null,
            registerReason: fields.registerReason === null
        }
        this.setState(state => {
            const oldInformations = state.childrenInscription
            oldInformations.errors = newErrors
            return {
                childrenInscription: oldInformations
            }
        })
        const value = Object.values(newErrors).filter(val => val === true)
        return value.length !== 0
    }

    // #region Functions Events

    onChildrenInputChange (event, name, type) {
        let newValue = null
        if (type === types.date) {
            newValue = event._d
        } else if (type === types.checkBox) {
            newValue = event.target.checked
        } else {
            newValue = event.target.value === '' ? null : event.target.value
        }

        this.setState(state => {
            const oldInformations = state.childrenInscription
            oldInformations.fields[name] = newValue
            if (newValue !== null && oldInformations.errors[name]) oldInformations.errors[name] = false
            return {
                childrenInscription: oldInformations
            }
        })
    }

    handleRessetStepAndRedirect () {
        this.props.onShowLoginForm()
    }

    handleGetIdParent (event, newId) {
        this.setState({ idParent: newId })
    }

    handleBtnClick () {
        if (!this.stepChildrenHasErrors() && this.state.idParent !== null) {
            this.savedUser()
        }
    }

    // #endregion

    // #region Utilities

    setRolesAndDays (roles, days) {
        this.setState({ roles: roles })
    }

    getUserToSave () {
        const childRole = 'children'
        const roles = this.state.roles
        const fields = this.state.childrenInscription.fields

        const templateUser = require('../utilities/variables').variables.templateUser
        const findRole = roles.filter(role => role.title === childRole)
        const user = templateUser

        user.id_parent = [this.state.idParent]
        user.id_role = findRole[0]._id
        user.first_name = fields.first_name
        user.last_name = fields.last_name
        user.sex = fields.sex
        user.birthday = (fields.birthday && fields.birthday !== null) ? (fields.birthday.getFullYear() + '/' + (fields.birthday.getMonth() + 1) + '/' + fields.birthday.getDate()) : null
        user.interest = []
        user.involvement = []
        user.membership = []

        user.school_info = [{
            name: fields.school,
            level: fields.schoolLevel,
            adl: fields.adlRegister, // TRUE / FALSE
            redouble: fields.lastRedoubleLevel,
            evaluate: fields.evaluation,
            reason: fields.registerReason,
            educator_name: fields.daycareServiceYesName,
            educator_phone: fields.daycareServiceYesPhone
        }]
        user.medical_info = [{
            ramq: (fields.expiration && fields.expiration !== null) ? ((fields.expiration.getMonth() + 1) + '/' + fields.expiration.getFullYear()) : null,
            allergies: fields.allergies,
            drugs: fields.drug,
            other_info: fields.othersInfos
        }]
        user.authorization = [{
            paper: fields.autorisationPapper,
            internet: fields.autorisationInternet
        }]
        user.question[0].response = fields.garde
        user.question[1].response = fields.gardeParentOption
        user.question[2].response = fields.gardeOtherOption

        return user
    }

    savedUser () {
        const child = this.getUserToSave()
        Fetch.saveChild(child, this.saveChildren)
    }

    getCurrentUser () {
        const currentUser = this.props.cookies.get(variables.cookies.user)
        return Fetch.decodeData(currentUser)
    }

    saveChildren (success) {
        if (success.success) {
            this.setState({ successRegister: true })
            const currentUser = this.getCurrentUser()
            if (currentUser.role === 'super_admin' || currentUser.role === 'admin') {
                this.props.onGetBack('register')
            } else {
                this.props.onGetBack()
            }
        } else {
            console.log('erreur')
            alert("Une erreur est survenu lors de l'enregistrement ")
        }
    }

    // #endregion

    render () {
        const lang = this.getLangFile()
        const parents = (this.props.actors && this.props.actors !== null) ? this.props.actors.filter(isParent) : []
        return (
            <div className='register-container'>
                {this.props.onShowLoginForm !== null && (
                    <div className='div-back' id={closeId} onClick={this.handleRessetStepAndRedirect}>{lang.back}</div>
                )}
                {!this.state.disabledInput && (
                    <div className='select-parent'>
                        <Autocomplete
                            disabled={this.state.disabledInput}
                            className='select  print-to-remove'
                            onChange={(event, newValue) => this.handleGetIdParent(event, (newValue !== null ? newValue._id : null))}
                            options={parents}
                            getOptionLabel={(parents) => parents.first_name + ' ' + parents.last_name}
                            renderInput={(params) => <TextField {...params} label='CHOISISSEZ LE PARENT' variant='filled' />}
                        />
                        {this.state.idParent === null && (
                            <p>Veuillez choisir le parent</p>
                        )}
                    </div>
                )}
                <div className='form-container'>
                    <div className='forms form-for-parent'>
                        <div>
                            <ChildrenInscription
                                lang={this.props.lang}
                                nbre={1}
                                nbreChild={1}
                                fields={this.state.childrenInscription.fields}
                                errors={this.state.childrenInscription.errors}
                                inputEvent={this.onChildrenInputChange}
                            />
                        </div>
                    </div>
                </div>
                <Button
                    onClick={this.handleBtnClick}
                    variant='contained'
                    color='secondary'
                    size='small'
                    startIcon={<SaveIcon />}
                >
                    Enregister
                </Button>
            </div>
        )
    }
}

export default withCookies(RegisterContainer)
