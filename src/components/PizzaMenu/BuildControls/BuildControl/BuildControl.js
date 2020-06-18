import React from 'react';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { Select } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';


const useStyles = makeStyles({
    root: {
      maxWidth: 500,
    },
    media: {
      height: 140,
    },
  });

export default function buildControl(props) { 

    const classes = useStyles();
    return(  <Card  className={classes.root} >
         <CardActionArea>
        <CardMedia
          className={classes.media}
          image={props.img}
          title="Pizza"
        />
          <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.label} 
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.des}
          </Typography>
        </CardContent>
      </CardActionArea>
        <CardActions>
      <Select  onChange={props.chooseSize} value="Large" color = "primary" >  
            <MenuItem value="Large">Large</MenuItem>
            <MenuItem value="Small">Small</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
          </Select>
        <Button color = "primary"
            onClick={props.costumize} 
            >customise</Button>
        <Button color = "primary"
            onClick={props.added}>Add to cart
        </Button>  
        </CardActions>
    </Card>
  );
  
    
  }
