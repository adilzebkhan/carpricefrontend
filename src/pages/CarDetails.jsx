import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const CarDetails = () => {
    const { id } = useParams();
    const [car, setCar] = useState(null);

    useEffect(() => {
        // axios.get(`http://localhost:5000/api/cars/${id}`)
        api.get(`api/cars/${id}`)

            .then(res => setCar(res.data))
            .catch(err => console.error("Error loading car details", err));
    }, [id]);

    if (!car) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="max-w-3xl mx-auto mt-10 p-4 bg-white rounded shadow">
            {/* <img src={`http://localhost:5000${car.image}`} alt={car.model} className="w-full h-64 object-contain rounded" /> */}
            <img src={`${BACKEND}${car.image}`} alt={car.model} className="w-full h-64 object-contain rounded" />
            <h2 className="text-2xl font-bold mt-4">{car.model}</h2>
            <p className="text-gray-600">Brand: {car.brand}</p>
            <p className="text-gray-600">Variant: {car.variant}</p>
            <p className="text-gray-600">Price: {car.price}</p>
            <ul className="list-disc list-inside mt-2">
                {car.features.map((f, i) => <li key={i}>{f}</li>)}
            </ul>
            <Link to="/" className="inline-block mt-4 text-blue-500 underline">← Back to Car List</Link>
        </div>
    );
};

export default CarDetails;
