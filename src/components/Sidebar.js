import React from 'react';

export const Sidebar = () => {
    return (
        <div className={'sidebar'} data-color="white">
            <div className={'logo'}>
                <a className={'simple-text logo-normal'}>CDGD</a>
            </div>
            <div className={'sidebar-wrapper'}>
                <ul className={'nav'}>
                    <li>
                        <a href={'#'}>
                            <i className={'nc-icon nc-single-02'}/>
                            <p>Users</p>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
};