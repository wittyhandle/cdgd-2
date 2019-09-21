import React from 'react';
import { Footer } from '../index';

export const WithSidebar = props => {

    return (

        <div className={'with-sidebar'}>
            <div className={'sidebar'} data-color="white">
                Sidebar
            </div>

            <div className={'main-panel'}>


                <div className={'content'}>
                    Main
                </div>

                <Footer/>
            </div>
        </div>
    )
};