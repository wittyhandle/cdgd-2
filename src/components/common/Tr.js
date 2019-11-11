import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

export const Tr = ({flairCss, css, children}) => {
	
	const [flair, setFlair] = useState('');
	
	useEffect(() => {
		flairCss && setFlair(flairCss);
		setTimeout(() => {setFlair('')}, 2000);
	}, [flairCss]);
	
	return (
		<tr
			className={`${css} ${flair}`}
		>{children}</tr>
	)
	
};

Tr.propTypes = {
	flairCss: PropTypes.string,
	css: PropTypes.string
};
