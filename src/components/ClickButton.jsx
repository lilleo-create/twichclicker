import './ClickButton.css';
import ButtonClick from "../assets/ButtonClick.png";

function ClickButton({ handleClick }) {
  return (
    <button className="click-button" onClick={handleClick}>
      <img src={ButtonClick} alt="shoppingCart" className='image-click'/>
    </button>
  )
}

export default ClickButton
