import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

const SidebarItemWrapped = props => {

    const activeClass = () => {
        const path = props.path;
        const route = props.location.pathname;
        return route.endsWith(path) ? 'active' : '';
    };

    return (
        <li className={activeClass()}>
            <a href={'/' + props.path}>
                <i className={'nc-icon ' + props.icon}/>
                <p>{props.name}</p>
            </a>
        </li>
    )

};

SidebarItemWrapped.propTypes = {
    path: PropTypes.string,
    name: PropTypes.string,
    icon: PropTypes.string
};

export const SidebarItem = withRouter(SidebarItemWrapped);
