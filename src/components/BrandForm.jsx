import React, { useState } from "react";
import api from "../Util/api";

const BrandForm = ({ editingBrand, setEditingBrand, refresh }) => {
    const [brandName, setBrandName] = useState("");
    const [brandLogo, setBrandLogo] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", brandName);
        formData.append("logo", brandLogo);

        try {
            await api.post("/api/brands", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setBrandName("");
            setBrandLogo(null);
            refresh();
        } catch (err) {
            console.error("Error uploading brand:", err);
            alert("Failed to upload brand");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow">
            <div>
                <label className="block font-bold mb-1">Brand Name:</label>
                <input
                    type="text"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
                />
            </div>
            <div>
                <label className="block font-bold mb-1">Brand Logo:</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setBrandLogo(e.target.files[0])}
                    className="w-full"
                />
            </div>
            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Add Brand
            </button>
        </form>
    );
};

export default BrandForm;
