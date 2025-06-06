import React, { useEffect, useState } from "react";
import api from "../Util/api";

const AdminDashboard = () => {
    const [cars, setCars] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editingCarId, setEditingCarId] = useState(null);
    const [formData, setFormData] = useState({
        brand: "",
        model: "",
        variant: "",
        price: "",
        features: "",
        image: null,
        popular: false,
    });

    useEffect(() => {
        fetchCars();
    }, []);

    const fetchCars = async () => {
        try {
            const res = await api.get("/api/cars");
            setCars(res.data);
        } catch (err) {
            console.error("Error fetching cars", err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/api/cars/${id}`);
            fetchCars();
        } catch (err) {
            console.error("Delete failed", err);
        }
    };

    const handleEdit = (car) => {
        setFormData({
            brand: car.brand,
            model: car.model,
            variant: car.variant,
            price: car.price,
            features: car.features,
            image: null, // reset image to allow new selection
            popular: car.popular,
        });
        setIsEditing(true);
        setEditingCarId(car._id);
    };

    const handleChange = (e) => {
        const { name, type, value, checked, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "file" ? files[0] : type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.entries(formData).forEach(([k, v]) => {
            if (v !== null) data.append(k, v);
        });

        try {
            if (isEditing) {
                await api.put(`/api/cars/${editingCarId}`, data);
            } else {
                await api.post("/api/cars", data);
            }

            setFormData({
                brand: "",
                model: "",
                variant: "",
                price: "",
                features: "",
                image: null,
                popular: false,
            });
            setIsEditing(false);
            setEditingCarId(null);
            fetchCars();
        } catch (err) {
            console.error("Failed to save car", err);
            alert("Failed to save car. Check image size or internet connection.");
        }
    };

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

            {/* ─────────── Add / Update Car Form ─────────── */}
            <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded bg-gray-50 shadow-md mb-8">
                <h2 className="text-xl font-semibold mb-2">
                    {isEditing ? "Update Car" : "Add New Car"}
                </h2>

                <input
                    type="text"
                    name="brand"
                    placeholder="Brand"
                    value={formData.brand}
                    onChange={handleChange}
                    className="block w-full border px-3 py-2 rounded"
                    required
                />

                <input
                    type="text"
                    name="model"
                    placeholder="Model"
                    value={formData.model}
                    onChange={handleChange}
                    className="block w-full border px-3 py-2 rounded"
                    required
                />

                <input
                    type="text"
                    name="variant"
                    placeholder="Variant"
                    value={formData.variant}
                    onChange={handleChange}
                    className="block w-full border px-3 py-2 rounded"
                />

                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleChange}
                    className="block w-full border px-3 py-2 rounded"
                />

                <textarea
                    name="features"
                    placeholder="Features"
                    value={formData.features}
                    onChange={handleChange}
                    className="block w-full border px-3 py-2 rounded"
                />

                <input
                    type="file"
                    name="image"
                    onChange={handleChange}
                    className="block w-full"
                    accept="image/*"
                />

                <label className="inline-flex items-center">
                    <input
                        type="checkbox"
                        name="popular"
                        checked={formData.popular}
                        onChange={handleChange}
                        className="mr-2"
                    />
                    Popular
                </label>

                <div className="flex gap-4">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        {isEditing ? "Update Car" : "Add Car"}
                    </button>
                    {isEditing && (
                        <button
                            type="button"
                            onClick={() => {
                                setIsEditing(false);
                                setFormData({
                                    brand: "",
                                    model: "",
                                    variant: "",
                                    price: "",
                                    features: "",
                                    image: null,
                                    popular: false,
                                });
                            }}
                            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            {/* ─────────── Cars Table ─────────── */}
            <table className="w-full border-collapse border">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border px-3 py-2">Image</th>
                        <th className="border px-3 py-2">Brand</th>
                        <th className="border px-3 py-2">Model</th>
                        <th className="border px-3 py-2">Variant</th>
                        <th className="border px-3 py-2">Price</th>
                        <th className="border px-3 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {cars.map((car) => (
                        <tr key={car._id}>
                            <td className="border px-3 py-2">
                                <img
                                    src={car.image}
                                    alt={car.model}
                                    className="w-20 h-12 object-cover"
                                />
                            </td>
                            <td className="border px-3 py-2">{car.brand}</td>
                            <td className="border px-3 py-2">{car.model}</td>
                            <td className="border px-3 py-2">{car.variant}</td>
                            <td className="border px-3 py-2">PKR {car.price}</td>
                            <td className="border px-3 py-2 space-x-2">
                                <button
                                    onClick={() => handleEdit(car)}
                                    className="text-blue-600 hover:underline"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(car._id)}
                                    className="text-red-600 hover:underline"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminDashboard;
