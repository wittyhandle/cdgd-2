import React, { Component } from 'react';
import { authenticationService } from '../services/';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }

    handleOnChange = (e) => {
        this.setState({
            [e.target.id] : e.target.value
        })
    };

    doLogin = (e) => {
        e.preventDefault();
        //console.log('will do login with', this.state);
        authenticationService.login(this.state.username, this.state.password)
            .then(
                user => {
                    this.props.history.push({pathname: '/'});
                },
                error => {
                    console.log('error', error);
                }
            );
    };

    render() {
        return (
            <div className={'row align-self-center w-100'}>
                <div className={'col'}>
                    <form className={'mx-auto w-50 p-3'} onSubmit={this.doLogin}>
                        <div className={'form-group'}>

                            <div className={'cdgd-field'}>
                                <label htmlFor='username'>Username</label>
                                <input type='text' value={this.state.username} className={'form-control'} onChange={this.handleOnChange} id='username'/>
                            </div>

                            <div className={'cdgd-field'}>
                                <label htmlFor='password'>Password</label>
                                <input type='password' value={this.state.password} className={'form-control'} onChange={this.handleOnChange} id='password'/>
                            </div>

                            <div className={'cdgd-button'}>
                                <button type='submit' className={'btn btn-primary'}>Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;