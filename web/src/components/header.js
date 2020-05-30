import React, { Component } from 'react'
import { AppBar, Toolbar, IconButton } from '@material-ui/core'
import LangDropDown from './lang-dropdown'
import '../styles/_header.scss'

class Header extends Component {
    render () {
        const lang = this.props.lang
        return (
            <AppBar color='secondary' position='static'>
                <Toolbar>
                    <IconButton className='img' />
                    <div className='right-head'>
                        <LangDropDown lang={lang} onValueChanged={this.props.handleLangChangedClick} />
                    </div>
                </Toolbar>
            </AppBar>
        )
    }
}

export default Header
