const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Get all products for a company
router.get('/:companyId/products', async (req, res) => {
    const { companyId } = req.params;
    if (!companyId) {
        return res.status(400).json({ message: 'companyId is required' });
    }
    try {
        const products = await Product.find({ companyId });
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Failed to fetch products' });
    }
});

// Get a specific product by ID for a company
router.get('/:companyId/products/:productId', async (req, res) => {
    const { companyId, productId } = req.params;
    if (!companyId || !productId) {
        return res.status(400).json({ message: 'companyId and productId are required' });
    }
    try {
        const product = await Product.findOne({ _id: productId, companyId });
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ message: 'Failed to fetch product' });
    }
});

// Create a new product for a company
router.post('/:companyId/products', async (req, res) => {
    const { name, description, category, sku, price, manufacturer, brand, dimensions, materials, color, image, specifications, features, instructions, warranty, compliance, targetAudience, availability, reviews, shipping, returnPolicy, legalInfo } = req.body;
    const { companyId } = req.params;
  
    if (!companyId) {
        return res.status(400).json({ message: 'companyId is required' });
    }
    if (!name || !price || !sku) {
        return res.status(400).json({ message: 'Name, SKU, and Price are required' });
    }
  
    try {
        const newProduct = new Product({ name, description, category, sku, price, manufacturer, brand, dimensions, materials, color, image, specifications, features, instructions, warranty, compliance, targetAudience, availability, reviews, shipping, returnPolicy, legalInfo, companyId });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ message: 'Failed to add product', error: error.message });
    }
});

// Update an existing product for a company
router.put('/:companyId/products/:productId', async (req, res) => {
    const { companyId, productId } = req.params;
    const updatedData = req.body;

    if (!companyId || !productId) {
        return res.status(400).json({ message: 'companyId and productId are required' });
    }

    try {
        const updatedProduct = await Product.findOneAndUpdate(
            { _id: productId, companyId },
            updatedData,
            { new: true }
        );
        if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
        res.json(updatedProduct);
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Failed to update product', error: error.message });
    }
});

// Delete a product for a company
router.delete('/:companyId/products/:productId', async (req, res) => {
    const { companyId, productId } = req.params;

    if (!companyId || !productId) {
        return res.status(400).json({ message: 'companyId and productId are required' });
    }

    try {
        const result = await Product.findOneAndDelete({ _id: productId, companyId });
        if (!result) return res.status(404).json({ message: 'Product not found' });
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Failed to delete product', error: error.message });
    }
});

module.exports = router;
