import { Children, ReactElement, createContext, useMemo, useReducer } from "react"

export type CartItemtype = {
    sku: string,
    name: string,
    price: number,
    qty: number
}

type CartStateType = {
    cart: CartItemtype[]
}

const initCartState: CartStateType = { cart: [] }

const REDUCER_ACTION_TYPE = {
    ADD: "ADD",
    REMOVE: "REMOVE",
    QUANTITY: "QUANTITY",
    SUBMIT: "SUBMIT"
}

export type ReducerActionType = typeof REDUCER_ACTION_TYPE

export type ReducerAction =  {
    type: string,
    payload?: CartItemtype
}

const reducer = ( state: CartStateType, action: ReducerAction ): CartStateType => {

    switch ( action.type ) {
        case REDUCER_ACTION_TYPE.ADD: {
            
            if ( !action.payload ) {
                throw new Error( `action.payload missing in ADD action` )
            }

            const { sku, name, price } = action.payload 
            const filteredCart: CartItemtype[] = state.cart.filter ( item => item.sku !== sku)
            const itemExists: CartItemtype | undefined = state.cart.find( item => item.sku === sku )
            const qty: number = itemExists ? itemExists.qty + 1 : 1

            return {...state, cart: [...filteredCart, { sku, name, price, qty }]}

        }
        case REDUCER_ACTION_TYPE.REMOVE: {
            
            if ( !action.payload ) {
                throw new Error( `action.payload missing in REMOVE action` )
            }
            
            const { sku } = action.payload 
            const filteredCart: CartItemtype[] = state.cart.filter ( item => item.sku !== sku)

            return { ...state, cart: [...filteredCart] }


        }
        case REDUCER_ACTION_TYPE.QUANTITY: {

            if ( !action.payload ) {
                throw new Error( `action.payload missing in QUANTITY action` )
            }

            const { sku, qty } = action.payload 
            const itemExists: CartItemtype | undefined = state.cart.find( item => item.sku === sku )
            
            if (!itemExists) {
                throw new Error ( `Item must exist in order to update quantity` )
            }

            const updatedItem: CartItemtype = { ...itemExists, qty }

            const filteredCart: CartItemtype[] = state.cart.filter ( item => item.sku !== sku)

            return { ...state, cart: [ ...filteredCart , updatedItem] }
        }
        case REDUCER_ACTION_TYPE.SUBMIT: {
            
            return { ...state, cart:[] }

        }
        default: {
            
            throw new Error ( `Unidentified reducer action type` )

        }
    }
}

const useCartContext = (initCartState: CartStateType) => {
    
    const [state, dispatch] = useReducer( reducer, initCartState )
    
    const REDUCER_ACTIONS = useMemo (() => {
        
        return REDUCER_ACTION_TYPE }, [])
        
        const totalItems: number = state.cart.reduce( ( previousValue, cartItem ) => {
            return previousValue + cartItem.qty
        }, 0)

        // FIXME: USE THE SOUTH AFRICAN CURRENCY
        // ! NOTE: 
        const totalPrice = new Intl.NumberFormat(`en-US`, {style: `currency`, currency: `USD`}).format(
            state.cart.reduce( (previousValue, cartItem ) => {
                return previousValue + ( cartItem.qty * cartItem.price)
            }, 0))

        // todo: start here [ sorting the cart ]
        const cart = state.cart.sort( (a, b) => {
            const itemA = Number (a.sku.slice (-4)) // ! last 4 digits of sku [last four numbers]
            const itemB = Number (b.sku.slice (-4)) // ! last 4 digits of sku [last four numbers]
            return itemA - itemB
        } )

        return { dispatch, REDUCER_ACTIONS, totalItems, totalPrice, cart }

}

export type useCartContextType = ReturnType<typeof useCartContext>

const initCartContextState: useCartContextType = {
    dispatch: () => {},
    REDUCER_ACTIONS: REDUCER_ACTION_TYPE,
    totalItems: 0,
    totalPrice: ``,
    cart: []
}

export const CartContext = createContext< useCartContextType > ( initCartContextState )

type ChildrenType = {
    children?: ReactElement | ReactElement[]
}

export const CartProvider = ({ children }: ChildrenType): ReactElement => {
    return (
        <CartContext.Provider value={ useCartContext( initCartState ) }>
            { children }
        </CartContext.Provider> 
    )
}

export default CartContext