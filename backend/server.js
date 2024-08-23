const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://InventoryProject:Inventory1999@cluster0.5ymu5.mongodb.net/?', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    quantity: Number,
    category: String,
    image: String,
});

const Product = mongoose.model('Product', productSchema);

app.post('/api/products', async (req, res) => {
    const product = new Product(req.body);
    try {
        await product.save();
        res.status(201).send(product);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.send(products);
    } catch (error) {
        res.status(500).send(error);
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




app.delete('/api/products/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await Product.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).send({ message: 'Product not found' });
        }

        res.status(200).send({ message: 'Product deleted success' });
    } catch (error) {
        console.error('Error deleting product: ', error);
        res.status(500).send({ message: 'Server error' });
    }
});