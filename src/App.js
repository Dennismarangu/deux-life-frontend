import  React from 'react'
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout'; // Import the Layout component
import { Login as LoginPage } from './components/Auth/Login'
import { Signup as Register } from './components/Auth/Register'
import Profile from './components/Auth/Profile';

function App() {
  return (
    <Routes>
      	<Route path="/" element={<Layout>Home</Layout>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path='/profile' element={<Profile />} />
    </Routes>
  )
}

export default App;
