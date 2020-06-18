import React from 'react';
import BuildControl from './BuildControl/BuildControl'; 

import onion from '../../../assets/images/onion.jpg'
 import tomato from '../../../assets/images/tomato.jpg'
 import mixVeg from '../../../assets/images/mixVeg.jpeg'
 import cheese from '../../../assets/images/cheese.jpeg'


const controls = [
    { label: 'tomato pizza', type: 'Tomato' , des:'A delectable combination of cheese and juicy tomato' , img :onion },
    { label: 'onion  pizza', type: 'onion' , des:' Delectable combination of onion and cheese', img:tomato},
    { label: 'Cheese pizza', type: 'cheese' ,des:'A classic delight with 100% Real mozzarella cheese' , img :mixVeg},
    { label: 'mix veg pizza', type: 'mixVeg' , des:'Delectable combination of onion & capsicum, a veggie lovers pick',img:cheese },
];

const buildControls = (props) => (
    <div >
        {controls.map(ctrl => (
            <BuildControl
                img={ctrl.img}
                key={ctrl.type}
                chooseSize={ (event) => props.chooseSize(ctrl.type , event )}  // look into again
                des={ctrl.des}
                label={ctrl.label}
                added={() => props.ingredientAdded(ctrl.type)}
                removed={() => props.ingredientRemoved(ctrl.type)}
                costumize={props.ordered}
                 />
        ))} 
    </div>
);

export default buildControls;