import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import CheckoutPage from './Pages/CheckoutPage'
import CartPage from './Pages/CartPage'
import LoginPage from './Pages/LoginPage'
import RegisterPage from './Pages/RegisterPage'
import ProductDetail from './Pages/ProductDetail'
import ProfilePage from './Pages/ProfilePage'
import ProductCreatePage from './Admin/Product/ProductCreatePage'
import ProductListPage from './Admin/Product/ProductListPage'
import ProductEditPage from './Admin/Product/ProductEditPage'
import AdminLayout from './Admin/AdminLayout'
import UserCreatePage from './Admin/Users/UserCreatePage'
import UserEditPage from './Admin/Users/UserEditPage'
import UserListPage from './Admin/Users/UserListPage'
import AdminDashboardPage from './Pages/AdminPage'
import ProtectAdminRoute from './Components/ProtectAdminRoute'
import Forbidden403 from './Pages/Forbidden403'
import NotFound404 from './Pages/NotFound404'
import AllOrdersPage from './Pages/AllOrdersPAge'

function App() {

  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/cart' element={<CartPage />} />
      <Route path='/product-detail' element={<ProductDetail />} />
      <Route path='/checkout' element={<CheckoutPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/profile' element={<ProfilePage />} />

      <Route path="/403" element={<Forbidden403 />} />

      <Route path="/admin" element={<ProtectAdminRoute />}>
        <Route element={<AdminLayout />} />
        <Route index element={<AdminDashboardPage />} />
        <Route path='AdminDashboard' element={<AdminDashboardPage />} />
        <Route path='products' element={<ProductListPage />} />
        <Route path='products/create' element={<ProductCreatePage />} />
        <Route path='products/:id/edit' element={<ProductEditPage />} />
        <Route path='users/create' element={<UserCreatePage />} />
        <Route path='users/:id/edit' element={<UserEditPage />} />
        <Route path='users' element={<UserListPage />} />
        <Route path='All-Orders' element={<AllOrdersPage />} />
      </Route>
      <Route path='*' element={<NotFound404/>}/>
    </Routes>
  )
}

export default App