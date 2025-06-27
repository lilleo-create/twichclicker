export const getUserData = async (userId) => {
  const res = await fetch(`https://streamcoins.ru/api/user/${userId}`);
  if (!res.ok) {
    console.error('Ошибка загрузки данных:', res.status);
    return {};
  }
  return res.json();
};

export const getUserId = () => {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp?.initDataUnsafe?.user?.id) {
    return window.Telegram.WebApp.initDataUnsafe.user.id;
  }
  return 'test'; // fallback для браузера
};


export const saveUserData = async (userId, data) => {
  await fetch(`${API_BASE}/api/user/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
};
