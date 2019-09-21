import React from 'react';
import { Footer } from '../index';
import { AuthenticationConsumer } from '../../context/authentication.context';

export const WithSidebar = props => {

    return (

        <AuthenticationConsumer>
            {({ currentUser }) => (
                <div className={'with-sidebar'}>
                    <div className={'sidebar'} data-color="white">
                        Sidebar
                    </div>

                    <div className={'main-panel'}>

                        <nav className={'navbar navbar-expand-lg navbar-absolute fixed-top navbar-transparent'}>
                            <div className={'container-fluid'}>
                                <div className={'navbar-wrapper'}>
                                    <div className={'navbar-brand'}>CDGD Materials</div>
                                </div>
                                <div className={'collapse navbar-collapse justify-content-end'} id={'navigation'}>
                                    <ul className={'navbar-nav'}>
                                        <li className={'nav-item'}>
                                            <a className={'nav-link'} href={'#'}>
                                                <i className={'nc-icon nc-single-02'}/>
                                                <p>
                                                    <span className={'d-md-block'}>{currentUser}</span>
                                                </p>
                                            </a>
                                        </li>
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