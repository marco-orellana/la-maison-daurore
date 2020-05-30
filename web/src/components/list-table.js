import React, { Component } from 'react'
import {
    TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Avatar
} from '@material-ui/core'
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab'
import IsValidIcon from '@material-ui/icons/CheckTwoTone'
import IsNotValidIcon from '@material-ui/icons/CloseTwoTone'
import DetailUser from './detail-user'
import Fetch from '../utilities/fetch-datas'
import { withCookies } from 'react-cookie'

import Loading from './loading'
import '../styles/_list-table.scss'

const variables = require('../utilities/variables').variables

class TableListContainer extends Component {
    constructor () {
        super()
        this.state = {
            showDetail: false,
            userSelected: null,
            days: []
        }
        this.handleShowDetail = this.handleShowDetail.bind(this)
        this.handleCloseDetail = this.handleCloseDetail.bind(this)
        this.handleDeleteUser = this.handleDeleteUser.bind(this)
        this.renderShowDetail = this.renderShowDetail.bind(this)
    }

    componentDidMount () {
        Fetch.day.get(days => this.setState({days: [...days]}))
    }

    getLangFile () { return require('../lang/' + this.props.lang + '/list-table.json') }

    renderShowDetail (user) {
        this.setState({
            showDetail: true,
            userSelected: {
                ...this.state.userSelected,
                ...user
            }
        })
    }

    handleShowDetail (event, user) {
        this.renderShowDetail(user)
    }

    handleCloseDetail () { this.setState({ showDetail: false }) }

    getValidationValue (actor) { return actor._id + ',' + Boolean(actor.isValid) + ',' + actor.roleTitle }


    getPhoneNumberByPriority (actor) {
        if (actor.contact.length === 0) {
            return 'Pas de contact'
        } else {
            const contact = actor.contact[0]
            if (contact.personal !== null) return contact.personal
            else if (contact.work !== null) return contact.work
            else if (contact.home !== null) return contact.home
            else if (contact.emergency !== null) return contact.emergency
            else return 'Pas de contact'
        }
    }

    getChildAllergies (child) {
        let allergies = (child.medical_info.length > 0 && child.medical_info[0].allergies !== null) ? child.medical_info[0].allergies : "Pas d'allergies"
        allergies = allergies.length > 20 ? (allergies.substring(0, 17) + '...') : allergies

        return allergies
    }

    buildHeader (lang) {
        const headers = [
            { id: 'avatar', label: lang.head.avatar, minWidth: 50, maxWidth: 50, align: 'center' },
            { id: 'nom', label: lang.head.lastName, minWidth: 170 },
            { id: 'prenom', label: lang.head.firstName, minWidth: 170 }
        ]
        if (this.props.menuSelected !== variables.menus.validation) {
            if (this.props.actorSelected === variables.role.child) {
                headers.push({ id: 'allergies', label: lang.head.allergies, minWidth: 170 })
                headers.push({ id: 'ecole', label: lang.head.school, minWidth: 170 })
                headers.push({ id: 'salle', label: lang.head.classRoom, minWidth: 170 })
            }
        }
        if (this.props.menuSelected === variables.menus.validation || this.props.actorSelected !== variables.role.child) {
            headers.push({ id: 'phone', label: lang.head.phone, minWidth: 170 })
            headers.push({ id: 'courriel', label: lang.head.courriel, minWidth: 170 })
        }
        if (this.props.menuSelected === variables.menus.validation || this.props.actorSelected === variables.role.admin) {
            headers.push({ id: 'validation', label: lang.head.optionValidation, minWidth: 70, align: 'right' })
        }

        return (
            <TableHead>
                <TableRow>
                    {headers.map(header => (
                        <TableCell
                            key={header.id}
                            padding='default'
                            align={header.align}
                            style={{ minWidth: header.minWidth }}
                        >
                            {header.label}
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
        )
    }

    buildRow (lang, actor) {
        const classRoomTitle = this.props.classrooms.filter(cl => cl._id === actor.id_classroom)[0]
        const allergies = this.getChildAllergies(actor)
        const getPhoneNumber = this.getPhoneNumberByPriority(actor)

        return (
            <TableRow hover role='checkbox' className='table-row' tabIndex={-1} key={actor._id}>
                <TableCell onClick={(even) => this.handleShowDetail(even, actor)}> <Avatar alt='Avatar' src={actor.img} /> </TableCell>
                <TableCell onClick={(even) => this.handleShowDetail(even, actor)}> {actor.last_name.toUpperCase()} </TableCell>
                <TableCell onClick={(even) => this.handleShowDetail(even, actor)}> {actor.first_name} </TableCell>
                {(this.props.menuSelected !== variables.menus.validation && this.props.actorSelected === variables.role.child) && (
                    <>
                        <TableCell onClick={(even) => this.handleShowDetail(even, actor)}> {allergies} </TableCell>
                        <TableCell onClick={(even) => this.handleShowDetail(even, actor)}> {actor.school_info[0].name === null ? 'Pas defini' : actor.school_info[0].name} </TableCell>
                        <TableCell onClick={(even) => this.handleShowDetail(even, actor)}> {classRoomTitle ? classRoomTitle.title : 'Non defini'} </TableCell>
                    </>
                )}
                {(this.props.menuSelected === variables.menus.validation || this.props.actorSelected !== variables.role.child) && (
                    <>
                        <TableCell onClick={(even) => this.handleShowDetail(even, actor)}> {getPhoneNumber} </TableCell>
                        <TableCell onClick={(even) => this.handleShowDetail(even, actor)}> {actor.email} </TableCell>
                    </>
                )}
                {(this.props.menuSelected === variables.menus.validation || this.props.actorSelected === variables.role.admin) && (
                    <TableCell align='right' className='td-validation'>
                        <ToggleButtonGroup
                            size='small'
                            value={this.getValidationValue(actor)}
                            exclusive
                            onChange={this.props.handleValidationChange}
                            aria-label='text alignment'
                        >
                            <ToggleButton className='isValid' value={actor._id + ',' + true + ',' + actor.roleTitle} aria-label='left'>
                                <IsValidIcon color='primary' />
                            </ToggleButton>
                            <ToggleButton className='isNotValid' value={actor._id + ',' + false + ',' + actor.roleTitle} aria-label='right'>
                                <IsNotValidIcon color='error' />
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </TableCell>
                )}
            </TableRow>
        )
    }

    buildBody (lang, allActors) {
        return (<TableBody>{allActors.map(actor => this.buildRow(lang, actor))}</TableBody>)
    }

    handleDeleteUser () {
        Fetch.user.delete(this.props.cookies.get(variables.cookies.token), this.state.userSelected)
        this.setState({
            showDetail: false,
            userSelected: null
        })
        this.props.onUsersListChange()
    }

    render () {
        const lang = this.getLangFile()
        const allActors = this.props.allActors
        return (allActors !== null
            ? (
                <TableContainer className='table-list'>
                    <Table stickyHeader aria-label='sticky table'>
                        {this.buildHeader(lang)}
                        {this.buildBody(lang, allActors)}
                    </Table>
                    {this.state.userSelected !== null && (
                        <DetailUser
                            open={this.state.showDetail}
                            onClose={this.handleCloseDetail}
                            lang={this.props.lang}
                            userSelected={this.state.userSelected}
                            menuSelected={this.props.menuSelected}
                            onChangeImage={this.props.onChangeImage}
                            classRooms={this.props.classrooms}
                            collabList={this.props.collabList}
                            parentList={this.props.parentList}
                            onDeleteUser={this.handleDeleteUser}
                            renderShowDetail={this.renderShowDetail}
                            days={this.state.days}
                            onUsersListChange={this.props.onUsersListChange}
                        />
                    )}
                </TableContainer>)
            : (
                <div className='table-loading'>
                    <Loading lang={this.props.lang} />
                </div>
            )
        )
    }
}

export default withCookies(TableListContainer)
