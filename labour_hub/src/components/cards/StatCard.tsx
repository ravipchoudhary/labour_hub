type Props = {
    title: string;
    value: string;
};

const StatCard = ({ title, value }: Props) => {
    return (
        <div className="bg-white p-4 rounded-xl border hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center">
            <p className="text-gray-500 text-sm">{title}</p>
            <h2 className="text-2xl font-bold">{value}</h2>
        </div>
    );
};

export default StatCard;