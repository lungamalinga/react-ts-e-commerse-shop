import { ReactElement, createContext, useState } from "react"

export type ProductType = {
    sku: string,
    name: string,
    price: number
}

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
const ProductContext = createContext <UseProductsContextType> (initContextState)

// ! creating a children type
type ChildrenType = { children?: ReactElement | ReactElement[] }

export const ProductsProvider = ({ children }: ChildrenType ): ReactElement => {
    
    const [products, setProducts] = useState<ProductType[]>(initState)

    

}
