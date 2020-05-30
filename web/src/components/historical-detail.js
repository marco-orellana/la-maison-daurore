import React, { Component } from 'react'
import { DialogTitle, DialogContent, Dialog, TableContainer, Table, TableBody, TableRow, TableCell, TableHead, Avatar } from '@material-ui/core'
import { withCookies } from 'react-cookie'

class HistoricalDetail extends Component {
    getLangFile () {
        return require('../lang/' + this.props.lang + '/historical-detail.json')
    }

    componentDidMount () {
        console.log(this.props.matched)
    }

    renderRow (schedule, lang) {
        return (
            <TableRow hover role='checkbox' className='table-row' tabIndex={-1} key={schedule._id}>
                <TableCell><Avatar alt='Avatar' src={schedule.img} /></TableCell>
                <TableCell> {schedule.date.substring(0, 10)} </TableCell>
                <TableCell> {schedule.last_name} </TableCell>
                <TableCell> {schedule.first_name} </TableCell>
                <TableCell> {schedule.contact[0].personal} </TableCell>
                <TableCell> {schedule.is_absent ? lang.presence : lang.absence} </TableCell>
            </TableRow>
        )
    }

    render () {
        const lang = this.getLangFile()
        const schedules = this.props.matched
        return (
            <Dialog
                className='dialog'
                open={this.props.open}
                onClose={this.props.onClose}
                scroll='paper'
                aria-labelledby='scroll-dialog-title'
                aria-describedby='scroll-dialog-description'
                maxWidth='md'
                fullWidth
            >
                <DialogTitle id='scroll-dialog-title' className='title'>{this.props.classRoom.title}</DialogTitle>
                <DialogContent id='details-print' className='div-dialog'>

                    <TableContainer className='table-list'>
                        <Table stickyHeader aria-label='sticky table'>
                            <TableHead>
                                <TableRow>
                                    <TableCell />
                                    <TableCell>
                                        {lang.date}
                                    </TableCell>
                                    <TableCell>
                                        {lang.lastname}
                                    </TableCell>
                                    <TableCell>
                                        {lang.firstname}
                                    </TableCell>
                                    <TableCell>
                                        {lang.phone}
                                    </TableCell>
                                    <TableCell>
                                        {lang.presence}
                                    </TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {schedules.map(schedule => this.renderRow(schedule, lang))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContent>
            </Dialog>
        )
    }
}

export default withCookies(HistoricalDetail)
