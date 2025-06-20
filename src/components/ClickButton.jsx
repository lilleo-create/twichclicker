const ClickButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 hover:bg-blue-700 text-white text-3xl font-bold py-4 px-8 rounded-full shadow-lg active:scale-95 transition-transform"
    >
      😄
    </button>
  );
};

export default ClickButton;
