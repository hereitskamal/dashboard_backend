const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const companyRoutes = require('./routes/RegisteredCompany'); // Correct path to company routes
const moduleRoutes = require('./routes/Module'); // Correct path to module routes
const authRoutes = require('./routes/authRoutes'); // Correct path to auth routes
const userRoutes = require('./routes/userRoutes'); // Correct path to user routes
const productRoutes = require('./routes/productRoutes'); // Added path to product routes
const eventRoutes = require('./routes/eventRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('Server is running...');
});

app.use('/api/registeredCompanies', companyRoutes);
app.use('/api/modules', moduleRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);  
app.use('/api/products', productRoutes);  
app.use('/api/events', eventRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
