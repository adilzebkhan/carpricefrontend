import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
    const [brands, setBrands] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // axios.get("http://localhost:5000/api/cars")
        api.get("/api/cars") //updated URL to fetch data from  remote server backend instead of local host
            .then(res => {
                const unique = [...new Set(res.data.map(car => car.brand))];
                setBrands(unique);
            })
            .catch(err => console.error("Failed to load brands", err));
    }, []);

    const handleBrandSelect = (e) => {
        const selected = e.target.value;
        if (selected) navigate(`/brand/${selected}`);
    };

    return (
        <nav className="bg-blue-600 text-white p-4 shadow">
            <div className="container mx-auto flex items-center justify-between">
                <Link to="/" className="text-xl font-bold hover:text-blue-200">Pak Car Prices</Link>
                <div className="flex items-center space-x-4">
                    <Link to="/" className="hover:underline">Home</Link>
                    <Link to="/admin" className="hover:underline">Admin</Link>
                    <select
                        onChange={handleBrandSelect}
                        defaultValue=""
                        className="bg-blue-500 text-white border-none rounded px-2 py-1 hover:bg-blue-400"
                    >
                        <option value="" disabled>Browse Brands</option>
                        {brands.map((brand, idx) => (
                            <option key={idx} value={brand}>{brand}</option>
                        ))}
                    </select>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
