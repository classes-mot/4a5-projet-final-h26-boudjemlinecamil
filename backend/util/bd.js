import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/recettes-app');
    console.log('Connexion BD réussie!');
  } catch (err) {
    console.log('Connexion BD échouée', err);
  }
};

export { connectDB };