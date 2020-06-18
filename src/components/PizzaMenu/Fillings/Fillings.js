import React from 'react';
import FillPizza from './FillPizza/FillPizza';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button'

const Fillings = ( props ) => {
    const ingredientSummary = Object.keys( props.ingredients )
        .map( igKey => {
            return (
                <Aux key={igKey}>
                <li >
                    <span>{igKey}</span>: {props.ingredients[igKey]} Rs
                </li>
                <FillPizza  
                disFil={props.fil[igKey]}
                addFil={() => props.AddFill(igKey)}/>
                </Aux>
                );
        } );
         
    return (
        <Aux>
            <h3>Want to make Your pizza more delicious</h3>
            <p>Add More fillings :</p>
            <ul>
                {ingredientSummary}
            </ul>
           <Button btnType="Danger" clicked = {props.closeModel}>Close</Button>
        </Aux>
    );
};

export default Fillings; 