import moment from 'moment'
import React, { Component } from 'react'
import MomentUtils from '@date-io/moment'
import { withCookies } from 'react-cookie'
import Fetch from '../utilities/fetch-datas'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import GenerationIcon from '@material-ui/icons/Cached'
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, FormControl, InputLabel, Select, MenuItem, Button, Switch, FormControlLabel } from '@material-ui/core'
import '../styles/_schedule.scss'

const variables = require('../utilities/variables').variables

class Schedule extends Component {
    constructor () {
        super()
        this.state = {
            schedules: [],
            users: [],
            classrooms: [],
            classroomSelected: '',
            collaboraters: [],
            checkedB: false,
            dateSelected: new Date(),
            generation: {
                startDate: '',
                endDate: ''
            }
        }
        this.fetchSchedules = this.fetchSchedules.bind(this)
        this.setSchedules = this.setSchedules.bind(this)
        this.handleDateClick = this.handleDateClick.bind(this)
        this.handleGenerateClick = this.handleGenerateClick.bind(this)
        this.handleSwitchDate = this.handleSwitchDate.bind(this)
    }

    getLangFile () { return require('../lang/' + this.props.lang + '/schedule.json') }

    fetchSchedules () {
        const date = new Date()
        this.setState({
            generation: {
                startDate: date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate(),
                endDate: date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()
            }
        })
        Fetch.schedule.get(this.props.cookies.get(variables.cookies.token), this.setSchedules)
        Fetch.schedule.child(this.props.cookies.get(variables.cookies.token), data => this.setState({ users: [...data] }))
        Fetch.classroom.getAll(this.props.cookies.get(variables.cookies.token), data => this.setState({ classrooms: [...data] }))
        Fetch.user.getCollaborater(this.props.cookies.get(variables.cookies.token), data => this.setState({ collaboraters: [...data] }))
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

    handleDateClick (date, name) {
        const newDate = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()
        this.setState(state => {
            const generation = state.generation
            generation[name] = newDate
            return {
                generation: generation
            }
        })
    }

    handleGenerateClick () {
        const generate = this.state.generation
        if (generate.startDate !== generate.endDate) {
            Fetch.schedule.add(this.props.cookies.get(variables.cookies.token), generate, this.fetchSchedules)
        }
    }

    buildHeader (lang) {
        const headers = [
            { id: 'child', label: lang.head.child },
            { id: 'collab', label: lang.head.collab },
            { id: 'id_classroom', label: lang.head.classroom },
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
        let collab = null
        if (user) collab = this.state.collaboraters.filter(x => x._id === user.id_collaborater)[0]
        const classroom = this.state.classrooms.filter(x => x._id === schedule.id_classroom)[0]
        return (
            user && (
                <TableRow hover role='checkbox' className='table-row' tabIndex={-1} key={schedule._id}>
                    <TableCell> {user.last_name + ' ' + user.first_name} </TableCell>
                    <TableCell> {collab.last_name + ' ' + collab.first_name} </TableCell>
                    <TableCell> {classroom && classroom.title} </TableCell>
                    <TableCell align='right'> {dateFormat.toLocaleDateString()} </TableCell>
                    <TableCell align='center'> {schedule.is_absent ? lang.yes : lang.no} </TableCell>
                </TableRow>
            )
        )
    }

    handleSearchChange (newValue, name) {
        if (name === 'classroomSelected') {
            if (newValue !== undefined) {
                this.setState({ classroomSelected: newValue })
            }
        } else {
            this.setState({ [name]: newValue })
        }
    }

    updateSchedulesList () {
        let getIdClassRoom = this.state.classrooms.filter(classRoom => classRoom.title === this.state.classroomSelected)
        getIdClassRoom = getIdClassRoom[0] ? getIdClassRoom[0] : this.state.classrooms[0]
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
                const ch2 = this.state.classroomSelected !== '' ? row.id_classroom && row.id_classroom.search(getIdClassRoom._id) : 0
                ch1 !== -1 && ch2 !== -1 && lastList.push(row)
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
        const startDate = this.state.generation.startDate === '' ? new Date() : new Date(this.state.generation.startDate)
        const endDate = this.state.generation.endDate === '' ? startDate : new Date(this.state.generation.endDate)
        return (
            <div className='schedule'>
                <div className='generate-container'>
                    <p>{lang.generationTitle}</p>
                    <div>
                        <MuiPickersUtilsProvider
                            libInstance={moment} utils={MomentUtils}
                            locale={this.props.lang}
                        >
                            <KeyboardDatePicker
                                minDate={new Date()}
                                margin='dense'
                                label={lang.from}
                                format='DD MMMM YYYY'
                                value={startDate}
                                onChange={event => this.handleDateClick(event._d, 'startDate')}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date'
                                }}
                            />
                            <KeyboardDatePicker
                                minDate={startDate}
                                margin='dense'
                                label={lang.to}
                                format='DD MMMM YYYY'
                                value={endDate}
                                onChange={event => this.handleDateClick(event._d, 'endDate')}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date'
                                }}
                            />
                        </MuiPickersUtilsProvider>
                        <Button
                            onClick={this.handleGenerateClick}
                            variant='contained'
                            color='default'
                            startIcon={<GenerationIcon />}
                        >
                            {lang.btnGenerate}
                        </Button>

                    </div>
                </div>
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
                    <FormControl variant='filled'>
                        <InputLabel color='primary'>{lang.searchClassroom}</InputLabel>
                        <Select
                            value={this.state.classroomSelected}
                            onChange={event => this.handleSearchChange(event.target.value, 'classroomSelected')}
                        >
                            <MenuItem value=''>
                                <em>{lang.allClassroom}</em>
                            </MenuItem>
                            {this.state.classrooms.map(classRoom => (
                                <MenuItem key={classRoom._id} value={classRoom.title}>{classRoom.title}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <TableContainer className='list-container table-list'>
                    <Table stickyHeader aria-label='sticky table'>
                        {this.buildHeader(lang)}
                        {(schedules.length > 0 && this.state.users.length > 0 && this.state.classrooms.length > 0 && this.state.collaboraters.length > 0) && (
                            <TableBody>{schedules.map(schedule => this.buildRow(lang, schedule))}</TableBody>
                        )}
                    </Table>
                </TableContainer>
            </div>
        )
    }
}

export default withCookies(Schedule)
