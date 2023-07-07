import  React from 'react'
import { Routes, Route } from 'react-router-dom';
import { Login as LoginPage } from './components/Auth/Login'
import { Signup as Register } from './components/Auth/Register'

function App() {
  return (
    <Routes>
      	<Route path="/" element={<Layout>Home</Layout>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginPage />} />
        
    </Routes>
  )
}

export default App;
