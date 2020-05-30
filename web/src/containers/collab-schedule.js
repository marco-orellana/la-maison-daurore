import moment from 'moment'
import React, { Component } from 'react'
import MomentUtils from '@date-io/moment'
import { withCookies } from 'react-cookie'
import Fetch from '../utilities/fetch-datas'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Switch, FormControlLabel } from '@material-ui/core'
import '../styles/_child-schedule.scss'

const variables = require('../utilities/variables').variables

class ChildSchedule extends Component {
    constructor () {
        super()
        this.state = {
            schedules: [],
            users: [],
            classrooms: [],
            checkedB: false,
            dateSelected: new Date()
        }
        this.fetchSchedules = this.fetchSchedules.bind(this)
        this.setSchedules = this.setSchedules.bind(this)
        this.handleSwitchDate = this.handleSwitchDate.bind(this)
    }

    getLangFile () { return require('../lang/' + this.props.lang + '/schedule.json') }

    fetchSchedules () {
        Fetch.schedule.child(this.props.cookies.get(variables.cookies.token), data => this.setState({ users: [...data] }))
        // Fetch.classroom.getAll(this.props.cookies.get(variables.cookies.token), data => this.setState({ classrooms: [...data] }))
        Fetch.schedule.forChild(this.props.cookies.get(variables.cookies.token), this.getCurrentUser()._id, this.setSchedules)
    }

    componentDidMount () {
        this.fetchSchedules()
    }

    setSchedules (dataSchedules) {
        dataSchedules.map(x => {
            const date = new Date(x.date)
            const newDate = new Date(date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate())
            newDate.setDate(newDate.getDate() + 1)
            x.date = newDate
        })

        this.setState({
            schedules: dataSchedules.sort((a, b) => (a.date > b.date ? 1 : -1))
        })
    }

    getCurrentUser () {
        const currentUser = this.props.cookies.get(variables.cookies.user)
        return Fetch.decodeData(currentUser)
    }

    buildHeader (lang) {
        const headers = [
            { id: 'child', label: lang.head.child },
            { id: 'date', label: lang.head.date, align: 'right' },
            { id: 'is_absent', label: lang.head.isAbsent, align: 'center' }
        ]
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

    buildRow (lang, schedule) {
        const dateFormat = new Date(schedule.date)
        const user = this.state.users.filter(x => x._id === schedule.id_user)[0]
        return (
            user && (
                <TableRow hover role='checkbox' className='table-row' tabIndex={-1} key={schedule._id}>
                    <TableCell> {user.last_name + ' ' + user.first_name} </TableCell>
                    <TableCell align='right'> {dateFormat.toLocaleDateString()} </TableCell>
                    <TableCell align='center'> {schedule.is_absent ? lang.yes : lang.no} </TableCell>
                </TableRow>
            )
        )
    }

    handleSearchChange (newValue, name) {
        this.setState({ [name]: newValue })
    }

    updateSchedulesList () {
        const newList = [...this.state.schedules]
        const lastList = []
        if (newList !== null) {
            const date = this.state.dateSelected
            const newDate = new Date(date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate())
            newDate.setDate(newDate.getDate() + 1)
            newList.map(row => {
                let ch1 = 0
                if (this.state.checkedB) {
                    ch1 = new Date(row.date).toLocaleDateString().search(this.state.dateSelected.toLocaleDateString())
                }
                ch1 !== -1 && lastList.push(row)
            })
        }
        return lastList
    }

    handleSwitchDate () {
        this.setState({
            checkedB: !this.state.checkedB
        })
    }

    render () {
        const schedules = this.updateSchedulesList()
        const lang = this.getLangFile()
        return (
            <div className='schedule'>
                <div className='search-container'>
                    <FormControlLabel
                        value='start'
                        control={
                            <Switch
                                checked={this.state.checkedB}
                                onChange={this.handleSwitchDate}
                                color='primary'
                                name='checkedB'
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                        }
                        label={lang.searchByDate}
                        labelPlacement='start'
                    />

                    <MuiPickersUtilsProvider
                        libInstance={moment} utils={MomentUtils}
                        locale={this.props.lang}
                    >
                        <KeyboardDatePicker
                            margin='dense'
                            disabled={!this.state.checkedB}
                            label={lang.searchDate}
                            format='DD MMMM YYYY'
                            value={this.state.dateSelected}
                            onChange={event => this.handleSearchChange(event._d, 'dateSelected')}
                            KeyboardButtonProps={{
                                'aria-label': 'change date'
                            }}
                        />
                    </MuiPickersUtilsProvider>
                </div>
                <TableContainer className='list-container table-list'>
                    <Table stickyHeader aria-label='sticky table'>
                        {this.buildHeader(lang)}
                        {(schedules.length > 0 && this.state.users.length > 0) && (
                            <TableBody>{schedules.map(schedule => this.buildRow(lang, schedule))}</TableBody>
                        )}
                    </Table>
                </TableContainer>
            </div>
        )
    }
}

export default withCookies(ChildSchedule)
