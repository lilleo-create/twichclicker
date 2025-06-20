// controllers/userController.js
const User = require('../models/User');

// Получение данных пользователя
const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ userId: id });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Обновление или создание данных пользователя
const updateUser = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    let user = await User.findOne({ userId: id });

    if (!user) {
      // Создаём нового пользователя
      user = new User({ userId: id, ...updates });
    } else {
      // Обновляем существующего
      Object.assign(user, updates);
    }

    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getUser,
  updateUser,
};
