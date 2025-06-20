import { Link } from "react-router-dom";

const BottomNav = () => {
  return (
    <nav className="w-full flex justify-around items-center py-2 bg-black/40 fixed bottom-0 backdrop-blur-md z-10">
      <Link to="/" className="text-white text-xl hover:scale-110 transition-transform">🏠</Link>
      <Link to="/shop" className="text-white text-xl hover:scale-110 transition-transform">🛒</Link>
      <button className="text-white text-xl hover:scale-110 transition-transform">⚙️</button>
    </nav>
  );
};

export default BottomNav;
