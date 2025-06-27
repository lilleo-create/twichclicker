
function Counter({ coins }) {
  return (
    <div className="text-white text-center">
      <h1 className="text-4xl font-bold">{coins}</h1>
      <p className="text-sm opacity-80">Hype Points</p>
    </div>
  );
}

export default Counter;
