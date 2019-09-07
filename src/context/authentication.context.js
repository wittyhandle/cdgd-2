import React, { Component } from 'react';

const AuthenticationContext = React.createContext();

export class AuthenticationProvider extends Component {

    state = {
        currentUser: 'steve'
    };

    setCurrentUser = (currentUser) => {
        console.log('setting', currentUser);
        this.setState({currentUser});
    };

    // constructor(props) {
    //     super(props);
    //
    //     this.state = {
    //         currentUser: 'steve'
    //     };
    //
    //     this.setCurrentUser = (currentUser) => {
    //         console.log('setting', currentUser);
    //         this.setState({currentUser});
    //     }
    // }

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