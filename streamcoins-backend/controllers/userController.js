import User from '../models/User.js';

// Получение данных по userId
export const getUser = async (req, res) => {
  const { id } = req.params;

  try {
    let user = await User.findOne({ userId: id });

    if (!user) {
      user = await User.create({ userId: id });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка сервера' });
  }
};

// Обновление очков и прогресса
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { coins, upgrades, progress } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { userId: id },
      {
        coins,
        upgrades,
        progress,
        lastVisit: new Date()
      },
      { new: true, upsert: true }
    );

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка обновления' });
  }
};
