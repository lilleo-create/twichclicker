import './BottomNav.css';
import achievementIcon from "../assets/achievement.png";
import shoppingCart from "../assets/shopping-cart.png";
import bonus from "../assets/bonus.png";
import settings from "../assets/settings.png";
import { Link } from 'react-router-dom';

function BottomNav() {
  return (
    <div className="bottom-nav">
      <button>
        <img src={achievementIcon} alt="Achievements" className="nav-icon" />
      </button>

      <Link to="/shop">
        <img src={shoppingCart} alt="Shop" className="nav-icon" />
      </Link>

      <button>
        <img src={bonus} alt="Bonus" className="nav-icon" />
      </button>

      <button>
        <img src={settings} alt="Settings" className="nav-icon" />
      </button>
    </div>
  )
}

export default BottomNav;
