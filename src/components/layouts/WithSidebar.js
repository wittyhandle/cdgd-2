import React from 'react';
import { Redirect } from 'react-router-dom';
import { Footer, Dropdown } from '../index';
import { AuthenticationConsumer } from '../../context/authentication.context';
import { authenticationService } from '../../services';

export const WithSidebar = () => {

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
                <div className={'with-sidebar'}>
                    <div className={'sidebar'} data-color="white">Sidebar</div>

                    <div className={'main-panel'}>

                        <nav className={'navbar navbar-expand-lg navbar-absolute fixed-top navbar-transparent'}>
                            <div className={'container-fluid'}>
                                <div className={'navbar-wrapper'}>
                                    <div className={'navbar-brand'}>CDGD Materials</div>
                                </div>
                                <div className={'collapse navbar-collapse justify-content-end'} id={'navigation'}>
                                    <ul className={'navbar-nav'}>
                                        <Dropdown title={currentUser} items={items}/>
                                    </ul>
                                </div>
                            </div>
                        </nav>

                        <div className={'content'}>
                            Main
                        </div>

                        <Footer/>
                    </div>
                </div>
            )}
        </AuthenticationConsumer>

    )
};