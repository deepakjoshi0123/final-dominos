import React from 'react';

import burgerLogo from '../../assets/images/dominosLogo.png';
import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={burgerLogo} alt="Pizza" />
    </div>
);

export default logo;