import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { saveUserData } from '../api/api';

function Shop({ coins, setCoins, userId }) {
  const upgrades = [
    { name: "Webcam", price: 50, icon: "📷" },
    { name: "Mic", price: 80, icon: "🎤" },
    { name: "Chair", price: 120, icon: "🪑" },
    { name: "Monitor", price: 150, icon: "🖥️" },
    { name: "Router", price: 90, icon: "📡" },
  ];

  const handleBuy = (item) => {
    if (coins < item.price) return;
    const newCoins = coins - item.price;
    setCoins(newCoins);
    saveUserData(userId, { coins: newCoins });
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-purple-900 to-purple-700 text-white p-4 flex flex-col items-center gap-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold">🛒 Shop</h1>

      <div className="text-white text-sm mb-2">Ваш баланс: <b>{coins} pts</b></div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full max-w-md">
        {upgrades.map((item, index) => (
          <div
            key={index}
            className="bg-purple-800 p-4 rounded-xl shadow-lg flex flex-col items-center text-center"
          >
            <div className="text-4xl">{item.icon}</div>
            <div className="mt-2 font-semibold">{item.name}</div>
            <div className="text-sm text-purple-300">{item.price} pts</div>
            <button
              onClick={() => handleBuy(item)}
              disabled={coins < item.price}
              className={`mt-3 px-4 py-1 rounded font-bold transition ${
                coins < item.price
                  ? 'bg-gray-500 text-white cursor-not-allowed'
                  : 'bg-white text-purple-800 hover:bg-purple-100'
              }`}
            >
              Buy
            </button>
          </div>
        ))}
      </div>

      <Link
        to="/"
        className="text-sm mt-6 underline text-purple-200 hover:text-white transition"
      >
        ⬅ Back
      </Link>
    </motion.div>
  );
}

export default Shop;
