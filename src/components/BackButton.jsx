import { useNavigate } from 'react-router-dom';

export default function BackButton({ to = '/', label = '⬅ Назад' }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(to)}
      className="mt-8 text-sm underline text-purple-300 hover:text-white transition"
    >
      {label}
    </button>
  );
}
