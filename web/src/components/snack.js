import React, { Component } from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

const Alert = (props) => (<MuiAlert elevation={0} variant='filled' {...props} />)

class Snack extends Component {
    render () {
        const message = this.props.message ? this.props.message : 'message snack is not set'
        const severity = this.props.severity ? this.props.severity : 'info'
        const duration = this.props.duration ? this.props.duration : 3000
        return (
            <>
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    open={this.props.show}
                    onClose={this.props.onClose}
                    autoHideDuration={duration}
                >
                    <Alert severity={severity}>{message}</Alert>
                </Snackbar>
            </>
        )
    }
}

export default Snack
