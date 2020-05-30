import React, { Component } from 'react'
import { FormGroup, FormControlLabel, Checkbox } from '@material-ui/core/'
import VerifiedUserRoundedIcon from '@material-ui/icons/VerifiedUserRounded'
import CheckBoxOutlineBlankRoundedIcon from '@material-ui/icons/CheckBoxOutlineBlankRounded'
import '../styles/_register-start.scss'

const ids = require('../utilities/variables').variables.id

class registerStart extends Component {
    getLangFile () {
        return require('../lang/' + this.props.lang + '/register-start.json')
    }

    render () {
        const lang = this.getLangFile()
        return (
            <div className='sign-up'>
                <form noValidate autoComplete='off'>
                    <h2>{lang.titlePrimary}</h2>
                    <div className='fields'>
                        <span>{lang.titleSecondary}</span>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        id={ids.registerStart.check.parent}
                                        checked={this.props.currentActor === ids.registerStart.check.both || this.props.currentActor === ids.registerStart.check.parent}
                                        onChange={this.props.onCheckActor}
                                        icon={<CheckBoxOutlineBlankRoundedIcon />}
                                        checkedIcon={<VerifiedUserRoundedIcon />}
                                    />
                                }
                                label={lang.check.parent}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        id={ids.registerStart.check.collaborator}
                                        checked={this.props.currentActor === ids.registerStart.check.both || this.props.currentActor === ids.registerStart.check.collaborator}
                                        onChange={this.props.onCheckActor}
                                        icon={<CheckBoxOutlineBlankRoundedIcon />}
                                        checkedIcon={<VerifiedUserRoundedIcon />}
                                    />
                                }
                                label={lang.check.collaborator}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        id={ids.registerStart.check.both}
                                        checked={this.props.currentActor === ids.registerStart.check.both}
                                        onChange={this.props.onCheckActor}
                                        icon={<CheckBoxOutlineBlankRoundedIcon />}
                                        checkedIcon={<VerifiedUserRoundedIcon />}
                                    />
                                }
                                label={lang.check.both}
                            />
                        </FormGroup>
                        {(this.props.currentActor !== null) && (
                            <div
                                id={ids.loginRegister.showRegister}
                                onClick={this.props.onShowRegisterForm}
                                className='next-step'
                            >
                                <p>NEXT</p>
                                <div />
                            </div>
                        )}
                    </div>
                </form>
            </div>
        )
    }
}

export default registerStart
