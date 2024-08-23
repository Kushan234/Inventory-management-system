import React from 'react'
import './dashboard.css'
import { NavLink } from 'react-router-dom'
import layout from '../../assets/Assests/layout.png'
import add from '../../assets/Assests/add.png'

const Dashboard = () => {
  return (
    <div className='sidebar'>
        <div className="sidebar-options">
            <NavLink to='/Dashboardmain' className="sidebar-option"> 
            <img src={layout} alt="" />   
                <p>Dashboard</p>
            </NavLink>
            <NavLink to='/Addproduct' className="sidebar-option">
            <img src={add} alt="" />
                <p>Add Product</p>
            </NavLink>
        </div>
    </div>
  )
}

export default Dashboard