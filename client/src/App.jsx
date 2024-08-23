import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import { Routes,Route } from 'react-router-dom'
import Dashboard from './Components/Dashboard/Dashboard'
import DashboardMain from './Pages/DashboardMain/DashboardMain'
import AddProduct from './Pages/AddProduct/AddProduct'

const App = () => {
  return (
    <div>
      <Navbar />
      <hr />
      <div className="Login">
      <Dashboard />
      <Routes>
          <Route path="/Dashboardmain" element={<DashboardMain />}/>
          <Route path="/Addproduct" element={<AddProduct />}/>
        
        </Routes>
      </div>
    </div>
  )
}

export default App