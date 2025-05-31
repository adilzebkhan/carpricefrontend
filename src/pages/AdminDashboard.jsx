


import React, { useEffect, useState } from "react";
import api, { BACKEND } from "../Util/api";    // ✅ use shared api / URL

const AdminDashboard = () => {
    const [cars, setCars] = useState([]);
    const [formData, setFormData] = useState({
        brand: "",
        model: "",
        variant: "",
        price: "",
        features: "",
        image: null,
        popular: false,
    });

    /* ─────────── Fetch Cars ─────────── */
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

    /* ─────────── Delete ─────────── */
    const handleDelete = async (id) => {
        try {
            await api.delete(`/api/cars/${id}`);
            fetchCars();
        } catch (err) {
            console.error("Delete failed", err);
        }
    };

    /* ─────────── Form handlers ─────────── */
    const handleChange = (e) => {
        const { name, type, value, checked, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]:
                type === "file" ? files[0] :
                    type === "checkbox" ? checked :
                        value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.entries(formData).forEach(([k, v]) => data.append(k, v));

        try {
            await api.post("/api/cars", data);
            setFormData({
                brand: "", model: "", variant: "",
                price: "", features: "", image: null, popular: false,
            });
            fetchCars();
        } catch (err) {
            console.error("Failed to add car", err);
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            {/* … same JSX … */}
            {cars.map((car) => (
                <tr key={car._id}>
                    <td className="border px-2 py-1">
                        {/* image path now uses BACKEND not localhost */}
                        <img
                            src={`${BACKEND}${car.image}`}
                            alt={car.model}
                            className="w-16 h-10 object-cover"
                        />
                    </td>
                    {/* … */}
                </tr>
            ))}
        </div>
    );
};

export default AdminDashboard;
