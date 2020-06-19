import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import { Select } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';

 import classes from './PizzaMenu.css'
 import onion from '../../../assets/images/onion.jpg'
 import tomato from '../../../assets/images/tomato.jpg'
 import mixVeg from '../../../assets/images/mixVeg.jpeg'
 import cheese from '../../../assets/images/cheese.jpeg'


class  PizzaMenu extends Component { 

    state= {

        controls : [
            { label: 'tomato pizza', type: 'Tomato' , des:'A delectable combination of cheese and juicy tomato' , img :onion },
            { label: 'onion  pizza', type: 'onion' , des:' Delectable combination of onion and cheese', img:tomato},
            { label: 'Cheese pizza', type: 'cheese' ,des:'A classic delight with 100% Real mozzarella cheese' , img :mixVeg},
            { label: 'mix veg pizza', type: 'mixVeg' , des:'Delectable combination of onion & capsicum, a veggie lovers pick',img:cheese },
        ]
    } 
    render () {
    return(
     <div >
        {this.state.controls.map(ctrl => (

   <Card  className={classes.root} >
   <CardActionArea>
   <CardMedia
   className={classes.media}
 image={ctrl.img}
 title="Pizza"
/>
 <CardContent>
 <Typography gutterBottom variant="h5" component="h2">
   {ctrl.label} 
 </Typography>
 <Typography variant="body2" color="textSecondary" component="p">
   {ctrl.des}
 </Typography>
</CardContent>
</CardActionArea>
<CardActions>
{ /* meta data large,small,medium to added from map */}  
<Select  onChange={(event) => this.props.chooseSize(ctrl.type , event )}  color = "primary" labelId="Large" id="Large" value="Large" >  
        { this.props.type.map((size)=><MenuItem  labelId={size} id={size} value={size}> {size} </MenuItem> ) }
 </Select>
<Button color = "primary"
   onClick={this.props.ordered} 
   >Costomise</Button>
<Button color = "primary"
   onClick={() => this.props.ingredientAdded(ctrl.type)}>Add to cart
</Button>  
</CardActions>
</Card>    
        ))}
         </div> )

        } 
        }

 export default PizzaMenu    
