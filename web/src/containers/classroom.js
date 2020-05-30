import React, { Component } from 'react'
import Snack from '../components/snack'
import Fetch from '../utilities/fetch-datas'
import {
    Button, Dialog,
    DialogTitle,
    DialogContent,
    Typography,
    DialogActions,
    TextField,
    FormControl,
    InputLabel,
    Input,
    List,
    Avatar,
    ListItemText,
    ListItemAvatar,
    ListItem,
    Checkbox,
    FormControlLabel} from '@material-ui/core'
import EditIcon from '@material-ui/icons/EditOutlined'
import DeleteIcon from '@material-ui/icons/Delete'
import PersonIcon from '@material-ui/icons/Person'
import { withCookies } from 'react-cookie'
import '../styles/_classroom.scss'
import PhoneMask from '../components/forms/builds'

const variables = require('../utilities/variables').variables

const action = {
    delete: 0,
    edit: 1,
    add: 2,
    showList: 3
}

const emptyClassroom = {
    title: '',
    seat: '',
    phone: '',
    days: []
}

class ClassRoomManagement extends Component {

    constructor () {
        super()
        this.state = {
            classrooms: [],
            scheduleClassroom: [],
            childrens: [],
            days: [],
            childSelectedList: [],
            classroomSelected: null,
            showDialog: false,
            showListDialog: false,
            editMode: false,
            error: false,
            showSnack: false
        }
        this.setClassRoom = this.setClassRoom.bind(this)
        this.handleEditClick = this.handleEditClick.bind(this)
        this.handleCloseDialog = this.handleCloseDialog.bind(this)
        this.handleActionClick = this.handleActionClick.bind(this)
        this.fecthClassroom = this.fecthClassroom.bind(this)
        this.handleAddClick = this.handleAddClick.bind(this)
        this.handleCloseSnack = this.handleCloseSnack.bind(this)
    }

    componentDidMount () {
        this.fecthClassroom()
    }

    getLangFile () { return require('../lang/' + this.props.lang + '/classroom.json') }


    //#region Event functions

        handleAddClick(){
            this.setState({
                classroomSelected: { ...emptyClassroom },
                showDialog: true,
                editMode: false
            })
        }

        handleEditClick (event, classroom, btnAction) {
            if(!(this.state.classroomSelected !== null && classroom._id === this.state.classroomSelected._id)){
                this.setState({
                    classroomSelected: {
                        ...classroom,
                        days: [...classroom.days]
                    }
                })
            }
            if(btnAction === action.showList) {
                this.setState({
                    childSelectedList: this.state.childrens.filter(child => child.id_classroom === classroom._id),
                    showListDialog: true
                })
            } else {
                this.setState({ showDialog: true, editMode: true })
            }
        }

        handleCloseDialog () {
            this.setState({ showDialog: false, showListDialog: false, error: false })
        }

        handleCloseSnack () {
            this.setState({ showSnack: false })
        }

        handleEditInputChange (event, name, idDay) {
            if(name !== 'days'){
                const newValue = event.target.value
                this.setState(state => {
                    const classroomSelected = state.classroomSelected
                    classroomSelected[name] = newValue
                    return {
                        classroomSelected: classroomSelected
                    }
                })
            } else {
                this.setState(state => {
                    const classroomSelected = state.classroomSelected
                    const index = classroomSelected.days.findIndex(x => x === idDay)
                    if(index === -1){
                        classroomSelected.days.push(idDay)
                    }else{
                        classroomSelected.days.splice(index, 1)
                    }
                    return {
                        classroomSelected: classroomSelected
                    }
                })
            }
        }

        handleActionClick(event, btnAction, classroom) {
            if (btnAction === action.add){
                this.checkEmptyInput()
                    ? this.setState({error: true})
                    : (
                        Fetch.classroom.add(this.props.cookies.get(variables.cookies.token), classroom, this.fecthClassroom),
                        this.setState({error: false, showDialog: false})
                    )
            } else if (btnAction === action.edit){
                const classroomSchedule = {
                    _id: classroom.idSchedule,
                    id_day: classroom.days
                }
                this.checkEmptyInput()
                    ? this.setState({error: true})
                    : (
                        Fetch.classroom.update(this.props.cookies.get(variables.cookies.token), classroom, this.fecthClassroom),
                        Fetch.classroom.updateSchedules(this.props.cookies.get(variables.cookies.token), classroomSchedule, this.fecthClassroom),
                        this.setState({error: false, showDialog: false})
                    )
            } else if (btnAction === action.delete){
                classroom.childLength === 0
                    ? Fetch.classroom.delete(this.props.cookies.get(variables.cookies.token), classroom, this.fecthClassroom)
                    : this.setState({ showSnack: true })
            }
        }

    //#endregion

    //#region Utilities functions

        setClassRoom (dataClassroom, dataChildren) {
            dataClassroom.map(x => {
                const childLength = dataChildren.filter(child => child.id_classroom === x._id).length
                x.childLength = childLength
            })
            this.setState({
                classrooms: dataClassroom.sort((a, b) => (a.title.toUpperCase() > b.title.toUpperCase() ? 1 : -1)),
                childrens: dataChildren.sort((a, b) => (a.last_name.toUpperCase() > b.last_name.toUpperCase() ? 1 : -1))
            })
        }

        fecthClassroom(){
            Fetch.classroom.get(this.props.cookies.get(variables.cookies.token), this.setClassRoom)
            Fetch.classroom.getSchedules(this.props.cookies.get(variables.cookies.token), data => this.setState({scheduleClassroom: [...data]}))
            Fetch.day.get(data => this.setState({days: [...data]}))
        }

        checkEmptyInput(){
            let error = true
            if(this.state.classroomSelected.title !== '' & this.state.classroomSelected.seat !== '' && this.state.classroomSelected.phone !== ''){
                error = false
            }
            return error
        }

    //#endregion

    renderClassroom (lang, classRoom) {
        const childLength = this.state.childrens.filter(child => child.id_classroom === classRoom._id).length
        const schedules = this.state.scheduleClassroom.filter(x => x.id_classroom === classRoom._id)
        classRoom.idSchedule = schedules.length > 0 ? schedules[0]._id : null
        classRoom.days = schedules.length > 0 ? schedules[0].id_day : []

        return (
            <div className='div-salle' key={classRoom._id}>
                <h2 onClick={event => this.handleEditClick(event, classRoom, action.showList)}>{classRoom.title}</h2>
                <p onClick={event => this.handleEditClick(event, classRoom, action.showList)}><span>{lang.childCount}</span><span>: {classRoom.childLength}</span></p>
                <p onClick={event => this.handleEditClick(event, classRoom, action.showList)}><span>{lang.seatCount}</span><span>: {classRoom.seat}</span></p>
                <p onClick={event => this.handleEditClick(event, classRoom, action.showList)}><span>{lang.contact}</span><span>: {classRoom.phone}</span></p>
                <div className='availability'>
                    <p>{lang.availability}</p>
                    <p>
                        {classRoom.days.length > 0 && classRoom.days.map(x => {
                            const getDay = this.state.days.filter(day => day._id === x)
                            if(getDay.length > 0){
                                return (<span key={x}>{lang.days[getDay[0].title]}</span>)
                            }
                        })}
                        {classRoom.days.length === 0 && (
                            <span>{lang.notavailability}</span>
                        )}
                    </p>
                </div>
                <div className='btn'>
                    <Button
                        onClick={event => this.handleEditClick(event, classRoom, null)}
                        variant='contained'
                        color='secondary'
                        startIcon={<EditIcon />}
                    >
                        {lang.btnEdit}
                    </Button>
                    <Button
                    className='btn-delete'
                    onClick={event => this.handleActionClick(event, action.delete, classRoom)}
                        variant='contained'
                        color='secondary'
                        startIcon={<DeleteIcon />}
                    >
                        {lang.btnDelete}
                    </Button>
                </div>
            </div>
        )
    }

    render () {
        const lang = this.getLangFile()
        return (
            <>
            <div className='classroom'>
                <Button variant='contained' className='btn-add-classroom' onClick={this.handleAddClick} color='primary'>
                    {lang.btnAdd}
                </Button>
                <div>
                    {this.state.classrooms.map(classroom => this.renderClassroom(lang, classroom))}
                </div>

                <Dialog
                    className='dialog'
                    onClose={this.handleCloseDialog}
                    aria-labelledby='customized-dialog-title'
                    open={this.state.showDialog}
                >
                    <DialogTitle className='title' id='customized-dialog-title' onClose={this.handleCloseDialog}>
                    {this.state.editMode && (
                        <>{lang.formEditTitle} {this.state.classroomSelected !== null && '('+this.state.classroomSelected.title+')'}</>
                    )}
                    {!this.state.editMode && (
                        <>{lang.formAddTitle} {this.state.classroomSelected !== null && '('+this.state.classroomSelected.title+')'}</>
                    )}
                    </DialogTitle>
                    <DialogContent dividers className='div-dialog-edit-classroom'>
                        {this.state.error && (
                            <p className='error-classroom'>{lang.formError}</p>
                        )}
                        {this.state.classroomSelected !== null && (
                            <>
                                <TextField
                                    className='edit-input'
                                    type='text'
                                    color='primary'
                                    variant='filled'
                                    label={lang.nameClassroomLbl}
                                    autoFocus
                                    onChange={event => this.handleEditInputChange(event, 'title', null)}
                                    value={this.state.classroomSelected.title}
                                />
                                <TextField
                                    type='number'
                                    color='primary'
                                    variant='filled'
                                    label={lang.seatClassroomLbl}
                                    onChange={event => this.handleEditInputChange(event, 'seat', null)}
                                    value={this.state.classroomSelected.seat}
                                />

                                <FormControl>
                                    <InputLabel>{lang.phoneClassroomLbl}</InputLabel>
                                    <Input
                                        onChange={event => this.handleEditInputChange(event, 'phone', null)}
                                        value={this.state.classroomSelected.phone}
                                        inputComponent={PhoneMask.phoneMaskCustom}
                                    />
                                </FormControl>
                                {this.state.classroomSelected._id && this.state.days.map(day => (
                                    <FormControlLabel
                                        key={day._id}
                                        control={
                                            <Checkbox
                                                checked={this.state.classroomSelected.days.filter(x => x === day._id).length > 0}
                                                onChange={event => this.handleEditInputChange(event, 'days', day._id)}
                                            />
                                        }
                                        label={lang.days[day.title]}
                                    />
                                ))}
                            </>
                        )}
                    </DialogContent>
                    <DialogActions className='dialog-footer'>
                        {this.state.editMode && (
                        <Button fullWidth onClick={event => this.handleActionClick(event, action.edit, this.state.classroomSelected)} color='primary'>
                            {lang.formBtn}
                        </Button>
                        )}
                        {!this.state.editMode && (
                        <Button fullWidth onClick={event => this.handleActionClick(event, action.add, this.state.classroomSelected)} color='primary'>
                            {lang.formBtn}
                        </Button>
                        )}
                    </DialogActions>
                </Dialog>

                <Dialog
                    className='dialog'
                    onClose={this.handleCloseDialog}
                    aria-labelledby='customized-dialog-title'
                    open={this.state.showListDialog}
                >
                {this.state.childSelectedList.length === 0 && (
                    <DialogTitle id="simple-dialog-title">{lang.emptyList}</DialogTitle>
                )}

                {this.state.childSelectedList.length > 0 && (
                    <>
                    <DialogTitle id="simple-dialog-title">{lang.listLabel}</DialogTitle>
                    <List>
                        {this.state.childSelectedList.map(child => (
                            <ListItem key={child._id} button onClick={() => console.log(child)}>
                                <ListItemAvatar>
                                <Avatar>
                                    <PersonIcon />
                                </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={child.first_name + ' ' + child.last_name} />
                            </ListItem>
                        ))}
                    </List>
                    </>
                )}
                </Dialog>

            </div>
                <Snack
                    show={this.state.showSnack}
                    duration={5000}
                    message={lang.deleteError}
                    onClose={this.handleCloseSnack}
                    severity='error'
                />
            </>
        )
    }
}

export default withCookies(ClassRoomManagement)
