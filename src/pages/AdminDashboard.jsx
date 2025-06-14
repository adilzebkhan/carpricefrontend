import React, { useEffect, useState } from "react";
import api from "../Util/api";
import CarForm from "../components/CarForm";
import CarTable from "../components/CarTable";
import BrandForm from "../components/BrandForm";
import BrandTable from "../components/BrandTable";



const AdminDashboard = () => {
    const [cars, setCars] = useState([]);
    const [brands, setBrands] = useState([]);
    const [editingCar, setEditingCar] = useState(null);
    const [editingBrand, setEditingBrand] = useState(null);
    const [activeSection, setActiveSection] = useState("cars");
    const fetchCars = async () => {
        try {
            const res = await api.get("/api/cars");
            setCars(res.data);
        } catch (err) {
            console.error("Error fetching cars", err);
        }
    };

    const fetchBrands = async () => {
        try {
            const res = await api.get("/api/brands");
            setBrands(res.data);
        } catch (err) {
            console.error("Error fetching brands", err);
        }
    };

    useEffect(() => {
        fetchCars();
        fetchBrands();
    }, []);

    const handleDeleteCar = async (id) => {
        if (!window.confirm("Are you sure you want to delete this car?")) return;
        try {
            await api.delete(`/api/cars/${id}`);
            fetchCars();
        } catch (err) {
            console.error("Delete failed", err);
        }
    };

    const handleDeleteBrand = async (id) => {
        if (!window.confirm("Are you sure you want to delete this brand?")) return;
        try {
            await api.delete(`/api/brands/${id}`);
            fetchBrands();
        } catch (err) {
            console.error("Delete brand failed", err);
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-800 text-white p-4">
                <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
                <ul>
                    <li
                        className={`py-2 border-b border-gray-700 cursor-pointer ${activeSection === "cars" ? "bg-gray-700" : ""}`}
                        onClick={() => setActiveSection("cars")}
                    >
                        Car Listings
                    </li>
                    <li
                        className={`py-2 border-b border-gray-700 cursor-pointer ${activeSection === "brands" ? "bg-gray-700" : ""}`}
                        onClick={() => setActiveSection("brands")}
                    >
                        Brands
                    </li>
                </ul>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 bg-gray-100">
                {activeSection === "cars" && (
                    <>
                        <h1 className="text-3xl font-bold mb-6">Manage Cars</h1>
                        <CarForm editingCar={editingCar} setEditingCar={setEditingCar} refresh={fetchCars} />
                        <CarTable cars={cars} onEdit={setEditingCar} onDelete={handleDeleteCar} />
                    </>
                )}

                {activeSection === "brands" && (
                    <>
                        <h1 className="text-3xl font-bold mb-6">Manage Brands</h1>
                        <BrandForm editingBrand={editingBrand} setEditingBrand={setEditingBrand} refresh={fetchBrands} />
                        <BrandTable brands={brands} onEdit={setEditingBrand} onDelete={handleDeleteBrand} />
                    </>
                )}
            </main>
        </div>
    );

};

export default AdminDashboard;
