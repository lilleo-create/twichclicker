const API_BASE = 'https://api.streamcoins.ru';

export const getUserId = () => {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp?.initDataUnsafe?.user?.id) {
    return window.Telegram.WebApp.initDataUnsafe.user.id;
  }

  // Верни null вместо test, если работаешь в Telegram WebView
  return null;
};


export const getUserData = async (userId) => {
  try {
    const res = await fetch(`${API_BASE}/api/user/${userId}`, {
      method: 'GET',
      credentials: 'include',
    });
    if (!res.ok) {
      console.error('Ошибка загрузки данных:', res.status);
      return {};
    }
    return await res.json();
  } catch (err) {
    console.error('❌ Ошибка при получении данных:', err);
    return {};
  }
};

export const saveUserData = async (userId, data) => {
  try {
    const res = await fetch(`${API_BASE}/api/user/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      console.error('Ошибка при сохранении данных:', res.status);
    }
  } catch (err) {
    console.error('❌ Ошибка при сохранении данных:', err);
  }
};
