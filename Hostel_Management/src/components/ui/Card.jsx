const Card = ({ title, value }) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">

      <h3 className="text-gray-500 text-sm">
        {title}
      </h3>

      <p className="text-2xl font-bold mt-2 text-blue-600">
        {value}
      </p>

    </div>
  );
};

export default Card;