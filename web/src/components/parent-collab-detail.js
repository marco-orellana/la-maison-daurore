import React, { Component } from 'react'
import { withCookies } from 'react-cookie'
const variables = require('../utilities/variables').variables

class ParentCollabDetail extends Component {
    isAvailable (day) {
        const daysId = this.props.both.availability
        const idDay = this.props.days.filter(x => x.title === day)[0]._id
        return daysId.filter(d => d === idDay).length > 0
    }

    render () {
        const both = this.props.both
        const yes = 'OUI'
        const no = 'NON'
        return (
            <div className='parent-collab-detail'>
                <fieldset>
                    <legend>Details</legend>
                    <div>
                        <div className='row'>
                            <p>Adresse</p>
                            <p>{both.address}</p>
                        </div>
                        <div className='row'>
                            <p>Courriel</p>
                            <p>{both.email}</p>
                        </div>
                        {(both.contact[0] && both.contact[0].personal !== null) && (
                            <div>
                                <p>Personal</p>
                                <p>{both.contact[0].personal}</p>
                            </div>
                        )}
                        {(both.contact[0] && both.contact[0].work !== null) && (
                            <div>
                                <p>Work</p>
                                <p>{both.contact[0].work}</p>
                            </div>
                        )}
                        {(both.contact[0] && both.contact[0].home !== null) && (
                            <div>
                                <p>Home</p>
                                <p>{both.contact[0].home}</p>
                            </div>
                        )}
                        {(both.contact[0] && both.contact[0].emergency !== null) && (
                            <div>
                                <p>Emergency</p>
                                <p>{both.contact[0].emergency}</p>
                            </div>
                        )}
                        <div className='row print-to-remove'>
                            <p>Un ou des enfant(s) de moins de 18ans</p>
                            <p>{both.has_child ? yes : no}</p>
                        </div>
                    </div>
                </fieldset>
                <fieldset className='print-to-remove'>
                    <legend>Membership</legend>
                    <div>
                        <div className='row'>
                            <p>Statut</p>
                            <p>{both.membership[0].status ? 'EST ' : "N'EST PAS "} MEMBRE</p>
                        </div>
                        <div className='row'>
                            <p>Mode de paiement</p>
                            <p>{both.membership[0].payement_method}</p>
                        </div>
                        <div>
                            <p>Carte membre</p>
                            <p>{both.membership[0].member_card ? yes : no}</p>
                        </div>
                        <div>
                            <p>Carte de remise</p>
                            <p>{both.membership[0].discount_card ? yes : no}</p>
                        </div>
                    </div>
                </fieldset>
                {both.roleTitle !== variables.role.parent && (
                    <>
                        <fieldset>
                            <legend>Ses disponibilites</legend>
                            <div>
                                <div>
                                    <p>LUNDI</p>
                                    <p>{this.isAvailable(variables.days.lundi) ? yes : no}</p>
                                </div>
                                <div>
                                    <p>MARDI</p>
                                    <p>{this.isAvailable(variables.days.mardi) ? yes : no}</p>
                                </div>
                                <div>
                                    <p>MERCREDI</p>
                                    <p>{this.isAvailable(variables.days.mercredi) ? yes : no}</p>
                                </div>
                                <div>
                                    <p>JEUDI</p>
                                    <p>{this.isAvailable(variables.days.jeudi) ? yes : no}</p>
                                </div>
                            </div>
                        </fieldset>
                        <fieldset className='print-to-remove'>
                            <legend>Ses interets</legend>
                            <div>
                                {both.interest.length > 0 && (
                                    <>
                                        <div className='row'>
                                            <p>Collaborer au JM</p>
                                            <p>{both.interest[0].response === 'true' ? yes : no}</p>
                                        </div>
                                        <div className='row'>
                                            <p>Servir la collation</p>
                                            <p>{both.interest[1].response === 'true' ? yes : no}</p>
                                        </div>
                                        <div className='row'>
                                            <p>Animation de jeux - Preparation fetes</p>
                                            <p>{both.interest[2].response === 'true' ? yes : no}</p>
                                        </div>
                                        <div className='row'>
                                            <p>Accompagner les enfants a l'atelier</p>
                                            <p>{both.interest[3].response === 'true' ? yes : no}</p>
                                        </div>
                                        <div className='row'>
                                            <p>Preparer des collations</p>
                                            <p>{both.interest[4].response === 'true' ? yes : no}</p>
                                        </div>
                                        <div className='row'>
                                            <p>Accompagner les enfants sur internet</p>
                                            <p>{both.interest[5].response === 'true' ? yes : no}</p>
                                        </div>
                                    </>
                                )}
                            </div>
                        </fieldset>
                    </>
                )}
                {both.roleTitle !== variables.role.collab && (
                    <fieldset className='print-to-remove'>
                        <legend>Informations Complementaires{both.roleTitle === variables.role.both && ' en tant que parent'}</legend>
                        <div>
                            {both.involvement.length > 0 && (
                                <>
                                    <div className='max'>
                                        <p>Ses talents</p>
                                        <p>{both.involvement[0].response}</p>
                                    </div>
                                    <div className='row'>
                                        <p>Servir la collation pour les enfants</p>
                                        <p>{both.involvement[1].response === 'true' ? yes : no}</p>
                                    </div>
                                    <div className='row'>
                                        <p>Organisation des fetes</p>
                                        <p>{both.involvement[2].response === 'true' ? yes : no}</p>
                                    </div>
                                    <div className='row'>
                                        <p>Accompagner les enfants lors des activites</p>
                                        <p>{both.involvement[3].response === 'true' ? yes : no}</p>
                                    </div>
                                    <div className='max'>
                                        <p>Participation a d'autres activites</p>
                                        <p>{both.involvement[4].response}</p>
                                    </div>
                                </>
                            )}
                            <div className='max'>
                                <p>Ses attentes</p>
                                <p>{both.expectation}</p>
                            </div>
                            <div className='max'>
                                <p>Ses besoins</p>
                                <p>{both.need}</p>
                            </div>
                        </div>
                    </fieldset>
                )}
                {both.roleTitle !== variables.role.parent && (
                    <fieldset className='print-to-remove'>
                        <legend>Informations Complementaires{both.roleTitle === variables.role.both && ' en tant que collaborateur'}</legend>
                        <div>
                            <div className='max'>
                                <p>Motivations</p>
                                <p>{both.motivation}</p>
                            </div>
                            <div className='max'>
                                <p>Experiences et Formations</p>
                                <p>{both.experience}</p>
                            </div>
                            <div className='max'>
                                <p>Commentaires</p>
                                <p>{both.comment}</p>
                            </div>

                            {both.question.length > 0 && (
                                <div className='max'>
                                    <p>Ou avoir entendu parler du besoin de collaborateur</p>
                                    <p>{both.question[3].response !== null ? both.question[3].response : 'Indefini'}</p>
                                </div>
                            )}
                        </div>
                    </fieldset>
                )}
            </div>
        )
    }
}

export default withCookies(ParentCollabDetail)
