import React, { Component } from 'react'
import Form from './builds'

import '../../styles/_children-inscription.scss'
const FormConfig = require('../../forms-files/parent_children_inscription.json').fieldsets
const ids = require('../../utilities/variables').variables.id.childrenRegister

class ChildrenInscription extends Component {
    getLangFile () { return require('../../lang/' + this.props.lang + '/children-inscription.json') }

    render () {
        const lang = this.getLangFile()
        return (
            <>
                <div className='children-inscription'>
                    <h1>{lang.title} {this.props.nbre}/ {this.props.nbreChild}</h1>
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

export default ChildrenInscription
