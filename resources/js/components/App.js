import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import { authenticationService } from '../_helpers/authentication'

import Header from './includes/Header'
import Footer from './includes/Footer'

import Login from './auth/Login'
import Register from './auth/Register'

import Home from './Home'
import ShowSClip from './ShowSClip'
import NotFound from './NotFound'

import Profile from './user/Profile'
import Upload from './user/Upload'
import ViewProfile from './user/ViewProfile'

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        authenticationService.getToken()
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)

export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <header id="header">
                    <Header />
                </header>
                <Switch>
                    <Route exact path='/' component={Home} />
                    
                    <Route path='/video/:id' component={ShowSClip} />
                    
                    <Route path='/login' component={Login} />
                    <Route path='/register' component={Register} />
                    
                    <Route exact path='/member/:username' component={ViewProfile} />

                    <PrivateRoute path='/upload' component={Upload} />
                    <PrivateRoute path='/profile' component={Profile} />
                    
                    <Route path='*' component={NotFound} />
                </Switch>
                <Footer />
            </BrowserRouter>
        )
    }
}

ReactDOM.render(<App />, document.getElementById("__root__"));
