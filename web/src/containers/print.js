import React, { Component } from 'react'
import { TableContainer, Table, TableHead, TableRow, TableCell, Button, TableBody, IconButton } from '@material-ui/core'
import PrintIcon from '@material-ui/icons/Print'
import PrintList from 'react-to-print'
import '../styles/_print.scss'
const variables = require('../utilities/variables').variables

const isChildren = ({ roleTitle }) => roleTitle === 'children'
const isCollaborater = ({ roleTitle }) => (roleTitle === 'collaborater' || roleTitle === 'collab_parent')
const isParent = ({ roleTitle }) => (roleTitle === 'parent' || roleTitle === 'collab_parent')

class Print extends Component {
    constructor () {
        super()
        this.state = {
            allActors: [],
            listSelected: 0
        }
        this.divToPrint = React.createRef()
        this.divChildrenToPrint = React.createRef()
        this.divCollabToPrint = React.createRef()
        this.divParentToPrint = React.createRef()
        this.handlePrintClick = this.handlePrintClick.bind(this)
    }

    getLangFile () { return require('../lang/' + this.props.lang + '/print.json') }

    handlePrintClick (event, value) {
        this.setState({ listSelected: value })
    }

    buildHeader (lang, value) {
        const headers = [
            { id: 'nom', label: lang.head.lastName, minWidth: 170 },
            { id: 'prenom', label: lang.head.firstName, minWidth: 170 }
        ]
        if (this.state.listSelected === lang.list.ofChild.value) {

        }
        if (value === lang.list.ofCollaborater.value) {
            headers.push({ id: 'phone', label: lang.head.phone, minWidth: 170 })
            headers.push({ id: 'courriel', label: lang.head.courriel, minWidth: 170 })
        }
        if (value === lang.list.ofParent.value) {
            headers.push({ id: 'phone', label: lang.head.phone, minWidth: 170 })
            headers.push({ id: 'courriel', label: lang.head.courriel, minWidth: 170 })
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

    buildRow (lang, actor, value) {
        const getPhoneNumber = this.getPhoneNumberByPriority(actor)

        return (
            <TableRow hover role='checkbox' className='table-row' tabIndex={-1} key={actor._id}>
                <TableCell> {actor.last_name.toUpperCase()} </TableCell>
                <TableCell> {actor.first_name} </TableCell>
                {(value === lang.list.ofParent.value || value === lang.list.ofCollaborater.value) && (
                    <>
                        <TableCell> {getPhoneNumber} </TableCell>
                        <TableCell> {actor.email} </TableCell>
                    </>
                )}
            </TableRow>
        )
    }

    buildBody (lang, allActors, value) {
        return (<TableBody>{allActors.map(actor => this.buildRow(lang, actor, value))}</TableBody>)
    }

    buildListToPrint (lang, config, list) {
        return (
            <div id='details-print' className='to-print'>
                <div className='detail-head to-be-print'>LA MAISON D'AURORE</div>
                <h2>{config.label}</h2>
                <TableContainer className='table-list'>
                    <Table stickyHeader aria-label='sticky table'>
                        {this.buildHeader(lang, config.value)}
                        {this.buildBody(lang, list, config.value)}
                    </Table>
                </TableContainer>
                <div className='detail-footer to-be-print' />
            </div>
        )
    }

    render () {
        const lang = this.getLangFile()
        const allActors = this.props.allActors
        const childrens = allActors.filter(isChildren)
        const collaboraters = allActors.filter(isCollaborater)
        const parents = allActors.filter(isParent)
        return (
            <div className='print'>
                <div className='div-titles'>
                    <div>
                        <h2>{lang.list.ofChild.label}</h2>
                        <PrintList
                            trigger={() => (
                                <Button
                                    variant='contained'
                                    color='secondary'
                                    startIcon={<PrintIcon />}
                                >
                                    {lang.btnPrint}
                                </Button>)}
                            content={() => this.divChildrenToPrint}
                        />
                    </div>

                    <div>
                        <h2>{lang.list.ofCollaborater.label}</h2>
                        <PrintList
                            trigger={() => (
                                <Button
                                    variant='contained'
                                    color='secondary'
                                    startIcon={<PrintIcon />}
                                >
                                    {lang.btnPrint}
                                </Button>)}
                            content={() => this.divCollabToPrint}
                        />
                    </div>

                    <div>
                        <h2>{lang.list.ofParent.label}</h2>
                        <PrintList
                            trigger={() => (
                                <Button
                                    variant='contained'
                                    color='secondary'
                                    startIcon={<PrintIcon />}
                                >
                                    {lang.btnPrint}
                                </Button>)}
                            content={() => this.divParentToPrint}
                        />
                    </div>
                </div>
                <div className='div-lists to-print'>
                    <div ref={el => (this.divChildrenToPrint = el)}>
                        {this.buildListToPrint(lang, lang.list.ofChild, childrens)}
                    </div>
                    <div ref={el => (this.divCollabToPrint = el)}>
                        {this.buildListToPrint(lang, lang.list.ofCollaborater, collaboraters)}
                    </div>
                    <div ref={el => (this.divParentToPrint = el)}>
                        {this.buildListToPrint(lang, lang.list.ofParent, parents)}
                    </div>
                </div>
            </div>
        )
    }
}

export default Print
