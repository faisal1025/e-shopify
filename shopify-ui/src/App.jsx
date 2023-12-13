import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Route, Routes } from 'react-router/dist'
import Home from './pages/Home'
import Header from './components/Header'
import Login from './pages/Login'
import Register from './pages/Register'
import NoPage from './pages/NoPage'
import MenuOptions from './pages/MenuOptions'
import Cart from './components/user-menu/cart'
import AddProduct from './components/user-menu/AddProduct'
import ShowProductDetails from './pages/ShowProductDetails'
import PaymentSuccessPage from './pages/PaymentSuccessPage'
import Order from './components/user-menu/order'
import WishList from './components/user-menu/WishList'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CategoryProducts from './pages/CategoryProducts'
import SearchResult from './pages/SearchResult'
import InventoryProducts from './components/user-menu/InventoryProducts'
import InventoryCategory from './components/user-menu/InventoryCategory'
import InventoryUser from './components/user-menu/InventoryUser'

export default function App() {
  return (
    <>
      <BrowserRouter>
          <main className='px-20'>
            <Header />
            <ToastContainer position={'bottom-right'} />
            <Routes>
                <Route exact path='/' element={<Home />}/>
                <Route path='login' element={<Login />} />
                <Route path='register' element={<Register />} />
                <Route path='/:category/products' element={<CategoryProducts />} />
                <Route path='/:slug/details' element={<ShowProductDetails />} />
                <Route path='/paymentsuccess' element={<PaymentSuccessPage/>} />
                <Route path='/display-search-result' element={<SearchResult/>} />
                <Route path='/user' element={<MenuOptions />}> 
                  <Route path='cart' element={<Cart />} />
                  <Route path='add-products' element={<AddProduct />} />
                  <Route path='orders' element={<Order/>}/>
                  <Route path='wishlists' element={<WishList/>}/>
                  <Route path='inventory/products' element={<InventoryProducts/>}/>
                  <Route path='inventory/categories' element={<InventoryCategory/>}/>
                  <Route path='inventory/users' element={<InventoryUser/>}/>
                </Route>
                <Route path='*' element={<NoPage />} />
            </Routes>
          </main>
      </BrowserRouter>
    </>
  )
}
