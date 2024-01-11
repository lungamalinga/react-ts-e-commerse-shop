import { ProductType } from "../context/ProductProvider"
import { ReducerActionType, ReducerAction, CartItemtype } from "../context/CartProvider"
import { ReactElement, memo } from "react"

type PropsType = {
    product: ProductType,
    dispatch: React.Dispatch<ReducerAction>,
    REDUCER_ACTIONS: ReducerActionType,
    inCart: boolean
}

const Product = ( { product, dispatch, REDUCER_ACTIONS, inCart }: PropsType ): ReactElement => {

    const img: string = new URL(`../images/${product.sku}.png`, import.meta.url).href
    
    console.log( product.sku )

    const onAddToCart = () => dispatch ({ type: REDUCER_ACTIONS.ADD, payload: { ...product, qty: 1} })

    const itemInCart = inCart ? `→ Item in Cart: ✅` : null

    const content = ( 
        <article className="product">
            <h3>{ product.name }</h3>
            <img src={ img } alt={ product.name } className="product__img" />
            <p>
                { new Intl.NumberFormat(`en-US`, { style:'currency', currency: 'USD'  }).format( product.price ) }
                { itemInCart }
            </p>
            <button onClick={ onAddToCart }> Add to Cart </button>
        </article> 
     )
  
    return  content
  
}

function areProductsEqual ({ product: prevProd, inCart: prevInCart }:PropsType, 
                           {product: nextProd, inCart: nextInCart }: PropsType){

    return (
        Object.keys( prevProd).every(key => {
            
            return prevProd[ key as keyof ProductType ] === nextProd [ key as keyof ProductType] 

        })
         && prevInCart === nextInCart
    )                        
}

const MemoizedProduct = memo < typeof Product >(Product)

export default MemoizedProduct