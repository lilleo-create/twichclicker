import React from 'react';
import { motion } from 'framer-motion';
import { saveUserData } from '../api/api';
import { UPGRADE_CONFIG } from '../config/upgradesConfig';
import { useNavigate } from 'react-router-dom';
import BackButton from './BackButton.jsx';

function getUpgradePrice(upgrade, quantity) {
  return Math.floor(upgrade.basePrice * Math.pow(upgrade.priceMultiplier, quantity));
}

export default function Shop({ coins, setCoins, userId, upgrades, setUpgrades }) {
  const navigate = useNavigate();

  const handleBuy = (upgrade) => {
    const quantity = upgrades[upgrade.id] || 0;
    const cost = getUpgradePrice(upgrade, quantity);
    if (coins < cost) return;

    const newQuantity = quantity + 1;
    const newCoins = coins - cost;
    const newUpgrades = {
      ...upgrades,
      [upgrade.id]: newQuantity,
    };

    setCoins(newCoins);
    setUpgrades(newUpgrades);

    saveUserData(userId, {
      coins: newCoins,
      upgrades: newUpgrades,
    })
      .then(() => {
        console.log('✅ Сохранение успешно', { coins: newCoins, upgrades: newUpgrades });
      })
      .catch((err) => {
        console.error('❌ Ошибка при сохранении:', err);
      });
    }

  return (
    <motion.div
      className="min-h-screen bg-black/50 text-white px-4 py-6 font-sans flex flex-col items-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-2xl font-bold mb-6 text-center">🛒 Магазин апгрейдов</h2>

      <div className="flex flex-col gap-4 w-full max-w-md">
        {UPGRADE_CONFIG.map((upgrade) => {
          const quantity = upgrades[upgrade.id] || 0;
          const price = getUpgradePrice(upgrade, quantity);
          const isBought = !upgrade.stackable && quantity > 0;

          return (
            <div
              key={upgrade.id}
              className="border border-gray-600 bg-black/40 p-4 rounded-md shadow"
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-lg font-semibold">{upgrade.name}</div>
                  <div className="text-sm text-gray-400">
                    Уровень: {quantity} | +{upgrade.clickBonus} к клику
                  </div>
                </div>
                <button
                  disabled={isBought || coins < price}
                  onClick={() => handleBuy(upgrade)}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded disabled:opacity-50 text-sm"
                >
                  {isBought ? 'Куплено' : `Купить за ${price}`}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <BackButton to="/" label="⬅ Назад в игру" />
    </motion.div>
  );
}
