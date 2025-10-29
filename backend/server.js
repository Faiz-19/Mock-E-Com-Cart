import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './db.js';
import apiRoutes from './routes/api.js';
import Product from './models/Product.js';

// Connect to Database
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // for parsing application/json

// API Routes
app.use('/api', apiRoutes);

// Seed Database Function
const seedDatabase = async () => {
  try {
    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      console.log('No products found. Seeding database...');
      const mockProducts = [
        { name: "Aura Wireless Headphones", price: 199.99, image: "https://picsum.photos/id/1080/300/300" },
        { name: "Quantum-Core Smartwatch", price: 249.99, image: "https://picsum.photos/id/119/300/300" },
        { name: "Nebula Gaming Mouse", price: 89.99, image: "https://picsum.photos/id/48/300/300" },
        { name: "Echo-Base VR Headset", price: 399.99, image: "https://picsum.photos/id/180/300/300" },
        { name: "Volt-Charge Power Bank", price: 49.99, image: "https://picsum.photos/id/26/300/300" },
        { name: "Cyber-Stream Webcam", price: 129.99, image: "https://picsum.photos/id/29/300/300" },
      ];
      await Product.insertMany(mockProducts);
      console.log('Database seeded with mock products.');
    }
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  seedDatabase(); // Check and seed DB on server start
});