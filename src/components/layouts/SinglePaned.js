import React from 'react';
import './single-paned.scss';
import { Footer } from '../index';

export const SinglePaned = props => {

    return (

        <div className={'single-paned'}>
            <div className="main-panel">

                <div className="content">
                    {props.pane}
                </div>

                <Footer/>

            </div>
        </div>
    )
};