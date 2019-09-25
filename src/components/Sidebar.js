import React from 'react';
import {SidebarItem} from './index';

export const Sidebar = () => {
    return (
        <div className={'sidebar'} data-color='white' data-active-color='info'>
            <div className={'logo'}>
                <a className={'simple-text logo-normal'}>CDGD</a>
            </div>
            <div className={'sidebar-wrapper'}>
                <ul className={'nav'}>
                    <SidebarItem path={'admin'} name={'Dashboard'} icon={'nc-bank'}/>
                    <SidebarItem path={'user'} name={'Users'} icon={'nc-badge'}/>
                </ul>
            </div>
        </div>
    )
};