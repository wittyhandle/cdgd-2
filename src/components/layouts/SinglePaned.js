import React from 'react';
import './single-paned.scss';
import { Footer } from '../index';

export const SinglePaned = props => {

    return (

        <div className={'single-paned'}>
            <div className="main-panel">

                <div className="content">
                    <div className={'row'}>
                        <div className={'col-md-4 mx-auto'}>
                            {props.children()}
                        </div>
                    </div>
                </div>

                <Footer/>

            </div>
        </div>
    )
};