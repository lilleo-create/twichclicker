import './BottomNav.css';
import achievementIcon from "../assets/achievement.png";
import shoppingCart from "../assets/shopping-cart.png";
import bonus from "../assets/bonus.png";
import settings from "../assets/settings.png";
import { Link } from 'react-router-dom';

function BottomNav() {
  return (
    <div className="bottom-nav">
      <Link to="#">
        <img src={achievementIcon} alt="Achievements" className="nav-icon" />
      </Link>

      <Link to="/shop">
        <img src={shoppingCart} alt="Shop" className="nav-icon" />
      </Link>

      <Link to="#">
        <img src={bonus} alt="Bonus" className="nav-icon" />
      </Link>

      <Link to="#">
        <img src={settings} alt="Settings" className="nav-icon" />
      </Link>
    </div>
  )
}

export default BottomNav;
