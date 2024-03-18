import { useContext } from 'react';
import Model from '../UI/Model';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import CartItem from "./CartItem"

const Cart = (props) => {
  const  carCtx = useContext(CartContext)
const totalAmount = `$${carCtx.totalAmount.toFixed(2)}`
const hasItems = carCtx.items.length > 0; 
const cartItemRemoveHandler=id=>{}
const cartItemAddHandler=item=>{}
  const cartItems = (
    <ul className={classes['cart-items']}>
      {carCtx.items.map((item) => (
        <CartItem key={item.id} 
         name={item.name} 
        amount={item.amount} price={item.price} 
        onReomove={cartItemRemoveHandler.bind(null,item.id)} 
        onAdd={cartItemAddHandler.bind(null,item)}
        />
      ))}
    </ul>
  );

  return (
    <Model onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>
          Close
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Model>
  );
};

export default Cart;