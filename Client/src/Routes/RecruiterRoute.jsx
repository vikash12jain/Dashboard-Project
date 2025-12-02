import React from 'react'
import { Route, Routes } from "react-router-dom";
import ProtectRecruiterRoute from '../Components/ProtectRecruiterRoute';
import RecruiterLayout from '../Recruiter/RecruiterLayout';
import RecruiterDashboardPage from '../Recruiter/RecruiterDashboardPage';
import ProductListPage from '../Recruiter/ProductListPage';
import ProductEditPage from '../Recruiter/ProductEditPage';
import ProductCreatePage from '../Recruiter/ProductCreatePage';
import UserListPage from '../Recruiter/UserListPage';
import UserCreatePage from '../Recruiter/UserCreatePage';
import UserEditPage from '../Recruiter/UserEditPage';
import AllOrdersPage from '../Recruiter/AllOrdersPage';
import HomePage from '../Pages/HomePage';
import NotFound404 from '../Pages/NotFound404';

const RecruiterRoute = () => {
  return (<>
  <Routes>
    <Route path="/" element={<ProtectRecruiterRoute />}>
      <Route element={<RecruiterLayout />}>
      <Route index element={<RecruiterDashboardPage />} />
      <Route path="RecruiterDashboard" element={<RecruiterDashboardPage />} />

  
      <Route path="products" element={<ProductListPage />} />
      <Route path="products/create" element={<ProductCreatePage />} />
      <Route path="products/:id/edit" element={<ProductEditPage />} />

     
      <Route path="users" element={<UserListPage />} />
      <Route path="users/create" element={<UserCreatePage />} />
      <Route path="users/:id/edit" element={<UserEditPage />} />

  
      <Route path="All-Orders" element={<AllOrdersPage />} />
      <Route path='*' element={<NotFound404 />} />
</Route>
    </Route>
    </Routes>
      </>
  )
}

export default RecruiterRoute