import { motion } from 'framer-motion';
import './Shop.css';
import { Link } from 'react-router-dom';

const upgrades = [
  { name: "Webcam", price: 50, icon: "📷" },
  { name: "Mic", price: 80, icon: "🎤" },
  { name: "Chair", price: 120, icon: "🪑" },
  { name: "Monitor", price: 150, icon: "🖥️" },
  { name: "Router", price: 90, icon: "📡" },
];

function Shop() {
  return (
    <motion.div
      className="shop-page"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="shop-title">🛒 Shop</h1>

      <div className="upgrades-grid">
        {upgrades.map((item, index) => (
          <div key={index} className="upgrade-card">
            <div className="icon">{item.icon}</div>
            <div className="name">{item.name}</div>
            <div className="price">{item.price} pts</div>
            <button className="buy-btn">Buy</button>
          </div>
        ))}
      </div>

      <Link to="/" className="back-btn">⬅ Back</Link>
    </motion.div>
  );
}

export default Shop;
