import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import BuildControls from '../../components/PizzaMenu/BuildControls/BuildControls';
import Fillings from '../../components/PizzaMenu/Fillings/Fillings';
import Cart from '../../components/cart/cart'
import classes from '../PizzaList/pizzaList.css'

let comp={
    extraCheese: 0,
    ExtraOnion : 0,
    ExtraTomato : 0 ,
    Morzilla : 0

}

let Filling ={
    extraCheese: 0,
    ExtraOnion : 0,
    ExtraTomato : 0 ,
    Morzilla : 0
} 

let PizzaId=1;
let size ='large';
const INGREDIENT_PRICES = {
    onion: 75,
    cheese: 95,
    mixVeg: 110,
    Tomato: 80,
};

const ExtraFillings = {
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
        this.setState({ExtraFillings: stfil})
        Filling[fil]= 1 ;   
        comp[fil]=1;
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys( ingredients )
            .map( igKey => {
                return ingredients[igKey]; 
            } )
            .reduce( ( sum, el ) => {
                return sum + el;
            }, 0 );
        this.setState( { purchasable: sum > 0 } );
    }

 
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
         
         console.log(updatedPrice , " price " ,INGREDIENT_PRICES[Order[0].name])
         Order[0].price= Order[0].price + updatedPrice + INGREDIENT_PRICES[Order[0].name]; 
        // push order on the same location ,prefered sort
        
         updatedOrder.push(Order[0]);
         updatedOrder.sort(this.compare);
         
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
         console.log(Order[0].price)
         let newPrice = Order[0].price; 
         this.setState({CartPrice:newPrice})

            console.log(orderid , Order[0].qty)
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
               console.log("Order",Order,upOrder , "hello",this.state.orderCart) ; 
               upOrder.sort(this.compare)
               this.setState({orderCart:upOrder } ) 
               console.log(this.state.orderCart , "updated state") 
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
               
                  // price 

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
             console.log("creating this order")
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
        this.updatePurchaseState(updatedIngredients);    
    }
 
    delItem = ( id ) => {

        PizzaId=PizzaId-1;
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

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
        let stfil = {...this.state.ExtraFillings}
        stfil.extraCheese=0;
        stfil.ExtraOnion=0;
        stfil.ExtraTomato=0;
        stfil.Morzilla=0;
        this.setState({ExtraFillings:stfil})
    }

    purchaseContinueHandler = () => {
        alert('You continue!');
    }
 
    render () {
        //show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}
        return (
            <Aux>
                <Fillings 
                        show={this.state.purchasing}
                        closeModel={this.purchaseCancelHandler}
                        key = {this.state.ingredients}
                        AddFill={this.AddFillings}
                        close={this.close}
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        ingredients={ExtraFillings}
                        fil={this.state.ExtraFillings}
                        price={this.state.totalPrice}
                        purchaseCancelled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler} />
             
               <div className={classes.screen}>
               <div className={classes.container}>    
                <div className={classes.first}>     
                <BuildControls
                    key={this.state.ingredients}
                    chooseSize={this.pizzaSize}
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    purchasable={this.state.purchasable}  
                    ordered={this.purchaseHandler}
                    price={this.state.totalPrice} />
                </div>
                <div className={classes.second}>
                <Cart
                 add ={this.add}
                 del={this.del}
                 MyCart={this.state.orderCart}
                 delItem={this.delItem}
                 purchasable={this.state.purchasable}
                 ordered={this.purchaseHandler}
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