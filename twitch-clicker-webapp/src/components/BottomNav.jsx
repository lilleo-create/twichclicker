import './BottomNav.css';
import achievementIcon from "../assets/achievement.png";
import shoppingCart from "../assets/shopping-cart.png";
import bonus from "../assets/bonus.png";
import settings from "../assets/settings.png";

function BottomNav() {
  return (
    <div className="bottom-nav">
      <button>
        <img src={achievementIcon} alt="Achievements" className="nav-icon" />
      </button>
      <button>
        <img src={shoppingCart} alt="Cart" className='nav-icon' />
      </button>
      <button>
        <img src={bonus} alt="Cart" className='nav-icon' />
        </button>
      <button>
        <img src={settings} alt="Cart" className='nav-icon' />
        </button>
    </div>
  )
}

export default BottomNav
