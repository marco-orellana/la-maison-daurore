import React, { Component } from 'react'
import { withCookies } from 'react-cookie'

class ParentCollabDetail extends Component {
    render () {
        const admin = this.props.admin
        return (
            <div className='admin-detail'>
                <fieldset>
                    <legend>Details</legend>
                    <div>
                        <div className='row'>
                            <p>Courriel</p>
                            <p>{admin.email}</p>
                        </div>
                        {(admin.contact[0] && admin.contact[0].personal !== null) && (
                            <div>
                                <p>Personal</p>
                                <p>{admin.contact[0].personal}</p>
                            </div>
                        )}
                        {(admin.contact[0] && admin.contact[0].work !== null) && (
                            <div>
                                <p>Work</p>
                                <p>{admin.contact[0].work}</p>
                            </div>
                        )}
                        {(admin.contact[0] && admin.contact[0].home !== null) && (
                            <div>
                                <p>Home</p>
                                <p>{admin.contact[0].home}</p>
                            </div>
                        )}
                        {(admin.contact[0] && admin.contact[0].emergency !== null) && (
                            <div>
                                <p>Emergency</p>
                                <p>{admin.contact[0].emergency}</p>
                            </div>
                        )}
                        <div className='row'>
                            <p>Statut du compte</p>
                            <p>{admin.isValid ? 'OUI' : 'NON'}</p>
                        </div>
                    </div>
                </fieldset>
            </div>
        )
    }
}

export default withCookies(ParentCollabDetail)
