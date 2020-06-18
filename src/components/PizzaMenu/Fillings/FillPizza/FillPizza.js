import React from 'react';
import Button from '../../../UI/Button/Button'
import classes from './FillPizza.css'
const FillPizza = (props) => (
    
    <div >
          {props.disFil===0 ? <Button btnType="Success" clicked={props.addFil}>Add</Button>:<p className={classes.add} >Added</p>}
    </div> 
);
export default FillPizza;
