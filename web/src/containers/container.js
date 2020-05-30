/* eslint-disable no-unmodified-loop-condition */
import React, { Component } from 'react'
import '../styles/_main.scss'
import Header from '../components/header'
import Main from './main'
import Footer from '../components/footer'
import Loading from '../components/loading'
import Snack from '../components/snack'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import Fetch from '../utilities/fetch-datas'
import { instanceOf } from 'prop-types'
import { withCookies, Cookies } from 'react-cookie'

const variables = require('../utilities/variables').variables

const theme = createMuiTheme({
    palette: {
        primary: {
            main: 'rgba(0, 0, 0, 0.8)'
        },
        secondary: {
            main: 'rgb(1, 144, 147)'
        }
    }
})

class MainContainer extends Component {
    constructor (props) {
        super(props)
        this.state = {
            lang: 'fr',
            isConnected: false,
            showSnack: false,
            showLoading: false
        }
        this.onLangChanged = this.onLangChanged.bind(this)
        this.onLogInClick = this.onLogInClick.bind(this)
        this.onLogOutClick = this.onLogOutClick.bind(this)
        this.handleCloseSnack = this.handleCloseSnack.bind(this)
        this.setCurrentUserInfos = this.setCurrentUserInfos.bind(this)
        this.checkCurrentUser = this.checkCurrentUser.bind(this)
    }

    componentDidMount () {
        this.setState({ showLoading: true })
        const { cookies } = this.props
        const token = cookies.get(variables.cookies.token) || null
        token !== null
            ? Fetch.getCurrentUser(token, this.checkCurrentUser)
            : this.setState({ showLoading: false })
    }

    getLangFile () { return require('../lang/' + this.state.lang + '/container.json') }

    onLangChanged (event) { this.setState({ lang: event.target.value }) }

    checkCurrentUser (token, datas) {
        const { cookies } = this.props
        if (datas.success === true) {
            const user = { ...datas.data }
            cookies.set(variables.cookies.token, token, { path: '/' })
            cookies.set(variables.cookies.user, Fetch.encodeData(user), { path: '/' })
            this.setState({
                isConnected: true,
                showLoading: false,
                showSnack: true
            })
        } else {
            cookies.remove(variables.cookies.user)
            cookies.remove(variables.cookies.token)
        }
    }

    setCurrentUserInfos (token, datas, role) {
        const { cookies } = this.props
        if (datas.success === true) {
            const user = { ...data.data }
            cookies.set(variables.cookies.token, token, { path: '/' })
            cookies.set(variables.cookies.user, Fetch.encodeData(user), { path: '/' })
            this.setState({
                currentUser: user,
                isConnected: true,
                showLoading: false,
                showSnack: true
            })
        } else {
            cookies.remove(variables.cookies.user)
            cookies.remove(variables.cookies.token)
            this.setState({
                isConnected: false,
                showLoading: false
            })
        }
    }

    onLogInClick (event, token) {
        console.log('Connexion .. .. ..')
        this.setState({
            isConnected: false,
            showLoading: true
        })
        Fetch.getCurrentUser(token, this.checkCurrentUser)
    }

    onLogOutClick () {
        console.log('Deconnexion .. .. ..')
        Fetch.logOutUser()
        const { cookies } = this.props

        cookies.remove(variables.cookies.user)
        cookies.remove(variables.cookies.login)
        cookies.remove(variables.cookies.token)
        cookies.remove(variables.cookies.password)
        this.setState({
            isConnected: false,
            showSnack: true
        })
    }

    handleCloseSnack () {
        this.setState({ showSnack: false })
    }

    render () {
        const lang = this.state.lang
        const langFile = this.getLangFile()
        let messageSnack = this.state.isConnected ? langFile.logInSnack : langFile.logOutSnack
        const currentUser = this.props.cookies.get(variables.cookies.user) || null
        messageSnack = currentUser !== null ? messageSnack.replace('USERNAME', Fetch.decodeData(currentUser).first_name) : messageSnack
        return (
            <>
                <ThemeProvider theme={theme}>
                    <Header lang={lang} handleLangChangedClick={this.onLangChanged} />
                    {this.state.showLoading && <Loading lang={lang} />}
                    <Main lang={lang} onhandleLogInClick={this.onLogInClick} onhandleLogOutClick={this.onLogOutClick} />
                    <Footer lang={lang} />
                    <Snack show={this.state.showSnack} duration={5000} message={messageSnack} onClose={this.handleCloseSnack} severity='success' />
                </ThemeProvider>
            </>
        )
    }
}
MainContainer.propTypes = {
    cookies: instanceOf(Cookies).isRequired
}
export default withCookies(MainContainer)
