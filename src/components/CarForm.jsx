import React, { useEffect, useState } from "react";
import api from "../Util/api";

const emptyForm = {
    brand: "", model: "", variant: "", price: "",
    features: "", image: null, popular: false,
};

const CarForm = ({ editingCar, setEditingCar, refresh }) => {
    const [formData, setFormData] = useState(emptyForm);

    useEffect(() => {
        if (editingCar) setFormData(editingCar);
    }, [editingCar]);

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
            if (editingCar?._id) {
                await api.put(`/api/cars/${editingCar._id}`, data);
            } else {
                await api.post("/api/cars", data);
            }

            setFormData(emptyForm);
            setEditingCar(null);
            refresh();
        } catch (err) {
            console.error("Failed to save car", err);
            alert("Car save failed.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-8">
            <h2 className="text-xl font-semibold mb-4">{editingCar ? "Edit Car" : "Add New Car"}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" name="brand" value={formData.brand} onChange={handleChange} placeholder="Brand" required className="border p-2 rounded" />
                <input type="text" name="model" value={formData.model} onChange={handleChange} placeholder="Model" required className="border p-2 rounded" />
                <input type="text" name="variant" value={formData.variant} onChange={handleChange} placeholder="Variant" className="border p-2 rounded" />
                <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" className="border p-2 rounded" />
                <textarea name="features" value={formData.features} onChange={handleChange} placeholder="Features" className="border p-2 rounded col-span-2" />
                <input type="file" name="image" onChange={handleChange} className="col-span-2" />
                <label className="inline-flex items-center col-span-2">
                    <input type="checkbox" name="popular" checked={formData.popular} onChange={handleChange} className="mr-2" />
                    Popular
                </label>
            </div>

            <div className="mt-4 flex gap-4">
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">{editingCar ? "Update" : "Add"} Car</button>
                {editingCar && (
                    <button type="button" onClick={() => { setEditingCar(null); setFormData(emptyForm); }} className="bg-gray-400 text-white px-4 py-2 rounded">
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
};

export default CarForm;
