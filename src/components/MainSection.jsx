import Counter from './Counter';
import ClickButton from './ClickButton';
import './MainSection.css';

function MainSection({ coins, onClick}) {
  return (
    <section className="main-section">
      <Counter coins={coins} />
      <ClickButton handleClick={onClick} />
    </section>
  );
}

export default MainSection;
