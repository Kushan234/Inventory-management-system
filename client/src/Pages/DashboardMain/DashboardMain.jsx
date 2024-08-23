import React, { useEffect, useState } from 'react'
import './dashboardMain.css'
import cart from '../../assets/Assests/shopping-cart.png'
import coin from '../../assets/Assests/coin.png'
import outstock from '../../assets/Assests/empty-cart.png'
import search from '../../assets/Assests/search.png'
import AddProduct from '../AddProduct/AddProduct'
import update from '../../assets/Assests/application.png'
import deleting from '../../assets/Assests/delete.png'


const DashboardMain = () => {

  const[products,setProducts]=useState([]);
  const [showForm, setShowForm] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');


 
    const fetchProducts = async ()=>{
      try{
        const response = await fetch('http://localhost:5000/api/products');
        const data = await response.json();
        setProducts(data);  
    }catch(error){
      console.error("Error fetching products: ",error);
    }      
  };
  useEffect(()=>{
    fetchProducts();

},[]);

const handleEditClick = (product) => {
  setProductToEdit(product); 
  setShowForm(true); 
};

const handleDeleteClick = async (productId) => {
  if (window.confirm('Are you sure you want to delete this product?')) {
      try {
          const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
              method: 'DELETE',
              headers: {
                  'Content-Type': 'application/json',
              },
          });

          if (response.ok) {
              setProducts(products.filter((product) => product._id !== productId));
              alert('Product deleted successfully!');
          } else {
              const errorMessage = await response.text();
              alert(`Failed to delete the product: ${errorMessage}`);
          }
      } catch (error) {
          console.error('Error deleting product: ', error);
          alert('Error deleting the product');
      }
  }
};

  const totalStockValue = products.reduce((acc,product)=>acc+(product.price*product.quantity),0);
  const outofStockValue = products.filter(product=>product.quantity === 0).length;

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <div className='dashboardMain'>
        <h1>Inventory Status</h1>
        <hr/>
        <div className="dashboard-top">
          <div className="dashoard-top-cat">
          <div className="dashboard-top-category">
            <img src={cart} alt="" />
            <h3>Total Products</h3>
            <p>{products.length}</p>
          </div>
          <div className="dashboard-top-category">
            <img src={coin} alt="" />
            <h3>Total Stock Value</h3>
            <p>$ {totalStockValue}</p>
          </div>
          <div className="dashboard-top-category">
            <img src={outstock} alt="" />
            <h3>Out of stock</h3>
            <p>{outofStockValue}</p>
          </div>
          </div>
        </div>
        <hr />
        <div className="dashboard-bottom">
        <div className="dashboard-bottom-main">
          <h1>Inventory Items</h1>
          <input type="text" id="search" placeholder='Search by name'  value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)}/>
          <img src={search} alt="" />
        </div>
        <div className="dashboard-bottom-main-list">
          <p>Product Name</p>
          <p>Category</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Value</p>
          <p>Action</p>
        </div>
        <div className="dashboard-bottom-main-list-listProduct ">
     <hr />
          {filteredProducts.map((product)=>(
             <div key={product._id} className="dashboard-bottom-main-list-item">
             <p>{product.name}</p>
             <p>{product.category}</p>
             <p>${product.price}</p>
             <p>{product.quantity}</p>
             <p>${product.price * product.quantity}</p>
             <p>
             <img src={update} alt="" className='update'onClick={() =>handleEditClick(product)}/>
             <img src={deleting} alt="" className='delete' onClick={() => handleDeleteClick(product._id)}/></p>
           </div>
          ))}
        </div>
    </div>
    {showForm && (
          <div className="fetch-products">
    <AddProduct product={productToEdit} onProductAdded={fetchProducts} />
    </div>
    )}
    </div>
  )
}

export default DashboardMain