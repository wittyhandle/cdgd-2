import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const Dropdown = props => {

    const [dropdownState, setDropdownState] = useState({
        cssClass: '', isExpanded: false
    });

    const onDropDownToggle = (e) => {
        e.preventDefault();
        const klass = dropdownState.cssClass === '' ? 'show' : '';
        setDropdownState({cssClass: klass, isExpanded: !dropdownState.isExpanded});
    };

    return (
        <li className={'nav-item btn-rotate dropdown ' + dropdownState.cssClass }>
            <button
                className={'nav-link dropdown-toggle btn-link'}
                href={'#'}
                onClick={onDropDownToggle}
                data-toggle='dropdown'
                aria-expanded={dropdownState.isExpanded}>
                <i className={'nc-icon'}/>
                <p><span className={'d-md-block'}>{props.title}</span></p>
            </button>
            <div className={'dropdown-menu dropdown-menu-right ' + dropdownState.cssClass}>
                {props.items.map((i, index) => (
                    <button
                        key={index}
                        className='dropdown-item ButtonLink'
                        onClick={i.handler}>{i.title}</button>
                ))}
            </div>
        </li>
    )

};

Dropdown.propTypes = {
    title: PropTypes.string,
    items: PropTypes.arrayOf(
        PropTypes.shape(
            {
                title: PropTypes.string,
                handler: PropTypes.func
            }
        )
    )
};

