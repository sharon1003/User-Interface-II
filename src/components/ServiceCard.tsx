import "./ServiceCard.css"; // optional

type ServiceCardProps = {
  icon: string;
  title: string;
  description: string;
  price: string;
  onReadMore?: () => void;
};

const ServiceCard = ({
  icon,
  title,
  description,
  price,
  onReadMore,
}: ServiceCardProps) => {
  return (
    <div className="service-card bg-white rounded-xl p-6 shadow hover:shadow-md transition">
      <h2 className="text-xl font-semibold mb-2">
        {icon} {title}
      </h2>
      <p className="text-gray-700 mb-3">{description}</p>
      <p className="text-green-700 font-bold mb-4">{price}</p>
      <button
        onClick={onReadMore}
        className="text-sm text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded transition"
      >
        Read More
      </button>
    </div>
  );
};

export default ServiceCard;
