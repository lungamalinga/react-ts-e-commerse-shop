import { ReactElement, createContext, useState, useEffect } from "react"

export type ProductType = {
    sku: string,
    name: string,
    price: number
}

// const initState: ProductType[] = []

const initState: ProductType[] = [
    {
        "sku": "item001",
        "name": "Widget",
        "price": 9.99,
    },
    {
        "sku": "item002",
        "name": "Premium Widget",
        "price": 19.99
    },
    {
        "sku": "item003",
        "name": "Deluxe Widget",
        "price": 29.99
        
    }
]

export type UseProductsContextType = { products: ProductType[] }
 
const initContextState: UseProductsContextType = { products: [] }
const ProductsContext = createContext < UseProductsContextType > ( initContextState )

// ! creating a children type
type ChildrenType = { children?: ReactElement | ReactElement[] }

export const ProductsProvider = ({ children }: ChildrenType ): ReactElement => {

    const [products, setProducts] = useState< ProductType[] >( initState )

    // !using the useEffect Hook 
    /**
     * * Use the concept below when call an api
     */

    // useEffect( () => {
    //     const fetchProducts = async (): Promise< ProductType[] > => {
            
    //         const data = await fetch( 'http://localhost:3500/products' ). then ( res => {
    //             return res.json();
    //         }).catch ( error => { 
    //             if ( error instanceof Error ) {
    //                 console.log (error.message );
    //             }})
    //             return data;
    //     }

    //     fetchProducts().then( products => setProducts( products ))
        
    // }, [] );

    return (
        <ProductsContext.Provider value={{ products }}>
            
            { children }

        </ProductsContext.Provider>
    )
}

export default ProductsContext