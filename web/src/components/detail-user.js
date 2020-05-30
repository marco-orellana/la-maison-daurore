import moment from 'moment'
import MomentUtils from '@date-io/moment'
import React, { Component } from 'react'
import { Button, DialogTitle, DialogContent, Dialog, DialogActions, IconButton, TextField } from '@material-ui/core'
import PrintIcon from '@material-ui/icons/Print'
import EditIcon from '@material-ui/icons/EditOutlined'
import SaveIcon from '@material-ui/icons/SaveAltOutlined'
import CancelIcon from '@material-ui/icons/Cancel'
import DeleteIcon from '@material-ui/icons/Delete'
import { withCookies } from 'react-cookie'
import ChildDetail from './child-detail'
import AdminDetail from './admin-detail'
import ParentCollabDetail from './parent-collab-detail'
import PrintDetail from 'react-to-print'
import Fetch from '../utilities/fetch-datas'
import '../styles/_detail-user.scss'
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers'

const variables = require('../utilities/variables').variables
const getAgeLimit = (age) => {
    const date = new Date()
    return new Date((date.getFullYear() - age) + '-' + (date.getMonth() + 1) + '-' + date.getDate())
}
const action = {
    edit: '1',
    cancel: '2',
    save: '3',
    delete: '4'
}

class DetailUser extends Component {
    constructor () {
        super()
        this.state = {
            fileUploadedSuccess: false,
            fileUploadedError: false,
            showLoading: false,
            showEditLoading: false,
            allowEditable: false,
            userEdited: {},
            collaboratersEdited: null,
            image: ''
        }
        this.divToPrint = React.createRef()
        this.time = 3000
        this.setUserImage = this.setUserImage.bind(this)
        this.handleImageChange = this.handleImageChange.bind(this)
        this.setImage = this.setImage.bind(this)
        this.updateImage = this.updateImage.bind(this)
        this.handleBtnClick = this.handleBtnClick.bind(this)
        this.onEditFieldsChange = this.onEditFieldsChange.bind(this)
        this.userEdited = this.userEdited.bind(this)
        this.setEditedUser = this.setEditedUser.bind(this)
    }

    setEditedUser (user) {
        this.setState({ userEdited: user })
    }

    setUserImage (data) {
        this.setState({ image: data.data })
    }

    componentDidMount () {
        Fetch.user.get(this.props.cookies.get(variables.cookies.token), this.props.userSelected._id, this.setEditedUser)
        Fetch.image.get(this.props.cookies.get(variables.cookies.token), this.props.userSelected._id, this.setUserImage)
    }

    componentDidUpdate (prevProps) {
        if (this.props.userSelected !== prevProps.userSelected) {
            Fetch.user.get(this.props.cookies.get(variables.cookies.token), this.props.userSelected._id, this.setEditedUser)
            this.setState({ image: this.props.userSelected.img })
        }
    }

    onEditFieldsChange (event, value, name, subName) {
        let newValue = value
        if (name === 'id_collaborater') {
            newValue = value !== null ? value._id : null
            this.setState({ collaboratersEdited: value })
        }
        this.setState(state => {
            const userEdited = state.userEdited
            subName === null
                ? userEdited[name] = newValue
                : userEdited[name][0][subName] = newValue

            return {
                userEdited: userEdited
            }
        })
    }

    updateImage (dataImage) {
        this.setUserImage(dataImage)
        this.props.onChangeImage(this.props.userSelected, dataImage.data)
    }

    setImage (dataImage) {
        if (!dataImage.success) {
            this.setState({ fileUploadedError: true })
            setTimeout(() => {
                this.setState({ fileUploadedError: false, showLoading: false })
            }, this.time)
        } else {
            this.setState({ fileUploadedSuccess: true })
            setTimeout(() => {
                this.setState({ fileUploadedSuccess: false, showLoading: false })
            }, this.time)
            Fetch.image.get(this.props.cookies.get(variables.cookies.token), this.props.userSelected._id, this.updateImage)
        }
    }

    handleImageChange () {
        this.setState({ showLoading: true })
        Fetch.image.update(this.props.cookies.get(variables.cookies.token), this.props.userSelected, event.target.files, this.setImage)
    }

    handleBtnClick (event, btnAction) {
        if (btnAction === action.edit || btnAction === action.delete) {
            if (btnAction === action.delete) {
                this.props.onDeleteUser()
            } else {
                this.setState({ allowEditable: true })
            }
        }

        if (btnAction === action.save || btnAction === action.cancel) {
            if (btnAction === action.save) {
                this.setState({ showEditLoading: true })
                Fetch.user.update(this.props.cookies.get(variables.cookies.token), this.state.userEdited, this.userEdited)
            } else {
                this.setState({ allowEditable: false, showEditLoading: false })
            }
        }
    }

    userEdited (data) {
        if (data.success) {
            this.props.onUsersListChange()
            this.setState({ allowEditable: false, showEditLoading: false })
            this.props.renderShowDetail(this.state.userEdited)
        }
    }

    getLangFile () { return require('../lang/' + this.props.lang + '/detail-user.json') }

    render () {
        const lang = this.getLangFile()
        const user = this.props.userSelected
        const allergies = (user.medical_info.length > 0 && user.medical_info[0].allergies !== null) ? user.medical_info[0].allergies : "Pas d'allergies"
        const date = (user && user.birthday !== null) ? new Date(user.birthday).toLocaleDateString() : 'Pas defini'
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
                disableBackdropClick={this.state.allowEditable}
            >
                <DialogTitle id='scroll-dialog-title' className='title'>{lang.modalTitle1} {this.state.allowEditable && lang.modalTitle2}</DialogTitle>
                <DialogContent id='details-print' className='div-dialog' ref={el => (this.divToPrint = el)}>
                    <div className='detail-head to-be-print'>{lang.homeTitle}</div>
                    <div className={this.state.showEditLoading ? 'detail-user loading-effect' : 'detail-user'}>
                        <div className='image'>
                            <Button
                                variant='text'
                                component='label'
                            >
                                <img src={this.state.image} alt='avatar' />
                                {(this.props.menuSelected !== variables.menus.validation) && (
                                    <>
                                        <p><span>{lang.imgClickLabel}</span></p>
                                        <input
                                            className='print-to-remove'
                                            onChange={this.handleImageChange}
                                            accept='.png, .jpg, .jpeg'
                                            type='file'
                                            style={{ display: 'none' }}
                                        />
                                    </>
                                )}
                            </Button>
                            {this.state.fileUploadedSuccess && (
                                <p className='upload-success'>{lang.imgUpdated}</p>
                            )}
                            {this.state.fileUploadedError && (
                                <p className='upload-error'>{lang.imgError}</p>
                            )}
                        </div>
                        <div className='details-personnelles'>
                            <div className='text-name'>
                                <p>{user.first_name + ' ' + user.last_name.toUpperCase()}</p>
                            </div>
                            {user.roleTitle !== variables.role.admin && (
                                <div>
                                    <p>{lang.dateLabel}:</p>
                                    <p>{date}</p>
                                </div>
                            )}
                            {user.roleTitle === variables.role.child && (
                                <div>
                                    <p>{lang.allergiesLabel}:</p>
                                    <p>{allergies === null ? "Pas d'allergies" : allergies}</p>
                                </div>
                            )}
                        </div>
                        <div className='details'>
                            {this.state.allowEditable && (
                                <div className='first'>
                                    <div>
                                        <TextField
                                            type='text'
                                            color='primary'
                                            variant='filled'
                                            label={lang.lastNameLabel}
                                            onChange={event => this.onEditFieldsChange(event, event.target.value, 'last_name', null)}
                                            value={this.state.userEdited.last_name !== null ? this.state.userEdited.last_name : ''}
                                        />
                                        <TextField
                                            type='text'
                                            color='primary'
                                            variant='filled'
                                            label={lang.firstNameLabel}
                                            onChange={event => this.onEditFieldsChange(event, event.target.value, 'first_name', null)}
                                            value={this.state.userEdited.first_name !== null ? this.state.userEdited.first_name : ''}
                                        />
                                        <MuiPickersUtilsProvider
                                            libInstance={moment} utils={MomentUtils}
                                            locale={this.props.lang}
                                        >
                                            <DatePicker
                                                format='DD MMMM YYYY'
                                                openTo='year'
                                                views={['year', 'month', 'date']}
                                                label={lang.birthdayLabel}
                                                minDate={getAgeLimit(100)}
                                                maxDate={getAgeLimit(5)}
                                                value={this.state.userEdited.birthday !== null ? this.state.userEdited.birthday : getAgeLimit(10)}
                                                onChange={event => this.onEditFieldsChange(event, event._d, 'birthday', null)}
                                            />
                                        </MuiPickersUtilsProvider>
                                    </div>
                                </div>
                            )}
                            {this.props.userSelected.roleTitle === variables.role.child && (
                                <ChildDetail
                                    lang={this.props.lang}
                                    child={user}
                                    classRooms={this.props.classRooms}
                                    collaboraters={this.props.collabList}
                                    parents={this.props.parentList}
                                    editable={this.state.allowEditable}
                                    userEdited={this.state.userEdited}
                                    handleEditChange={this.onEditFieldsChange}
                                />
                            )}
                            {(user.roleTitle !== variables.role.child && user.roleTitle !== variables.role.admin) && (
                                <ParentCollabDetail
                                    lang={this.props.lang}
                                    both={user}
                                    editable={this.state.allowEditable}
                                    days={this.props.days}
                                />
                            )}
                            {(user.roleTitle === variables.role.admin) && (
                                <AdminDetail
                                    lang={this.props.lang}
                                    admin={user}
                                />
                            )}
                        </div>
                    </div>
                    <div className='detail-footer to-be-print' />
                </DialogContent>
                <DialogActions className='dialog-footer'>
                    <div>
                        {this.state.allowEditable && (
                        <>
                            <Button
                                onClick={event => this.handleBtnClick(event, action.cancel)}
                                variant='contained'
                                color='secondary'
                                className='btn-edit'
                                startIcon={<CancelIcon />}
                            >
                                {lang.btnCancel}
                            </Button>
                            <Button
                                onClick={event => this.handleBtnClick(event, action.save)}
                                variant='contained'
                                color='secondary'
                                className='btn-save'
                                startIcon={<SaveIcon />}
                            >
                                {lang.btnSave}
                            </Button>
                        </>
                        )}

                        {!this.state.allowEditable && (
                        <>
                            {(user.roleTitle === variables.role.child) && (
                                <Button
                                    onClick={event => this.handleBtnClick(event, action.edit)}
                                    variant='contained'
                                    color='secondary'
                                    className='btn-edit'
                                    startIcon={<EditIcon />}
                                >
                                    {lang.btnEdit}
                                </Button>
                            )}
                            {(user.roleTitle === variables.role.admin) && (
                                <Button
                                    onClick={event => this.handleBtnClick(event, action.delete)}
                                    variant='contained'
                                    color='secondary'
                                    className='btn-delete'
                                    startIcon={<DeleteIcon />}
                                >
                                    {lang.btnDelete}
                                </Button>
                            )}
                        </>
                        )}
                    </div>

                    <div>
                        <PrintDetail
                            trigger={() => <IconButton><PrintIcon fontSize='large' /></IconButton>}
                            content={() => this.divToPrint}
                        />
                    </div>
                </DialogActions>
            </Dialog>
        )
    }
}

export default withCookies(DetailUser)
