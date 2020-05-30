import React, { Component } from 'react'
import { FormControl, InputLabel, Select, MenuItem, TextField, FormControlLabel, Checkbox, TextareaAutosize, ListSubheader } from '@material-ui/core'
import { withCookies } from 'react-cookie'
import { Autocomplete } from '@material-ui/lab'
import Fetch from '../utilities/fetch-datas'

const variables = require('../utilities/variables').variables

class ChildDetail extends Component {
    constructor () {
        super()
        this.state = {
            classRoomSelected: '',
            showUpdateBtn: false
        }
    }

    getLangFile () { return require('../lang/' + this.props.lang + '/child-detail.json') }

    getClassRoom (child) {
        let retour = 'Indefini'
        if (this.props.classRooms.length > 0 && child.id_classroom) {
            const room = this.props.classRooms.filter(classRoom => classRoom._id === child.id_classroom)[0]
            retour = room ? room.title : 'Indefini'
        }
        return retour
    }

    getCollaborater () {
        const child = this.props.child
        const collaboraters = this.props.collaboraters
        let retour = 'Indefini'
        if (collaboraters.length > 0 && child.id_collaborater) {
            const collaborater = collaboraters.filter(collaborater => collaborater._id === child.id_collaborater)[0]
            retour = collaborater ? (collaborater.first_name + ' ' + collaborater.last_name) : 'Indefini'
        }
        return retour
    }

    getParents () {
        const child = this.props.child
        const parents = this.props.parents
        const retour = []
        if (parents.length > 0 && child.id_parent !== null) {
            child.id_parent.map(id => {
                const parent = parents.filter(parent => parent._id === id)
                if (parent[0]) retour.push(parent[0])
            })
        }
        return retour
    }

    getCurrentUserRole () {
        const currentUser = this.props.cookies.get(variables.cookies.user)
        return Fetch.decodeData(currentUser).role
    }

    render () {
        const lang = this.getLangFile()
        const currentUserRole = this.getCurrentUserRole()
        const child = this.props.child
        const childParents = this.getParents()
        const edit = this.props.editable
        const classRooms = (this.props.classRooms && this.props.classRooms !== null) ? this.props.classRooms : []
        const collaboraters = (this.props.collaboraters && this.props.collaboraters !== null) ? this.props.collaboraters : []
        const valueClassroom = classRooms.filter(x => x._id === this.props.userEdited.id_classroom)[0]
        return (
            <div className='child-detail'>
                <div>
                    <div>
                        <p className='text'>{this.getClassRoom(child)}</p>
                        {(edit && (currentUserRole === 'super_admin' || currentUserRole === 'admin')) && (
                            <FormControl className='select print-to-remove' variant='filled'>
                                <InputLabel color='primary'>SALLES</InputLabel>
                                <Select
                                    value={valueClassroom || ''}
                                    onChange={event => this.props.handleEditChange(event, event.target.value._id, 'id_classroom', null)}
                                >
                                    <MenuItem value='' disabled>
                                        <em>Salle</em>
                                    </MenuItem>
                                    {classRooms.map(classRoom => (
                                        <MenuItem key={classRoom._id} value={classRoom}>{classRoom.title}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        )}
                        <p className='text'>{this.getCollaborater()}</p>
                        {(edit && (currentUserRole === 'super_admin' || currentUserRole === 'admin')) && (
                            <Autocomplete
                                className='select  print-to-remove'
                                onChange={(event, newValue) => this.props.handleEditChange(event, (newValue !== null ? newValue : null), 'id_collaborater', null)}
                                options={collaboraters}
                                getOptionLabel={(collaborater) => collaborater.first_name + ' ' + collaborater.last_name}
                                renderInput={(params) => <TextField {...params} label='COLLABORATEURS' variant='filled' />}
                            />
                        )}
                    </div>
                </div>
                <fieldset>
                    <legend>School Informations</legend>
                    <div>
                        <div className='row'>
                            <p>Nom</p>
                            {(edit && (currentUserRole === 'super_admin' || currentUserRole === 'admin')) ? (
                                <TextField
                                    type='text'
                                    color='primary'
                                    variant='filled'
                                    onChange={(event) => this.props.handleEditChange(event, event.target.value, 'school_info', 'name')}
                                    value={this.props.userEdited.school_info[0].name !== null ? this.props.userEdited.school_info[0].name : ''}
                                />
                            ) : (
                                <p>{child.school_info[0].name === null ? 'Indefini' : child.school_info[0].name}</p>
                            )}
                        </div>
                        <div>
                            <p>Niveau</p>
                            {(edit && (currentUserRole === 'super_admin' || currentUserRole === 'admin'))
                                ? (
                                    <FormControl variant='filled' className='select-detail'>
                                        <InputLabel>{lang.schoolLevel.label}</InputLabel>
                                        <Select
                                            value={this.props.userEdited.school_info[0].level === null ? '' : this.props.userEdited.school_info[0].level}
                                            onChange={(event) => this.props.handleEditChange(event, event.target.value, 'school_info', 'level')}
                                        >
                                            <MenuItem value='' disabled>
                                                <em>{lang.schoolLevel.label}</em>
                                            </MenuItem>

                                            <ListSubheader>{lang.schoolLevel.level[0].label}</ListSubheader>
                                            {lang.schoolLevel.level[0].options.map(option => (
                                                <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                                            ))}

                                            <ListSubheader>{lang.schoolLevel.level[1].label}</ListSubheader>
                                            {lang.schoolLevel.level[1].options.map(option => (
                                                <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                )
                                : (
                                    <p>{child.school_info[0].level === null ? 'Indefini' : child.school_info[0].level}</p>
                                )}
                        </div>
                        <div>
                            <p>Inscription a ADL</p>
                            {edit ? (
                                <FormControlLabel control={
                                    <Checkbox
                                        onChange={(event) => this.props.handleEditChange(event, event.target.checked, 'school_info', 'adl')}
                                        value={!!this.props.userEdited.school_info[0].adl}
                                    />
                                }
                                />
                            ) : (
                                <p>{child.school_info[0].adl ? 'OUI' : 'NON'}</p>
                            )}
                        </div>
                        <div className='row'>
                            <p>Derniere annee reprise (redouble)</p>
                            {edit ? (
                                <FormControl variant='filled' className='select-detail'>
                                    <InputLabel>{lang.schoolLevel.label}</InputLabel>
                                    <Select
                                        value={this.props.userEdited.school_info[0].redouble === null ? '' : this.props.userEdited.school_info[0].redouble}
                                        onChange={(event) => this.props.handleEditChange(event, event.target.value, 'school_info', 'redouble')}
                                    >
                                        <MenuItem value='' disabled>
                                            <em>{lang.schoolLevel.label}</em>
                                        </MenuItem>

                                        <ListSubheader>{lang.schoolLevel.level[0].label}</ListSubheader>
                                        {lang.schoolLevel.level[0].options.map(option => (
                                            <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                                        ))}

                                        <ListSubheader>{lang.schoolLevel.level[1].label}</ListSubheader>
                                        {lang.schoolLevel.level[1].options.map(option => (
                                            <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            ) : (
                                <p>{child.school_info[0].redouble === null ? 'Pas de reprise' : child.school_info[0].redouble}</p>
                            )}

                        </div>
                        <div className='row'>
                            <p>Educatrice</p>
                            {edit ? (
                                <>
                                    <TextField
                                        type='text'
                                        color='primary'
                                        variant='filled'
                                        onChange={(event) => this.props.handleEditChange(event, event.target.value, 'school_info', 'educator_name')}
                                        value={this.props.userEdited.school_info[0].educator_name !== null ? this.props.userEdited.school_info[0].educator_name : ''}
                                        label='Nom et prenom'
                                    />
                                    <TextField
                                        type='text'
                                        color='primary'
                                        variant='filled'
                                        onChange={(event) => this.props.handleEditChange(event, event.target.value, 'school_info', 'educator_phone')}
                                        value={this.props.userEdited.school_info[0].educator_phone !== null ? this.props.userEdited.school_info[0].educator_phone : ''}
                                        label='Contact'
                                    />
                                </>
                            ) : (
                                <p>
                                    <span>{child.school_info[0].educator_name !== null ? child.school_info[0].educator_name : "N'en a pas"}</span>
                                    <span>{child.school_info[0].educator_phone !== null ? child.school_info[0].educator_phone : ''}</span>
                                </p>
                            )}
                        </div>
                        <div className='max'>
                            <p>Raison de l'inscription</p>
                            <p>{child.school_info[0].reason === null ? 'Indefini' : child.school_info[0].reason}</p>
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Informations {childParents.length > 1 ? ' des parents' : ' du parent'}</legend>
                    {(childParents.length > 0 && (
                        childParents.map((parent, index) => (
                            <div key={parent._id + index}>
                                <h2 className='parent-number'>Parent {index + 1}</h2>
                                <div>
                                    <p>Nom</p>
                                    <p>{parent.last_name}</p>
                                </div>
                                <div>
                                    <p>Prenom</p>
                                    <p>{parent.first_name}</p>
                                </div>
                                <div className='row'>
                                    <p>Adresse</p>
                                    <p>{parent.address}</p>
                                </div>
                                {parent.contact[0].personal && (
                                    <div>
                                        <p>Personal</p>
                                        <p>{parent.contact[0].personal}</p>
                                    </div>
                                )}
                                {parent.contact[0].work && (
                                    <div>
                                        <p>Work</p>
                                        <p>{parent.contact[0].work}</p>
                                    </div>
                                )}
                                {parent.contact[0].home && (
                                    <div>
                                        <p>Home</p>
                                        <p>{parent.contact[0].home}</p>
                                    </div>
                                )}
                                {parent.contact[0].emergency && (
                                    <div>
                                        <p>Emergency</p>
                                        <p>{parent.contact[0].emergency}</p>
                                    </div>
                                )}
                            </div>
                        ))
                    ))}
                </fieldset>
                <fieldset className='print-to-remove'>
                    <legend>Medical Informations</legend>
                    <div>
                        <div className={child.medical_info[0].ramq === null ? 'row' : ''}>
                            <p>RAMQ</p>
                            <p>{child.medical_info[0].ramq === null ? 'NON' : 'OUI'}</p>
                        </div>
                        {child.medical_info[0].ramq !== null && (
                            <div>
                                <p>Expiration</p>
                                <p>{child.medical_info[0].ramq}</p>
                            </div>
                        )}
                        <div className='max'>
                            <p>Allergies</p>
                            {edit ? (
                                <TextareaAutosize
                                    className='textarea'
                                    rowsMin={2}
                                    onChange={(event) => this.props.handleEditChange(event, event.target.value, 'medical_info', 'allergies')}
                                    value={this.props.userEdited.medical_info[0].allergies !== null ? this.props.userEdited.medical_info[0].allergies : ''}
                                />
                            ) : (
                                <p>{child.medical_info[0].allergies}</p>
                            )}
                        </div>
                        <div className='max'>
                            <p>Medicaments</p>
                            {edit ? (
                                <TextareaAutosize
                                    className='textarea'
                                    rowsMin={2}
                                    onChange={(event) => this.props.handleEditChange(event, event.target.value, 'medical_info', 'drugs')}
                                    value={this.props.userEdited.medical_info[0].drugs !== null ? this.props.userEdited.medical_info[0].drugs : ''}
                                />
                            ) : (
                                <p>{child.medical_info[0].drugs}</p>
                            )}
                        </div>
                        <div className='max'>
                            <p>Autres informations</p>
                            {edit ? (
                                <TextareaAutosize
                                    className='textarea'
                                    rowsMin={2}
                                    onChange={(event) => this.props.handleEditChange(event, event.target.value, 'medical_info', 'other_info')}
                                    value={this.props.userEdited.medical_info[0].other_info !== null ? this.props.userEdited.medical_info[0].other_info : ''}
                                />
                            ) : (
                                <p>{child.medical_info[0].other_info}</p>
                            )}
                        </div>
                    </div>
                </fieldset>
                <fieldset className='print-to-remove'>
                    <legend>Autorisations</legend>
                    <div>
                        <div className='row'>
                            <p>Publications de photos en version papier</p>
                            {edit ? (
                                <FormControlLabel control={
                                    <Checkbox
                                        onChange={(event) => this.props.handleEditChange(event, event.target.checked, 'authorization', 'paper')}
                                        checked={this.props.userEdited.authorization[0].paper}
                                    />
                                }
                                />
                            ) : (
                                <p>{child.authorization[0].paper ? 'OUI' : 'NON'}</p>
                            )}
                        </div>
                        <div className='row'>
                            <p>Publications de photos sur le site internet</p>
                            {edit ? (
                                <FormControlLabel control={
                                    <Checkbox
                                        onChange={(event) => this.props.handleEditChange(event, event.target.checked, 'authorization', 'internet')}
                                        checked={this.props.userEdited.authorization[0].internet}
                                    />
                                }
                                />

                            ) : (
                                <p>{child.authorization[0].internet ? 'OUI' : 'NON'}</p>
                            )}
                        </div>
                    </div>
                </fieldset>
            </div>
        )
    }
}

export default withCookies(ChildDetail)
