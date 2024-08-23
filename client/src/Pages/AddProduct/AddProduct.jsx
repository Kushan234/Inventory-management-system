import React, { useEffect, useState } from 'react'
import './addProduct.css'
import upload_area from '../../assets/Assests/upload.png'

const AddProduct = ({ product: initialProduct, onProductAdded }) => {

    const [product,setProduct]=useState({
        name:"",
        description:"",
        price:"",
        quantity:"",
        category:"",
        image:"",
    })
    
        useEffect(() => {
        if (initialProduct) {
          setProduct(initialProduct);
        }
      }, [initialProduct]);

    const handleChange = (e) =>{
        const {name,value} = e.target;
        setProduct({...product,[name]:value});
    };

    const handlefileChange = (e) =>{
        const file=e.target.files[0];
        if(file){
            const reader = new FileReader();
            reader.onloadend =()=>{
                setProduct({...product, image:reader.result});
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const method = initialProduct ? 'PUT' : 'POST';
        const url = initialProduct
          ? `http://localhost:5000/api/products/${initialProduct.id}`
          : 'http://localhost:5000/api/products';


        try{
            const response = await fetch(url, {
                method,
                headers: {
                  'Content-Type': 'application/json',
                },
                body:JSON.stringify(product),
            });
            if(response.ok){
                alert('Product add successfully!');
                setProduct({
                    name: "",
                    description: "",
                    price: "",
                    quantity: "",
                    category: "",
                    image: "",
                });
                onProductAdded();
            }else{
                alert("failed");
            }
        }catch(error){
            console.log("error:", error);
            
        }
    };


  return (
    <div className='addProduct'>
    <h1>{initialProduct ? 'Edit Product' : 'Add Product'}</h1>
    
    <div className="addproduct-itemfield">
        <p>Product Name</p>
        <input  type="text" name='name' placeholder='Type here' value={product.name} onChange={handleChange}/>
    </div>
    <div className="addproduct-price">
        <div className="addproduct-itemfield">
            <p>Description</p>
            <input  type="text"  name='description' placeholder='Type here' value={product.description} onChange={handleChange}/>
        </div>
        <div className="addproduct-itemfield">
            <p>Price</p>
            <input  type="Number"  name='price' placeholder='Type here' value={product.price} onChange={handleChange}/>
        </div>
        <div className="addproduct-itemfield">
            <p>Quantity</p>
            <input  type="text"  name='quantity' placeholder='Type here' value={product.quantity} onChange={handleChange}/>
        </div>
    </div>

    
    <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select name='category' className='addproduct-selector' value={product.category} onChange={handleChange}>
            <option value="desktop">Desktopcomputers</option>
            <option value="laptop">Laptops</option>
            <option value="Processors">Processors</option>
            <option value="G-card">Graphic card</option>
            <option value="Monitors">Monitors</option>
        </select>
    </div>
    <div className="addproduct-itemfield">
        <label htmlFor='file-input'>
            <img src={upload_area}  className='addproduct-thumnail-img' alt="" />
        </label>
        <input type="file" name='image' id='file-input' hidden onChange={handlefileChange}/>
    </div>
    <button className='addproduct-btn' type='submit' onClick={handleSubmit}> {initialProduct ? 'Update' : 'Add'}</button>
</div>
  )
}

export default AddProduct