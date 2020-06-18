import React from 'react';
import classes from '../cart.css'
import Button from '@material-ui/core/Button'
const CartDel = (props) => (
    
    <div >
          <div className={classes.button}>
          <Button color ="primary"  onClick={props.addItem}>+ Qty</Button>
          </div>
          <div className={classes.button}>
          <Button color ="primary" onClick={props.delItem}>- Qty</Button>
          </div>
          <br/>
          <Button color ="secondary" onClick={props.del}>Remove Item</Button>
        
    </div> 
);
export default CartDel; 
