import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import BuildControls from '../../components/PizzaMenu/BuildControls/BuildControls';
import Fillings from '../../components/PizzaMenu/Fillings/Fillings';
import Cart from '../../components/cart/cart'
import classes from '../PizzaList/pizzaList.css'


// for filling the same order 

let comp={  // to compare new order to orders in cart if similar add to exisiting order 
    extraCheese: 0,
    ExtraOnion : 0,
    ExtraTomato : 0 ,
    Morzilla : 0

}
 
let Filling ={     // fillings to keep track which one  is selected 
    extraCheese: 0,  
    ExtraOnion : 0,
    ExtraTomato : 0 ,
    Morzilla : 0
} 


let PizzaId=1;
let size ='large';
const INGREDIENT_PRICES = {  //pizza prices 
    onion: 75,
    cheese: 95,
    mixVeg: 110,
    Tomato: 80,
};

const ExtraFillings = {  // price of extra fillings 
    extraCheese: 50,
    ExtraOnion : 20,
    ExtraTomato :25 ,
    Morzilla : 80
} 

class PizzaList extends Component { 
    state = {   

        ExtraFillings : {
            extraCheese: 0,
            ExtraOnion : 0,
            ExtraTomato :0 ,
            Morzilla : 0
        } ,
        CartPrice:0,
        orderCart : [],
        // type of pizzaa
        ingredients: {
            onion: 0,
            cheese: 0,
            mixVeg: 0,
            Tomato: 0,
        },
        // fillings to be added to pizza
        purchasable: false,
        purchasing: false,
    }

pizzaSize = (pizzaType,event)=>
    {
        size = event.target.value;
    }

 //store fillings user want to add   
    AddFillings=(fil)=> {
        let stfil={...this.state.ExtraFillings}
        stfil[fil]=1;
        this.setState({ExtraFillings: stfil})  // way to initiallise nested obj state 
        Filling[fil]= 1 ;   // set to all 0 when modal is closed , so next time custom opens added get removed 
        comp[fil]=1;  // for checking next order is same or diff {wheather to create the new order or inc qty }
    }
  
    // used for sorting 
     compare = (a, b) => {
       
        const ordera = a.OrderId;
        const orderb = b.OrderId;
      
        let comparison = 0;
        if (ordera > orderb) {
          comparison = 1;
        } else if (ordera < orderb) {
          comparison = -1;
        }
        return comparison;
      }
      

    add=(orderid)=>{
    
         let Order = this.state.orderCart.filter(order => order.OrderId === orderid)
         let updatedOrder = this.state.orderCart.filter(order => order.OrderId !==orderid) ; 
        // console.log("order without matched orderid ", updatedOrder) 
         Order[0].qty=Order[0].qty+1;
         
         let initPrice =Order[0].price;

         let updatedPrice = 0;
         for(let key in Order[0].fillings)
         {
          
             if(Order[0].fillings[key]===1)
             {
               updatedPrice = updatedPrice + ExtraFillings[key]; 
             }
         }
         
        
         Order[0].price= Order[0].price + updatedPrice + INGREDIENT_PRICES[Order[0].name]; 
        // push order on the same location ,prefered sort
        
         updatedOrder.push(Order[0]);
         updatedOrder.sort(this.compare); // O(nlogn) " splice was of O(nlogn)"
         
        //
         let newPrice = this.state.CartPrice + Order[0].price - initPrice; 
         this.setState({orderCart : updatedOrder , CartPrice : newPrice } )
        // Order=null,updatedOrder=null  
    }

    del=(orderid)=>{

        let updatedOrder ;
        let Order = this.state.orderCart.filter(order => order.OrderId === orderid)
        let upOrder = this.state.orderCart.filter(order => order.OrderId !==orderid) ; 

       // let initPrice =Order[0].price;

        let updatedPrice = 0;
         for(let key in Order[0].fillings)
         {
          
             if(Order[0].fillings[key]===1)
             {
               updatedPrice = updatedPrice + ExtraFillings[key]; 
             }
         }
         
         Order[0].price =Order[0].price - updatedPrice - INGREDIENT_PRICES[Order[0].name] ; 
         let newPrice = Order[0].price; 
         this.setState({CartPrice:newPrice})

        if(Order[0].qty===1)
           { 
               updatedOrder = this.state.orderCart.filter(order => order.OrderId !==orderid) ; 
               //console.log(updatedOrder)
               PizzaId=PizzaId-1;
               this.setState({orderCart:updatedOrder})
            }
        else 
          {
               Order[0].qty=Order[0].qty-1; 
               upOrder.push(Order[0]);
               upOrder.sort(this.compare)
               this.setState({orderCart:upOrder } ) 
          }
    }
            
    compareobj(obj){
        if(obj.extraCheese === comp.extraCheese && obj.ExtraOnion === comp.ExtraOnion && obj.ExtraTomato === comp.ExtraTomato && obj.Morzilla === comp.Morzilla)
           return true;
        else 
           return false;    
    }

    addIngredientHandler = ( type ) => {
             
             let reporder = this.state.orderCart.filter(order =>  order.name.localeCompare( type )===0  )
             let real = this.state.orderCart.filter(order =>  order.name.localeCompare( type )!== 0)
            // console.log(reporder[0].fillings)
             if(reporder[0]!==undefined && this.compareobj(reporder[0].fillings)===true)
              {
                  reporder[0].qty = reporder[0].qty + 1 ;
               
                  // this would be better if its function 

                  let updatedPrice = 0;
                  for(let key in reporder[0].fillings)
                  {
                   
                      if(reporder[0].fillings[key]===1)
                      {
                        updatedPrice = updatedPrice + ExtraFillings[key]; 
                      }
                  }
                  
                  reporder[0].price = reporder[0].price + updatedPrice + INGREDIENT_PRICES[reporder[0].name] ; 
                   let ltprc= this.state.CartPrice + updatedPrice + INGREDIENT_PRICES[reporder[0].name]

                  real.push(reporder[0])
                  real.sort(this.compare)
                  this.setState({orderCart:real , CartPrice:ltprc})
                  return ;
              }
          // if it's new order ..... than don't increase it's frequency 
         let order = {
             
             OrderId:0,
             size: "large",
             del: 1,
             qty: 1,
             name: "pizza",
             price:0,
             fillings : {
                extraCheese:0,
                ExtraOnion:0,
                ExtraTomato:0,
                Morzilla:0

             }, 
         };
   
         // order ID 
         order.OrderId=PizzaId;
         PizzaId=PizzaId+1;
     
         order.name=type;
         order.fillings.extraCheese= Filling.extraCheese;
         order.fillings.ExtraOnion= Filling.ExtraOnion;
         order.fillings.ExtraTomato= Filling.ExtraTomato;
         order.fillings.Morzilla= Filling.Morzilla;
    
        Filling.extraCheese=0;
        Filling.ExtraOnion=0;
        Filling.ExtraTomato=0;
        Filling.Morzilla=0;

         order.size=size;
         
         let price = 0;
         order.size = size ;

         for(let key in order.fillings)
         {
             if(order.fillings[key]===1)
             {
               price = price + ExtraFillings[key]; 
             }
         }
         
          order.price= price + INGREDIENT_PRICES[type]
         let priceee = this.state.CartPrice + price + INGREDIENT_PRICES[type] * order.qty;
         const updatedIngredients = {
             ...this.state.ingredients
         };
         this.state.orderCart.push(order);

        price=0;
        order=null;
        this.setState( {ing: updatedIngredients ,CartPrice:priceee } ); 
        
    }
 
    delItem = ( id ) => {

        PizzaId=PizzaId-1; // decrease id so in future we gets continous freqency 
        let Order = this.state.orderCart.filter(order => order.OrderId === id)
        let updatedPrice = 0;
        for(let key in Order[0].fillings)
        {
          
          if(Order[0].fillings[key]===1)
            {
              updatedPrice = updatedPrice + ExtraFillings[key];  
            }
        }
      
        let prc = this.state.CartPrice - updatedPrice -INGREDIENT_PRICES[Order[0].name]*Order[0].qty;
        let updatedOrder = this.state.orderCart.filter(order => order.OrderId !==id) ; 
        this.setState( { orderCart : updatedOrder , CartPrice:prc} );
    }
 // used in modal 
    purchaseHandler = () => {
        this.setState({purchasing: true});
    }
// used in modal closing 
    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
        let stfil = {...this.state.ExtraFillings}
        stfil.extraCheese=0;
        stfil.ExtraOnion=0;
        stfil.ExtraTomato=0;
        stfil.Morzilla=0;
        this.setState({ExtraFillings:stfil})
    }  
 
    render () {
        //show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}
        return (
            <Aux>
                <Fillings 
                        show={this.state.purchasing}   // model open close
                        closeModel={this.purchaseCancelHandler} // function to toggle purchasing 
                        AddFill={this.AddFillings}  // change state of fillings {ExtraFillings} whichever is clicked and turn that into red 
                        ingredients={ExtraFillings} //  to show price of extra fillings 
                        fil={this.state.ExtraFillings} // to see which toppings is filled 
                         />
               <div className={classes.screen}>
               <div className={classes.container}>    
                <div className={classes.first}>     
                <BuildControls
                    key={this.state.ingredients}
                    chooseSize={this.pizzaSize} // to change size of pizza 
                    ingredientAdded={this.addIngredientHandler}
                    ordered={this.purchaseHandler}
                   /> 
                </div>
                <div className={classes.second}>
                <Cart
                 add ={this.add}
                 del={this.del}
                 MyCart={this.state.orderCart}
                 delItem={this.delItem}
                 price={this.state.CartPrice}
                />   
                </div>
                </div> 
                </div>
            </Aux>
        );
    }
}

export default PizzaList;