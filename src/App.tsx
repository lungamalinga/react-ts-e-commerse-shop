import Header from "./components/Header"
import Cart from "./components/Cart"
import Footer from "./components/Footer"
import ProductList from "./components/ProductList"
import { useState } from "react"
import ProductsContext from "./context/ProductProvider"
import Nav from "./components/Nav"

function App() {

  const [viewCart, setViewCart] = useState < boolean > ( false )

  const pageContent = viewCart ? < Cart /> : < ProductList />

  const content = ( 
    <>
      <Header viewCart = { viewCart } setViewCart = { setViewCart } />
      { pageContent }
      <Footer viewCart = { viewCart }/>
    </>
   )

  return (
    content
  )
}

export default App
