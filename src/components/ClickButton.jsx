import './ClickButton.css';


function ClickButton({ handleClick }) {
  return (
    <button className="click-button" onClick={handleClick}>
      😊
    </button>
  )
}

export default ClickButton
