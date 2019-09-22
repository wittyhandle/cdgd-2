import React, { useState } from 'react';
import { Footer } from '../index';
import { AuthenticationConsumer } from '../../context/authentication.context';

export const WithSidebar = props => {

    const [dropdownState, setDropdownState] = useState({
        cssClass: '', isExpanded: false
    });

    const onClick = () => {
        const klass = dropdownState.cssClass === '' ? 'show' : '';
        setDropdownState({cssClass: klass, isExpanded: !dropdownState.isExpanded});
    };

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
                                        <li className={'nav-item btn-rotate dropdown ' + dropdownState.cssClass }>
                                            <a className={'nav-link dropdown-toggle'} href={'#'} onClick={onClick} data-toggle='dropdown' aria-expanded={dropdownState.isExpanded}>
                                                <i className={'nc-icon'}/>
                                                <p>
                                                    <span className={'d-md-block'}>{currentUser}</span>
                                                </p>
                                            </a>
                                            <div className={'dropdown-menu dropdown-menu-right ' + dropdownState.cssClass}>
                                                <a className="dropdown-item"
                                                   href="#">Action</a>
                                                <a className="dropdown-item"
                                                   href="#">Another Action</a>
                                                <a className="dropdown-item"
                                                   href="#">Something else here</a>
                                            </div>
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