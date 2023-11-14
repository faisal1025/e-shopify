import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Route, Routes } from 'react-router/dist'
import Home from './pages/Home'
import Header from './components/Header'
import Login from './pages/Login'
import Register from './pages/Register'
import NoPage from './pages/NoPage'
import UserOptions from './pages/UserOptions'
import Cart from './components/cart'
import AddProduct from './components/AddProduct'
import ShowProductDetails from './pages/ShowProductDetails'
import PaymentSuccessPage from './pages/PaymentSuccessPage'
import Order from './components/order'
import WishList from './components/WishList'

export default function App() {
  return (
    <>
      <BrowserRouter>
          <main className='px-20'>
            <Header />
            <Routes>
                <Route exact path='/' element={<Home />}/>
                <Route path='login' element={<Login />} />
                <Route path='register' element={<Register />} />
                <Route path='/:slug/details' element={<ShowProductDetails />} />
                <Route path='/paymentsuccess' element={<PaymentSuccessPage/>} />
                <Route path='/user' element={<UserOptions />}> 
                  <Route path='cart' element={<Cart />} />
                  <Route path='add-products' element={<AddProduct />} />
                  <Route path='orders' element={<Order/>}/>
                  <Route path='wishlists' element={<WishList/>}/>
                </Route>
                <Route path='*' element={<NoPage />} />
            </Routes>
          </main>
      </BrowserRouter>
    </>
  )
}
