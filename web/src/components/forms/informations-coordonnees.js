import React, { Component } from 'react'
import Form from './builds'

import '../../styles/_informations-coordonnees.scss'
const FormConfig = require('../../forms-files/informations-coordonnees.json').fields
const variables = require('../../utilities/variables').variables

const ids = require('../../utilities/variables').variables.id.register

class InformationsCoordonnees extends Component {
    getLangFile () { return require('../../lang/' + this.props.lang + '/informations-coordonnees.json') }

    render () {
        const lang = this.getLangFile()
        return (
            <>
                <div className='informations-coordonnees'>
                    <h1>{lang.title}</h1>
                    <div className='fields'>
                        {FormConfig.map(field => {
                            return (
                                <div key={variables.id.register[field.name]}>
                                    {Form[field.type](field, this.props.lang, lang, this.props.fields, this.props.errors, this.props.inputEvent, ids)}
                                </div>)
                        })}
                    </div>

                </div>
            </>
        )
    }
}

export default InformationsCoordonnees
