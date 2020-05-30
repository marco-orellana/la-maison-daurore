import React, { Component } from 'react'
import { Button, ButtonGroup, Switch, FormControl, InputLabel, Select, MenuItem, ListSubheader } from '@material-ui/core'
import Collapse from '@material-ui/core/Collapse'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import ListTable from '../components/list-table'
import Fetch from '../utilities/fetch-datas'
import { withCookies } from 'react-cookie'
import '../styles/_list.scss'

const variables = require('../utilities/variables').variables

const isChild = ({ roleTitle }) => roleTitle === 'children'
const isParent = ({ roleTitle, isValid }) => ((roleTitle === 'parent' || roleTitle === 'collab_parent') && isValid === true)
const isCollaborator = ({ roleTitle, isValid }) => ((roleTitle === 'collaborater' || roleTitle === 'collab_parent') && isValid === true)
const isAdmin = ({ roleTitle, isValid }) => (roleTitle === 'admin' && isValid === true)

function getRoleFunction (role) {
    switch (role) {
    case variables.role.child:
        return isChild
    case variables.role.parent:
        return isParent
    case variables.role.collab:
        return isCollaborator
    case variables.role.admin:
        return isAdmin
    }
}
class Table extends Component {
    constructor () {
        super()
        this.state = {
            actorSelected: variables.actors.children,
            search: false,
            lastNameInput: '',
            firstNameInput: '',
            classRoomSelected: '',
            schoolInput: '',
            levelSelected: '',
            classrooms: []
        }
        this.setClassroom = this.setClassroom.bind(this)
        this.onActorSelected = this.onActorSelected.bind(this)
        this.handleSearchChange = this.handleSearchChange.bind(this)
        this.handleSearchInputChange = this.handleSearchInputChange.bind(this)
    }

    componentDidMount () {
        Fetch.classroom.get(this.props.cookies.get(variables.cookies.token), this.setClassroom)
    }

    setClassroom (classrooms) {
        this.setState({ classrooms: classrooms })
    }

    getLangFile () { return require('../lang/' + this.props.lang + '/list.json') }

    getCurrentUser () {
        const currentUser = this.props.cookies.get(variables.cookies.user)
        return Fetch.decodeData(currentUser)
    }

    buildButton (actor) {
        const role = this.getCurrentUser().role
        if (!(role === 'admin' && actor.title === 'admin')) {
            return (
                <Button
                    key={actor.id}
                    variant={this.state.actorSelected === actor.id ? 'contained' : 'outlined'}
                    onClick={event => this.onActorSelected(event, actor.id)}
                >
                    {actor.label}
                </Button>
            )
        }
    }

    onActorSelected (event, actor) {
        this.setState({
            actorSelected: actor,
            lastNameInput: '',
            firstNameInput: '',
            classRoomSelected: '',
            schoolInput: '',
            levelSelected: ''
        })
    }

    handleSearchChange () {
        this.setState(state => {
            const search = state.search
            if (search === true) {
                return {
                    search: !search,
                    lastNameInput: '',
                    firstNameInput: '',
                    classRoomSelected: '',
                    schoolInput: '',
                    levelSelected: ''
                }
            } else {
                return {
                    search: !search
                }
            }
        })
    }

    handleSearchInputChange (event, name) {
        if (name !== 'levelSelected' && name !== 'classRoomSelected') {
            this.setState({ [name]: event.target.value })
        } else {
            (event.target.value !== undefined) && this.setState({ [name]: event.target.value })
        }
    }

    getActorSelected () {
        let actorSelected = ''
        switch (this.state.actorSelected) {
        case variables.actors.children:
            actorSelected = variables.role.child
            break
        case variables.actors.parent:
            actorSelected = variables.role.parent
            break
        case variables.actors.collaborator:
            actorSelected = variables.role.collab
            break
        case variables.actors.admin:
            actorSelected = variables.role.admin
            break
        }
        return actorSelected
    }

    updateNewActorsList () {
        if (this.props.menuSelected === variables.menus.validation) {
            return this.props.inValidActors
        } else {
            let getIdClassRoom = this.state.classrooms.filter(classRoom => classRoom.title === this.state.classRoomSelected)
            getIdClassRoom = getIdClassRoom[0] ? getIdClassRoom[0] : this.state.classrooms[0]

            const isRole = getRoleFunction(this.getActorSelected())
            const newList = this.props.actors !== null ? this.props.actors.filter(isRole) : []
            const lastList = []
            if (newList !== null) {
                newList.map(row => {
                    const ch1 = row.first_name.toLowerCase().search(this.state.firstNameInput.toLowerCase())
                    const ch2 = row.last_name.toLowerCase().search(this.state.lastNameInput.toLowerCase())
                    if (this.getActorSelected() === variables.role.child) {
                        const ch3 = this.state.classRoomSelected !== '' ? row.id_classroom && row.id_classroom.search(getIdClassRoom._id) : 0
                        const ch4 = this.state.levelSelected !== '' ? row.school_info[0].level === this.state.levelSelected : true
                        const name = row.school_info[0].name === null ? 'non defini' : row.school_info[0].name
                        const ch5 = name.toLowerCase().search(this.state.schoolInput.toLowerCase());
                        (ch1 !== -1 && ch2 !== -1 && ch3 !== -1 && ch4 === true && ch5 !== -1) && lastList.push(row)
                    } else if (this.getActorSelected() === variables.role.collab) {
                        const ch3 = this.state.classRoomSelected !== '' ? row.id_classroom && row.id_classroom.search(getIdClassRoom._id) : 0;
                        (ch1 !== -1 && ch2 !== -1 && ch3 !== -1) && lastList.push(row)
                    } else {
                        (ch1 !== -1 && ch2 !== -1) && lastList.push(row)
                    }
                })
            }
            return lastList
        }
    }

    render () {
        const lang = this.getLangFile()
        const menuSelected = this.props.menuSelected
        const validationsChange = this.props.inValidActors && this.props.inValidActors.filter(actor => (actor.isValid === true))
        const allActors = this.updateNewActorsList()
        const collabList = (this.props.actors && this.props.actors !== null) ? this.props.actors.filter(isCollaborator) : []
        const parentList = (this.props.actors && this.props.actors !== null) ? this.props.actors.filter(isParent) : []

        return (
            <div className='list'>
                {menuSelected === variables.menus.allUsers && (
                    <>
                        <div className='list-menu'>
                            <ButtonGroup className='btnGroup' size='medium' color='primary' aria-label='large outlined primary button group'>
                                {lang.actors.map(actor => this.buildButton(actor))}
                            </ButtonGroup>
                            <div className='search-button'>
                                <FormControlLabel
                                    control={<Switch checked={this.state.search} onChange={this.handleSearchChange} />} label={lang.search}
                                />
                            </div>
                        </div>
                        <div className='search-container'>
                            <Collapse className='search-fields' in={this.state.search}>
                                <TextField
                                    size='small' variant='filled'
                                    value={this.state.lastNameInput}
                                    onChange={event => this.handleSearchInputChange(event, 'lastNameInput')} label={lang.searchLastName}
                                />
                                <TextField
                                    size='small' variant='filled'
                                    value={this.state.firstNameInput}
                                    onChange={event => this.handleSearchInputChange(event, 'firstNameInput')} label={lang.searchFirstName}
                                />
                                {this.getActorSelected() === variables.role.child && (
                                <>
                                    <FormControl variant='filled'>
                                        <InputLabel color='primary'>par salle</InputLabel>
                                        <Select
                                            value={this.state.classRoomSelected}
                                            onChange={event => this.handleSearchInputChange(event, 'classRoomSelected')}
                                        >
                                            <MenuItem value=''>
                                                <em>Toutes les salles</em>
                                            </MenuItem>
                                            {this.state.classrooms.map(classRoom => (
                                                <MenuItem key={classRoom._id} value={classRoom.title}>{classRoom.title}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

                                    <TextField
                                        size='small' variant='filled'
                                        value={this.state.schoolInput}
                                        onChange={event => this.handleSearchInputChange(event, 'schoolInput')} label='par ecole'
                                    />

                                    <FormControl variant='filled'>
                                        <InputLabel color='primary'>par niveau scolaire</InputLabel>
                                        <Select
                                            value={this.state.levelSelected}
                                            onChange={event => this.handleSearchInputChange(event, 'levelSelected')}
                                        >
                                            <MenuItem value=''>
                                                <em>Tous les niveaux</em>
                                            </MenuItem>
                                            <ListSubheader>Primaire</ListSubheader>
                                            <MenuItem value='Primaire1'>1er</MenuItem>
                                            <MenuItem value='Primaire2'>2e</MenuItem>
                                            <MenuItem value='Primaire3'>3e</MenuItem>
                                            <MenuItem value='Primaire4'>4e</MenuItem>
                                            <MenuItem value='Primaire5'>5e</MenuItem>
                                            <MenuItem value='Primaire6'>6e</MenuItem>

                                            <ListSubheader>Secondaire</ListSubheader>
                                            <MenuItem value='Secondaire1'>I</MenuItem>
                                            <MenuItem value='Secondaire2'>II</MenuItem>
                                            <MenuItem value='Secondaire3'>III</MenuItem>
                                            <MenuItem value='Secondaire4'>IV</MenuItem>
                                            <MenuItem value='Secondaire5'>V</MenuItem>

                                        </Select>
                                    </FormControl>
                                </>
                                )}
                            </Collapse>
                        </div>
                    </>
                )}
                <ListTable
                    lang={this.props.lang}
                    menuSelected={menuSelected}
                    handleValidationChange={this.props.validationChange}
                    allActors={allActors}
                    actorSelected={this.getActorSelected()}
                    classrooms={this.state.classrooms}
                    onChangeImage={this.props.handleImageChange}
                    onUsersListChange={this.props.onUsersListChange}
                    collabList={collabList}
                    parentList={parentList}
                />

                {(menuSelected === variables.menus.validation && validationsChange.length > 0) && (
                    <div className='button-valider'><Button variant='contained' color='secondary' onClick={this.props.handleBtnValidSave}>{lang.btnValidate}</Button></div>
                )}
            </div>
        )
    }
}

export default withCookies(Table)
