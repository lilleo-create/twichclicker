<<<<<<< HEAD
const API_BASE = 'https://preeminent-biscotti-993d1b.netlify.app/';

export const getUserData = async (userId) => {
  const res = await fetch(`${API_BASE}/api/user/${userId}`);
=======
const API_BASE = 'https://streamcoins.ru';


export const getUserData = async (userId) => {
  const res = await fetch(`https://streamcoins.ru/api/user/${userId}`);
>>>>>>> HEAD@{1}
  if (!res.ok) {
    console.error('Ошибка загрузки данных:', res.status);
    return {};
  }
  return res.json();
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
