import React, { Component } from 'react'
import Fetch from '../utilities/fetch-datas'
import { withCookies } from 'react-cookie'
import '../styles/_child-list.scss'
import { ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails, Divider, ExpansionPanelActions, Button, TextareaAutosize } from '@material-ui/core'
import EditIcon from '@material-ui/icons/EditOutlined'
const variables = require('../utilities/variables').variables

class ParentChild extends Component {
    constructor () {
        super()
        this.state = {
            childList: [],
            childSelected: null,
            expanded: null
        }
        this.handleEditChild = this.handleEditChild.bind(this)
        this.handleEditChange = this.handleEditChange.bind(this)
        this.childEdited = this.childEdited.bind(this)
    }

    componentDidMount () {
        this.setState({ childSelected: null })
    }

    getLangFile () { return require('../lang/' + this.props.lang + '/child-list.json') }

    handleEditChild () {
        this.state.childSelected !== null && Fetch.user.update(this.props.cookies.get(variables.cookies.token), this.state.childSelected, this.childEdited)
    }

    childEdited (data) {
        if (data.success) {
            // this.props.fetchChild()
        }
    }

    handleChange (event, newChild) {
        if (newChild !== null) {
            this.setState({ childSelected: newChild })
        }
    }

    handleEditChange (event, newValue, name) {
        this.setState(state => {
            const childSelected = state.childSelected
            childSelected.medical_info[0][name] = newValue !== '' ? newValue : null
            return {
                childSelected: childSelected
            }
        })
    }

    buildChildList (lang, child) {
        const childSelected = this.state.childSelected
        return (
            <ExpansionPanel
                className='childs'
                TransitionProps={{ unmountOnExit: true }}
                key={child._id}
                expanded={childSelected !== null && childSelected._id === child._id}
                onChange={event => this.handleChange(event, child)}
            >
                <ExpansionPanelSummary className='head' aria-controls='panel1d-content'>
                    <Typography>{child.last_name + ' ' + child.first_name}</Typography>
                </ExpansionPanelSummary>
                <Divider />
                <ExpansionPanelDetails className='details'>
                    <div>
                        <p>{lang.allergieLabel}</p>
                        <TextareaAutosize
                            className='textarea'
                            rowsMin={2}
                            onChange={(event) => this.handleEditChange(event, event.target.value, 'allergies')}
                            value={childSelected !== null && childSelected.medical_info[0].allergies !== null ? childSelected.medical_info[0].allergies : ''}
                        />
                    </div>
                    <div>
                        <p>{lang.drugLabel}</p>
                        <TextareaAutosize
                            className='textarea'
                            rowsMin={2}
                            onChange={(event) => this.handleEditChange(event, event.target.value, 'drugs')}
                            value={childSelected !== null && childSelected.medical_info[0].drugs !== null ? childSelected.medical_info[0].drugs : ''}
                        />
                    </div>
                </ExpansionPanelDetails>
                <Divider />
                <ExpansionPanelActions>
                    <Button
                        className='btn-edit'
                        onClick={this.handleEditChild()}
                        variant='contained'
                        color='secondary'
                        startIcon={<EditIcon />}
                    >
                        {lang.btnEdit}
                    </Button>
                </ExpansionPanelActions>
            </ExpansionPanel>
        )
    }

    render () {
        const lang = this.getLangFile()
        const childList = this.props.childList
        return (
            <div className='parent-child'>
                {childList.length > 0 && childList.map(child => this.buildChildList(lang, child))}
            </div>
        )
    }
}

export default withCookies(ParentChild)
