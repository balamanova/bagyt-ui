import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { isUserAdmin,isUserLoggedIn} from '../services/UserService';

class AuthenticatedRoute extends Component {
    render() {
        console.log(this.props)
        if (isUserAdmin()) {
            return <Route {...this.props} />
        } else if (isUserLoggedIn()) {
            return <Route to= "/client"  {...this.props} />
        } else {
            return <Redirect to= "" />
        }

    }
}

export default AuthenticatedRoute