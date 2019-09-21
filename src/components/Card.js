import React from 'react';

export const Card = props => {
    return (
        <div className={'card'}>
            <div className={'card-header'}>
                <h5 className={'card-title'}>{props.title}</h5>
            </div>
            <div className={'card-body'}>
                {props.children()}
            </div>
        </div>
    )
};