import React, { Component } from 'react'
import { Button } from '@material-ui/core'
import '../styles/_footer.scss'

class Footer extends Component {
    constructor () {
        super()
        this.handleAboutClick = this.handleAboutClick.bind(this)
    }

    getLangFile () {
        return require('../lang/' + this.props.lang + '/footer.json')
    }

    handleAboutClick () {
        console.log('not available')
    }

    render () {
        const lang = this.getLangFile()

        return (
            <footer>
                <div className='adresse'>
                    <h2>{lang.adresse.head}</h2>
                    <div>
                        <h3>{lang.adresse.title} </h3>
                        <ul>
                            <li>{lang.adresse.road}</li>
                            <li>{lang.adresse.cp}</li>
                            <li>{lang.adresse.cityState}</li>
                            <li>{lang.adresse.country}</li>
                        </ul>
                    </div>
                </div>
                <div className='map' />
                <div className='contact'>
                    <Button
                        onClick={this.handleAboutClick}
                        variant='contained'
                        color='secondary'
                        size='medium'
                        fullWidth={false}
                    >{lang.contact.contactUs}
                    </Button>
                    <Button
                        onClick={this.handleAboutClick}
                        variant='contained'
                        color='secondary'
                        size='medium'
                        fullWidth={false}
                    >{lang.contact.aboutUs}
                    </Button>
                </div>
            </footer>
        )
    }
}

export default Footer
