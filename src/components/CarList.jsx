import React, { useEffect, useState } from 'react';
import api, { BACKEND } from "../Util/api";
const CarList = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/cars') // thanks to proxy, this goes to http://localhost:5000/api/cars
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch cars');
                }
                return response.json();
            })
            .then((data) => {
                setCars(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching cars:', error);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading car data...</p>;

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Car List</h2>
            <ul className="space-y-2">
                {cars.map((car) => (
                    <li key={car._id} className="border p-3 rounded shadow">
                        <strong>{car.brand}</strong> - {car.model} - Rs. {car.price}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CarList;
