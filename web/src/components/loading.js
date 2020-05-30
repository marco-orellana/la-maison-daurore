import React, { Component } from 'react'
import './../styles/loading.scss'

class Loading extends Component {
    getLangFile () {
        return require('../lang/' + this.props.lang + '/loading.json')
    }

    render () {
        return (
            <div className='loading'>
                <div className='tree' />
            </div>
        )
    }
}

export default Loading
