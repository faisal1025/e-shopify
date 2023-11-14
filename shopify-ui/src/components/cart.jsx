import React from 'react'
import { Box, Button, Card, CardActions, CardContent, CardHeader, IconButton, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import RenderItem from './RenderItem'
import emptyCart from '../assets/home/empty-cart.jpg'
import { add, remove, addCartItem } from '../services/product/cartSlice'
import { checkout } from '../services/product/orderSlice'
import DeleteIcon from '@mui/icons-material/Delete';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Cart = () => {
  const {cartItems, totalAmount} = useSelector(store => store.cart)
  const {isLoading, data} = useSelector(store => store.order)
  const {user} = useSelector(store => store.user)
  const dispatch = useDispatch()

  const handleCheckout = async (totalAmount) => {
    const {payload:{order, key}} = await dispatch(checkout(totalAmount))
    console.log("#handleCheckout", order, key);
    const options = {
        key: key, // Enter the Key ID generated from the Dashboard
        amount: (order.amount*100), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "E-Shopify",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        callback_url: `${BASE_URL}/api/product/paymentVerification?id=${user.id}`,
        prefill: {
            "name": user.first_name+user.last_name,
            "email": user.email,
            "contact": "9000090000"
        },
        notes: {
            "address": "Razorpay Corporate Office"
        },
        theme: {
            "color": "#121212"
        }
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  }

  return (
    <>
        <Card className='w-full min-h-screen relative' variant="outlined">
          <CardHeader title={'My Cart'}/>
          <CardContent>
            <ul className='space-y-4'>
              {
                cartItems.length === 0 ? 
                  <div className='flex h-96 justify-center items-center'>
                    <img src={emptyCart} width={300} alt='empty-cart'/>
                  </div>
                :
                  (<div className='cart-main flex flex-row justify-between gap-12'>
                    <div className="w-3/5 overflow-y-scroll h-96">
                    {
                      cartItems.map((product, ind) => {
                        let item = product.productId
                        return(
                           <div className="flex py-5 gap-3 md:gap-5 border-b">
                              {/* IMAGE START */}
                              <div className="shrink-0 aspect-square w-[50px] md:w-[120px]">
                                  <img
                                      width={120} 
                                      height={120} 
                                      src={`${BASE_URL}/${item.thumbnail}`} 
                                      alt={item.name} 
                                  />
                              </div>
                              {/* IMAGE END */}
               
                              <div className="w-full flex flex-col">
                                  <div className="flex flex-col md:flex-row justify-between">
                                      {/* PRODUCT TITLE */}
                                      <div className="text-lg md:text-2xl font-semibold text-black/[0.8]">
                                          {item.name}
                                      </div>
                  
                                      {/* PRODUCT SUBTITLE */}
                                      <div className="text-sm md:text-md font-medium text-black/[0.5] block md:hidden">
                                          {item.subTitle}
                                      </div>
                  
                                      {/* PRODUCT PRICE */}
                                      <div className="text-sm md:text-md font-bold text-black/[0.5]">
                                          MRP : &#8377;{item.price}
                                      </div>
                                  </div>
                  
                                  {/* PRODUCT SUBTITLE */}
                                  <div className="text-md font-medium text-black/[0.5] hidden md:block">
                                      {item.subTitle}
                                  </div>
                                  
                                  <div className="flex flex-row justify-between">
                                        <div className="flex items-center gap-1">
                                              <div className="font-semibold">Quantity:</div>
                                              <select
                                                  className="hover:text-black"
                                                  onChange={(e) => {}}
                                              >
                                                  {Array.from(
                                                      { length: 50 },
                                                      (_, i) => i + 1
                                                  ).map((q, i) => {
                                                      return (
                                                          <option
                                                              key={i}
                                                              value={q}
                                                              //  selected={data.quantity === q}
                                                          >
                                                              {q}
                                                          </option>
                                                      );
                                                  })}
                                              </select>
                                        </div>
                                        <IconButton fullWidth onClick={()=>{dispatch(remove({item, ind}))}}>
                                          <DeleteIcon fontSize='small' />
                                        </IconButton>
                                  </div>
                                  {/* <div className="flex items-center justify-between mt-4">
                                      <div className="flex items-center gap-2 md:gap-10 text-black/[0.5] text-sm md:text-md">
                                          <div className="flex items-center gap-1">
                                              <div className="font-semibold">Size:</div>
                                              <select
                                                  className="hover:text-black"
                                                  onChange={(e) =>
                                                      updateCartItem(e, "selectedSize")
                                                  }
                                              >
                                                  {p.size.data.map((item, i) => {
                                                      return (
                                                          <option
                                                              key={i}
                                                              value={item.size}
                                                              disabled={
                                                                  !item.enabled ? true : false
                                                              }
                                                              selected={
                                                                  data.selectedSize === item.size
                                                              }
                                                          >
                                                              {item.size}
                                                          </option>
                                                      );
                                                  })}
                                              </select>
                                          </div>
                  
                                          <div className="flex items-center gap-1">
                                              <div className="font-semibold">Quantity:</div>
                                              <select
                                                  className="hover:text-black"
                                                  onChange={(e) => updateCartItem(e, "quantity")}
                                              >
                                                  {Array.from(
                                                      { length: 10 },
                                                      (_, i) => i + 1
                                                  ).map((q, i) => {
                                                      return (
                                                          <option
                                                              key={i}
                                                              value={q}
                                                              selected={data.quantity === q}
                                                          >
                                                              {q}
                                                          </option>
                                                      );
                                                  })}
                                              </select>
                                          </div>
                                      </div>
                                      <RiDeleteBin6Line
                                          onClick={() =>
                                              dispatch(removeFromCart({ id: data.id }))
                                          }
                                          className="cursor-pointer text-black/[0.5] hover:text-black text-[16px] md:text-[20px]"
                                      />
                                  </div> */}
                              </div> 
                       </div>
                        )
                      })
                    }
                    </div>
                    <div className="w-2/5">
                      {/* SUMMARY START */}
                      <div className="flex-[1]">
                        <div className="text-lg font-bold">Summary</div>

                        <div className="p-5 my-5 bg-black/[0.05] rounded-xl">
                            <div className="flex justify-between">
                                <div className="uppercase text-md md:text-lg font-medium text-black">
                                    Subtotal
                                </div>
                                <div className="text-md md:text-lg font-medium text-black">
                                    &#8377;{totalAmount}
                                </div>
                            </div>
                            <div className="text-sm md:text-md py-5 border-t mt-5">
                                The subtotal reflects the total price of
                                your order, including duties and taxes,
                                before any applicable discounts. It does
                                not include delivery costs and
                                international transaction fees.
                            </div>
                        </div>

                        {/* BUTTON START */}
                        <button
                            className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 flex items-center gap-2 justify-center"
                            onClick={()=>{handleCheckout(totalAmount)}}
                        >
                            Checkout
                            {isLoading && <img src="/spinner.svg" />}
                        </button>
                        {/* BUTTON END */}
                      </div>
                      {/* SUMMARY END */}
                    </div>
                  </div>)
              }
            </ul>
          </CardContent>
          <CardActions disableSpacing>
            {/* <Box component={'div'} className='w-4/5 flex justify-evenly absolute bottom-0 bg-white p-2'>
                <Typography component={'h1'} variant='h5'>Total Amount : ${totalAmount}</Typography>
                <Button variant='outlined' color='primary'>PLace Orders</Button>
            </Box> */}
          </CardActions>
        </Card>
    </>
  )
}

export default Cart
