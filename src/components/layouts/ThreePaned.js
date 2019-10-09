import React from 'react';
import { Redirect } from 'react-router-dom';
import {Footer, Dropdown, Sidebar, ErrorBoundary} from '../index';
import { AuthenticationConsumer } from '../../context/authentication.context';
import { authenticationService } from '../../services';
import PropTypes from 'prop-types';

export const ThreePaned = props => {

    const items = [
        {
            title: 'Logout',
            handler: () => {
                authenticationService.logout();
                return <Redirect to={{ pathname: '/login'}} />
            }
        }
    ];

    return (

        <AuthenticationConsumer>
            {({ currentUser }) => (
                <div className={'three-paned'}>

                    <Sidebar/>

                    <div className={'main-panel'}>

                        <nav className={'navbar navbar-expand-lg navbar-absolute fixed-top navbar-transparent'}>
                            <div className={'container-fluid'}>
                                <div className={'navbar-wrapper'}>
                                    <div className={'navbar-brand'}>Materials Admin</div>
                                </div>
                                <div className={'collapse navbar-collapse justify-content-end'} id={'navigation'}>
                                    <ul className={'navbar-nav'}>
                                        <Dropdown title={currentUser.firstName} items={items}/>
                                    </ul>
                                </div>
                            </div>
                        </nav>

                            <div className={'content'}>
                                <ErrorBoundary>
                                    {props.children}
                                </ErrorBoundary>
                            </div>
                        <Footer/>
                    </div>
                </div>
            )}
        </AuthenticationConsumer>
    )
};

ThreePaned.prototype = {
    contentSlot: PropTypes.func
};