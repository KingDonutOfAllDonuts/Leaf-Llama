const QuantitySelector = ({ value, onChange }) => {
  const handleDecrease = () => {
    if (value > 1) onChange(value - 1);
  };

  const handleIncrease = () => {
    if (value < 10) onChange(value + 1);
  };

  return (
    <div className="flex items-center justify-center space-x-4">
      {/* Decrease Button */}
      <button
        onClick={handleDecrease}
        className="w-10 h-10 flex items-center justify-center rounded-full border border-green-500 text-green-800 hover:border-green-600 hover:text-green-900 hover:border-2 transition"
        disabled={value <= 1}
      >
        &#8722;
      </button>

      {/* Quantity Display */}
      <span className="text-xl font-semibold text-gray-800">{value}</span>

      {/* Increase Button */}
      <button
        onClick={handleIncrease}
        className="w-10 h-10 flex items-center justify-center rounded-full border border-green-500 text-green-800 hover:border-green-600 hover:text-green-900 hover:border-2 transition"
      >
        &#43;
      </button>
    </div>
  );
};

export default QuantitySelector