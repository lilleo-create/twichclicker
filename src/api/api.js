// utils/api.js
export const saveUserData = async (userId, data) => {
  await fetch(`http://178.20.208.231:5000/api/user/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
};


// src/api/api.js
export const getUserData = async (userId) => {
  const res = await fetch(`http://178.20.208.231:5000/api/user/${userId}`);
  if (!res.ok) {
    console.error('Ошибка загрузки данных:', res.status);
    return {};
  }
  return res.json();
};
