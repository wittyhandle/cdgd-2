import React, { Component } from 'react';
import { authenticationService } from '../services';

const AuthenticationContext = React.createContext();

export class AuthenticationProvider extends Component {

    state = {
        currentUser: authenticationService.getUserName()
    };

    setCurrentUser = (currentUser) => {
        this.setState({currentUser});
    };

    render() {

        return (
            <AuthenticationContext.Provider
                value={{
                    currentUser: this.state.currentUser,
                    setCurrentUser: this.setCurrentUser
                }}
            >
                {this.props.children}
            </AuthenticationContext.Provider>
        );
    }
}

export const AuthenticationConsumer = AuthenticationContext.Consumer;