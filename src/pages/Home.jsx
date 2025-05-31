import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [cars, setCars] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [brandFilter, setBrandFilter] = useState("All");

    const navigate = useNavigate();
    useEffect(() => {
        axios.get("http://localhost:5000/api/cars").then((res) => {
            const popularCars = res.data.filter((car) => car.popular);
            setCars(popularCars);
        });
    }, []);

    //   old version of useeffect in which all cars were fetched and displayed on home page
    // in above newer verison only cars with popular tag true will be displayed on home page
    // useEffect(() => {
    //     axios.get("http://localhost:5000/api/cars")
    //         .then(response => {
    //             setCars(response.data);
    //         })
    //         .catch(error => {
    //             console.error("Error fetching car data:", error);
    //         });
    // }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Pak Car Prices</h1>
            <h2 className="text-2xl text-center mb-6">Popular Cars in Pakistan</h2>

            {/* Search + Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-6 items-center justify-between">
                <input
                    type="text"
                    placeholder="Search by model or brand..."
                    className="border p-2 rounded w-full md:w-1/2"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <select
                    className="border p-2 rounded"
                    value={brandFilter}
                    onChange={(e) => setBrandFilter(e.target.value)}
                >
                    <option value="All">All Brands</option>
                    {[...new Set(cars.map(c => c.brand))].map((brand, idx) => (
                        <option key={idx} value={brand}>{brand}</option>
                    ))}
                </select>
            </div>

            {/* Car Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {cars
                    .filter(car =>
                        (brandFilter === "All" || car.brand === brandFilter) &&
                        (car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            car.brand.toLowerCase().includes(searchTerm.toLowerCase()))
                    )
                    .map(car => (
                        <div key={car._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                            <img
                                src={`http://localhost:5000${car.image}`}
                                alt={car.model}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold text-gray-800">{car.model}</h3>
                                <p className="text-gray-600">Brand: {car.brand}</p>
                                <p className="text-gray-600">Price: PKR {car.price.toLocaleString()}</p>
                                <button
                                    onClick={() => navigate(`/cars/${car._id}`)}
                                    className="mt-2 bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600"
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Home;
