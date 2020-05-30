import React, { Component } from 'react'
import { MenuItem, Select } from '@material-ui/core'
const langList = require('../lang/index.json')

const buildMenuItems = (list) => (
    list.map((lang, index) => (<MenuItem key={lang.code} value={lang.code}>{lang.title}</MenuItem>))
)
class Header extends Component {
    render () {
        return (
            <>
                <Select
                    className='lang'
                    variant='outlined'
                    value={this.props.lang ? this.props.lang : 'fr'}
                    onChange={this.props.onValueChanged}
                    autoWidth
                >
                    {buildMenuItems(langList)}
                </Select>
            </>
        )
    }
}

export default Header
