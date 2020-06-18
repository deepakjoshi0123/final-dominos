import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" active>Pizza</NavigationItem>
        <NavigationItem link="/">Meals and combo</NavigationItem>
        <NavigationItem link="/">Non - veg pizza</NavigationItem>
        <NavigationItem link="/">Dessert</NavigationItem>
    </ul>
);

export default navigationItems; 