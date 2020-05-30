import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import {
    TableContainer, Table, Button, TableHead, TableRow, TableCell, TableBody
} from '@material-ui/core'
import HistoricalDetail from '../components/historical-detail'
import Fetch from '../utilities/fetch-datas'
import '../styles/_historical.scss'
import '../styles/_detail-user.scss'
import { withCookies } from 'react-cookie'
const variables = require('../utilities/variables').variables

class Historical extends Component {
    constructor () {
        super()
        this.state = {
            schedules: [],
            classrooms: [],
            startDate: null,
            endDate: null,
            onSearch: false,
            showDetail: false,
            matchedSchedules: [],
            matchedSchedulesOfClassRoom: [],
            classroomSelected: null
        }
        this.setSchedules = this.setSchedules.bind(this)
        this.setClassroom = this.setClassroom.bind(this)
        this.handleStartDateChange = this.handleStartDateChange.bind(this)
        this.handleEndDateChange = this.handleEndDateChange.bind(this)
        this.renderClassRooms = this.renderClassRooms.bind(this)
        this.handleShowDetail = this.handleShowDetail.bind(this)
        this.handleCloseDetail = this.handleCloseDetail.bind(this)
        this.handleStartDateChange = this.handleStartDateChange.bind(this)
    }

    componentDidMount () {
        // console.log(this.state.schedules)
        Fetch.getAllSchedules(this.props.cookies.get(variables.cookies.token), this.setSchedules)
        Fetch.classroom.getAll(this.props.cookies.get(variables.cookies.token), this.setClassroom)
    }

    setClassroom (classrooms) {
        this.setState({ classrooms: classrooms })
    }

    setSchedules (schedulesList) {
        this.setState({
            schedules: schedulesList
        })
    }

    getLangFile () {
        return require('../lang/' + this.props.lang + '/historical.json')
    }

    handleStartDateChange (event) {
        this.setState({ startDate: event.target.value })
    }

    handleEndDateChange (event) {
        this.setState({ endDate: event.target.value })
    }

    handleSearch (startDate, endDate) {
        if (this.state.startDate !== null & this.state.endDate !== null) {
            this.setState({
                matchedSchedules: this.filterScheduleByDate(startDate, endDate),
                onSearch: true
            })
        }
    }

    filterScheduleByDate (startDate, endDate) {
        const schedules = this.state.schedules
        const formattedStartDate = new Date(startDate + ' 00:00:00')
        const formattedEndDate = new Date(endDate + ' 23:59:59')
        // find the schedules between start and end date
        const matchedSchedules = schedules.filter(schedule => new Date(schedule.date) >= formattedStartDate && new Date(schedule.date) <= formattedEndDate)
        return matchedSchedules
    }

    filterActors (classRoom) {
        const actors = this.props.actors
        const matchedSchedules = this.state.matchedSchedules
        const matchedScheduleOfClassroom = []
        matchedSchedules.map(schedule => {
            if (schedule.id_classroom === classRoom._id) {
                actors.map(actor => {
                    if (actor._id === schedule.id_user && schedule.id_classroom === classRoom._id) {
                        schedule.first_name = actor.first_name
                        schedule.last_name = actor.last_name
                        schedule.photo = actor.photo
                        schedule.contact = actor.contact
                        schedule.img = actor.img
                    }
                })
                matchedScheduleOfClassroom.push(schedule)
            }
        })
        return matchedScheduleOfClassroom
    }

    findFirstName (schedule, actors) {
        actors.map(actor => {
            if (actor._id === schedule.id_user) {
                return actor.first_name
            } else return null
        })
    }

    renderClassRooms () {
        const classRooms = this.state.classrooms
        if (classRooms.length > 0) {
            return (<TableBody>{classRooms.map(classRoom => this.renderRow(classRoom))}</TableBody>)
        }
    }

    renderRow (classRoom) {
        return (
            <TableRow hover role='checkbox' className='table-row' tabIndex={-1} key={classRoom._id} onClick={() => this.handleShowDetail(classRoom)}>
                <TableCell> {classRoom.title} </TableCell>
                <TableCell> {classRoom.phone} </TableCell>
                <TableCell> {classRoom.seat} </TableCell>
            </TableRow>
        )
    }

    handleShowDetail (classRoom) {
        // put showdetail in the callback to make sure classroomSelected state is set before showing detail page
        this.setState({
            classroomSelected: classRoom,
            matchedSchedulesOfClassRoom: this.filterActors(classRoom),
            showDetail: true
        })
    }

    handleCloseDetail () {
        this.setState({
            showDetail: false,
            classroomSelected: null
        })
    }

    render () {
        const lang = this.getLangFile()

        return (
            <form noValidate>
                <TableContainer className='table-list'>
                    <Table stickyHeader aria-label='sticky table'>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <TextField
                                        id='date-start'
                                        onChange={event => this.handleStartDateChange(event)}
                                        label={lang.from}
                                        type='date'
                                        InputLabelProps={{
                                            shrink: true
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        id='date-end'
                                        onChange={event => this.handleEndDateChange(event)}
                                        label={lang.to}
                                        type='date'
                                        InputLabelProps={{
                                            shrink: true
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Button variant='contained' color='primary' onClick={() => this.handleSearch(this.state.startDate, this.state.endDate)}>
                                        {lang.search}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        {this.state.onSearch ? this.renderClassRooms() : null}
                    </Table>
                    {this.state.classroomSelected !== null ? (
                        <HistoricalDetail
                            open={this.state.showDetail}
                            onClose={this.handleCloseDetail}
                            classRoom={this.state.classroomSelected}
                            matched={this.state.matchedSchedulesOfClassRoom}
                            lang={this.props.lang}
                        />
                    ) : null}
                </TableContainer>
            </form>
        )
    }
}

export default withCookies(Historical)
