import React from 'react';
import { Footer } from '../index';

export const WithSidebar = props => {

    return (

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
                                    <a className={'nav-link'} href={'#'}>Mike - Logout</a>
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
    )
};