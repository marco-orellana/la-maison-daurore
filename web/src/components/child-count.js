import React, { Component } from 'react'
import SvgChild from '../pictures/children.svg'
import DoneAllIcon from '@material-ui/icons/DoneAll'

class ChildCount extends Component {
    getLangFile () { return require('../lang/' + this.props.lang + '/child-count.json') }

    render () {
        const lang = this.getLangFile()
        return (
            <div className='div-svg-child'>
                <h1 className={this.props.childCountError ? ('child-count-error') : ''}>{lang.childCountTitle}</h1>
                {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} onClick={event => this.props.onChildCount(event, i)} className={this.props.childCount >= i ? ('svg-child-selected') : ''}>
                        <p>{i}</p>
                        {[...new Array(i)].map((j, i) => (<SvgChild key={'gsbvndb' + i + j} />))}
                        {this.props.childCount >= i && (<DoneAllIcon className='svg-done' />)}
                    </div>
                ))}
            </div>
        )
    }
}

export default ChildCount
