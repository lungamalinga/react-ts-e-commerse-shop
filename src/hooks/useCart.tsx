import { useContext } from "react";
import CartContext, { useCartContextType } from "../context/CartProvider";
import { UseProductsContextType } from "../context/ProductProvider";

// ! custom hook

const useCart = (): useCartContextType => {
    return useContext( CartContext )
}

export default useCart