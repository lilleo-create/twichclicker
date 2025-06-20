const ClickButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-32 h-24 text-5xl bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg">
      😄
    </button>
  );
};

export default ClickButton;
