import React, { Component } from 'react'
import Form from './builds'

import '../../styles/_complementary-informations.scss'
const FormConfig = require('../../forms-files/parent_complementary_informations.json').fieldsets
const ids = require('../../utilities/variables').variables.id.complementaryInformations

class ComplementaryInformations extends Component {
    getLangFile () { return require('../../lang/' + this.props.lang + '/complementary-informations.json') }

    render () {
        const lang = this.getLangFile()
        return (
            <>
                <div className='complementary-informations'>
                    <h1>{lang.title}</h1>
                    <div>
                        {FormConfig.map(fieldset => {
                            return (
                                <fieldset key={ids[fieldset.name]}>
                                    <legend>{lang[fieldset.name].label}</legend>
                                    <div className='fields'>
                                        {lang[fieldset.name].info && (<p>{lang[fieldset.name].info}</p>)}
                                        {fieldset.fields.map(field => {
                                            return (
                                                <div key={ids[field.name]}>
                                                    {Form[field.type](field, this.props.lang, lang[fieldset.name], this.props.fields, this.props.errors, this.props.inputEvent, ids)}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </fieldset>
                            )
                        })}
                    </div>

                </div>
            </>
        )
    }
}

export default ComplementaryInformations
