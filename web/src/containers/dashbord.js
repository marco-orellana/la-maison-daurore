import React, { Component } from 'react'
import Loading from '../components/loading'
import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core'

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import MenuOutlinedIcon from '@material-ui/icons/MenuOutlined'

import SideMenu from '../components/side-menu'
import Historical from './historical'
import CreateAccount from './create-account'
import Schedule from './schedule'
import Classroom from './classroom'
import Profile from './profile'
import Print from './print'
import Snack from '../components/snack'
import Lists from './list'
import ChildList from './child-list'
import RegisterChild from '../components/register-child'
import ChildSchedule from './child-schedule'
import CollabSchedule from './collab-schedule'
import Fetch from '../utilities/fetch-datas'
import { withCookies } from 'react-cookie'
import '../styles/_dashbord.scss'
const variables = require('../utilities/variables').variables

const isValidActor = ({ roleTitle, isValid }) => (roleTitle !== 'children' && isValid === true)
const isInValidActor = ({ roleTitle, isValid }) => (roleTitle !== 'children' && isValid === false)
const isChildren = ({ roleTitle }) => roleTitle === 'children'

const upadteMenuSelectedByRole = (role) => {
    let select = null
    switch (role) {
    case variables.role.highAdmin:
        select = variables.menus.allUsers
        break
    case variables.role.admin:
        select = variables.menus.allUsers
        break
    case variables.role.both:
        select = variables.menus.childList
        break
    case variables.role.parent:
        select = variables.menus.childList
        break
    case variables.role.collab:
        select = variables.menus.schedule
        break
    }
    return select
}

class Dashbord extends Component {
    constructor () {
        super()
        this.state = {
            date: new Date(),
            actors: [],
            childrens: [],
            validActors: [],
            inValidActors: [],
            childList: [],
            menuItemSelected: '',
            showLogOutModal: false,
            requiredSaveValidationChange: false,
            showSnack: false,
            left: false,
            image: '',
            showLoading: true
        }
        this.currentUser = null
        this.setChildList = this.setChildList.bind(this)
        this.onhandleDateChange = this.onhandleDateChange.bind(this)
        this.onClickMenu = this.onClickMenu.bind(this)
        this.handleCloseLogOut = this.handleCloseLogOut.bind(this)
        this.handleConfirmLogOut = this.handleConfirmLogOut.bind(this)
        this.handleCloseSnack = this.handleCloseSnack.bind(this)
        this.onValidationChange = this.onValidationChange.bind(this)
        this.onBtnValidSave = this.onBtnValidSave.bind(this)
        this.toggleDrawer = this.toggleDrawer.bind(this)
        this.setActorLists = this.setActorLists.bind(this)
        this.onUsersListChange = this.onUsersListChange.bind(this)
        this.onUserChange = this.onUserChange.bind(this)
        this.fetchChild = this.fetchChild.bind(this)
    }

    setChildList (datas) {
        this.setState({ showLoading: true })

        const idParent = this.getCurrentUser()._id
        const newChildList = []
        datas.map(x => { x.id_parent.map(y => { y === idParent && newChildList.push(x) }) })
        this.setState({ childList: newChildList.sort((a, b) => (a.last_name.toUpperCase() > b.last_name.toUpperCase() ? 1 : -1)) })

        setTimeout(() => {
            this.setState({ showLoading: false })
        }, 500)
    }

    fetchChild () {
        Fetch.user.children(this.props.cookies.get(variables.cookies.token), this.setChildList)
    }

    setActorLists (list) {
        this.setState({ showLoading: true })
        const sortIds = (list.map(us => us._id))
        const sortUser = (sortIds.map(id => (list.filter(user => user._id === id))[0]))
        this.setState({
            actors: [...sortUser].sort((a, b) => (a.last_name.toUpperCase() > b.last_name.toUpperCase() ? 1 : -1)),
            validActors: [...sortUser.filter(isValidActor)],
            inValidActors: [...sortUser.filter(isInValidActor)],
            childrens: [...sortUser.filter(isChildren)]
        })
        setTimeout(() => {
            this.setState({ showLoading: false })
        }, 500)
    }

    getLangFile () { return require('../lang/' + this.props.lang + '/dashbord.json') }

    getCurrentUser () {
        const currentUser = this.props.cookies.get(variables.cookies.user)
        return Fetch.decodeData(currentUser)
    }

    componentDidMount () {
        this.setState({
            menuItemSelected: upadteMenuSelectedByRole(this.getCurrentUser().role)
        })
        const currentUser = this.getCurrentUser()
        if(currentUser.role === 'super_admin' || currentUser.role === 'admin') {
            Fetch.getAllUsers(this.props.cookies.get(variables.cookies.token), this.setActorLists)
        } else {
            this.fetchChild()
        }
    }

    onhandleDateChange (newDate) { this.setState({ date: newDate }) }

    onClickMenu (event, index) {
        if (!this.state.requiredSaveValidationChange) {
            index === variables.menus.logOut
                ? this.setState({ showLogOutModal: true })
                : this.setState({ menuItemSelected: index })
        } else {
            this.setState({ showSnack: true })
        }
    }

    handleCloseLogOut () { this.setState({ showLogOutModal: false }) }

    handleConfirmLogOut () {
        this.setState({ showLogOutModal: false })
        this.props.handleLogOutEvent()
    }

    onValidationChange (event, newValue) {
        if (newValue !== null) {
            const values = newValue.split(',')
            if (values[2] === 'admin' && this.state.menuItemSelected === variables.menus.allUsers) {
                const usersToUpdate = this.state.actors.filter(user => user._id === values[0])
                usersToUpdate[0].isValid = values[1]
                Fetch.updateUserValidities(this.props.cookies.get(variables.cookies.token), usersToUpdate, this.setActorLists)
            } else {
                const index = this.state.inValidActors.map(e => e._id).indexOf(values[0])
                if (index !== -1) {
                    this.setState(state => {
                        const inValidActors = state.inValidActors
                        inValidActors[index].isValid = !(inValidActors[index].isValid)
                        const list = inValidActors.filter(e => e.isValid === true)
                        return {
                            inValidActors,
                            requiredSaveValidationChange: list.length !== 0
                        }
                    })
                }
            }
        }
    }

    onBtnValidSave () {
        const usersToUpdate = this.state.inValidActors.filter(user => user.isValid === true)
        Fetch.updateUserValidities(this.props.cookies.get(variables.cookies.token), usersToUpdate, this.setActorLists)
        this.setState({ requiredSaveValidationChange: false })
    }

    onUsersListChange () {
        const currentUser = this.getCurrentUser()
        if(currentUser.role === 'super_admin' || currentUser.role === 'admin') {
            Fetch.getAllUsers(this.props.cookies.get(variables.cookies.token), this.setActorLists)
        } else {
            this.fetchChild()
            this.setState({
                menuItemSelected: upadteMenuSelectedByRole(this.getCurrentUser().role)
            })
        }
    }

    onUserChange(user, img){
        this.setState(state => {
            const actorsN = state.actors
            const index = actorsN.findIndex(x => (x._id === user._id))
            if(index !== -1) {
                img !== null
                ? actorsN[index].img = img
                : actorsN[index] = {...user}
            }

            return { actors: actorsN }
        })
        this.onUsersListChange()
    }

    switchToMenuSelected (lang) {
        switch (this.state.menuItemSelected) {
        case variables.menus.allUsers:
            return (
                <Lists
                    lang={lang}
                    actors={this.state.actors}
                    inValidActors={this.state.inValidActors}
                    menuSelected={this.state.menuItemSelected}
                    validationChange={this.onValidationChange}
                    handleBtnValidSave={this.onBtnValidSave}
                    handleImageChange={this.onUserChange}
                    onUsersListChange={this.onUsersListChange}
                />)

        case variables.menus.validation:
            return (
                <Lists
                    lang={lang}
                    actors={this.state.actors}
                    inValidActors={this.state.inValidActors}
                    menuSelected={this.state.menuItemSelected}
                    validationChange={this.onValidationChange}
                    handleBtnValidSave={this.onBtnValidSave}
                    handleImageChange={this.onUserChange}
                />)

        case variables.menus.createAccount:
            return (<CreateAccount lang={lang} actors={this.state.actors} updateUsers={this.onUsersListChange} />)

        case variables.menus.classroomManagement:
            return (<Classroom lang={lang} />)

        case variables.menus.scheduleManagement:
            return (<Schedule lang={lang} />)

        case variables.menus.historical:
            return (<Historical lang={lang} actors={this.state.actors} />)

        case variables.menus.childList:
            return (<ChildList lang={lang} childList={this.state.childList} fetchChild={this.fetchChild} />)

        case variables.menus.childSchedule:
            return (<ChildSchedule lang={lang} childList={this.state.childList} fetchChild={this.fetchChild} />)

        case variables.menus.collabSchedule:
            return (<CollabSchedule lang={lang} />)

        case variables.menus.registerChild:
            return (<RegisterChild lang={this.props.lang} actors={this.state.actors} onShowLoginForm={null} onGetBack={this.onUsersListChange} />)

        case variables.menus.profile:
            return (<Profile lang={lang} />)

        case variables.menus.prints:
            return (<Print lang={lang} allActors={this.state.actors} />)

        default:
            return (<div className='table' />)
        }
    }

    handleCloseSnack () { this.setState({ showSnack: false }) }

    toggleDrawer (event, open) {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return
        }

        this.setState({ left: open })
    }

    imageGetted (data) {
        this.setState({ image: data.data })
    }

    render () {
        const lang = this.getLangFile()
        return (
            <div className='dashbord'>
                <Snack show={this.state.showSnack} duration={5000} message={lang.messageRequiredSaveChangeSnack} onClose={this.handleCloseSnack} severity='warning' />
                <div className='menu-mobile remove'>
                    <Button
                        variant='outlined'
                        size='medium'
                        color='primary'
                        onClick={event => this.toggleDrawer(event, true)}
                        startIcon={<MenuOutlinedIcon />}
                    >
                        {lang.menuTitle}
                    </Button>

                    <SwipeableDrawer
                        anchor='right'
                        open={this.state.left}
                        onClose={event => this.toggleDrawer(event, false)}
                        onOpen={event => this.toggleDrawer(event, true)}
                    >
                        <div
                            role='presentation'
                            onClick={event => this.toggleDrawer(event, false)}
                            onKeyDown={event => this.toggleDrawer(event, false)}
                        >
                            <SideMenu
                                lang={this.props.lang}
                                menuItemSelected={this.state.menuItemSelected}
                                handleClickMenu={this.onClickMenu}
                                validationLength={this.state.inValidActors && this.state.inValidActors.length}
                            />
                        </div>
                    </SwipeableDrawer>

                </div>
                <SideMenu
                    className='menu-desktop remove'
                    lang={this.props.lang}
                    menuItemSelected={this.state.menuItemSelected}
                    handleClickMenu={this.onClickMenu}
                    validationLength={this.state.inValidActors && this.state.inValidActors.length}
                />

                <div className='content'>
                    {this.switchToMenuSelected(this.props.lang)}
                </div>

                <Dialog open={this.state.showLogOutModal} onClose={this.handleCloseLogOut} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
                    <DialogTitle id='alert-dialog-title'>{lang.modal.title}</DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleCloseLogOut} color='primary'> {lang.modal.cancel} </Button>
                        <Button onClick={this.handleConfirmLogOut} color='primary' autoFocus> {lang.modal.confirm} </Button>
                    </DialogActions>
                </Dialog>

                {this.state.showLoading && <Loading className='loading' lang={this.props.lang} />}
            </div>
        )
    }
}
export default withCookies(Dashbord)
