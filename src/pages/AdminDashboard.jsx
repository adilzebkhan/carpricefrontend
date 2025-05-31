
// OLD Version of Admin Dashboard in which Local URL Was Used Now updating the code by using single source of backend url and using 
// this in rest of the api calls
// we created this single backend URL string in Util/api.js
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const AdminDashboard = () => {
//     const [cars, setCars] = useState([]);
//     const [formData, setFormData] = useState({
//         brand: "",
//         model: "",
//         variant: "",
//         price: "",
//         features: "",
//         image: null,
//         popular: false, // if popular true then display on home page
//     });

//     useEffect(() => {
//         fetchCars();
//     }, []);

//     const fetchCars = async () => {
//         try {
//             const res = await axios.get("http://localhost:5000/api/cars");
//             setCars(res.data);
//         } catch (err) {
//             console.error("Error fetching cars", err);
//         }
//     };

//     const handleDelete = async (id) => {
//         try {
//             await axios.delete(`http://localhost:5000/api/cars/${id}`);
//             fetchCars();
//         } catch (err) {
//             console.error("Delete failed", err);
//         }
//     };

//     const handleChange = (e) => {
//         const { name, type, value, checked } = e.target;
//         if (name === "image") {
//             setFormData({ ...formData, image: e.target.files[0] });
//         } else if (type === "checkbox") {
//             setFormData({ ...formData, [name]: checked });
//         } else {
//             setFormData({ ...formData, [name]: value });
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const data = new FormData();
//         data.append("brand", formData.brand);
//         data.append("model", formData.model);
//         data.append("variant", formData.variant);
//         data.append("price", formData.price);
//         data.append("features", formData.features);
//         data.append("image", formData.image);
//         data.append("popular", formData.popular);

//         try {
//             await axios.post("http://localhost:5000/api/cars", data);
//             setFormData({
//                 brand: "",
//                 model: "",
//                 variant: "",
//                 price: "",
//                 features: "",
//                 image: null,
//                 popular: false, //i change
//             });
//             fetchCars();
//         } catch (err) {
//             console.error("Failed to add car", err);
//         }
//     };

//     return (
//         <div className="p-6 max-w-4xl mx-auto">
//             <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

//             {/* Add Car Form */}
//             <form onSubmit={handleSubmit} className="mb-6 grid gap-4 bg-white p-4 rounded shadow">
//                 <input type="text" name="brand" placeholder="Brand" value={formData.brand} onChange={handleChange} className="border p-2 rounded" required />
//                 <input type="text" name="model" placeholder="Model" value={formData.model} onChange={handleChange} className="border p-2 rounded" required />
//                 <input type="text" name="variant" placeholder="Variant" value={formData.variant} onChange={handleChange} className="border p-2 rounded" required />
//                 <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} className="border p-2 rounded" required />
//                 <input type="text" name="features" placeholder="Features (comma separated)" value={formData.features} onChange={handleChange} className="border p-2 rounded" required />
//                 <input type="file" name="image" accept="image/*" onChange={handleChange} className="border p-2 rounded" required />
//                 <div className="flex items-center space-x-2">
//                     <input
//                         type="checkbox"
//                         name="popular"
//                         checked={formData.popular}
//                         className="w-4 h-4"
//                         onChange={handleChange}
//                     />
//                     <label htmlFor="">Mark as Popular</label>
//                 </div>
//                 <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add Car</button>
//             </form>

//             {/* Car List */}
//             <table className="w-full text-left border">
//                 <thead>
//                     <tr>
//                         <th className="border px-2 py-1">Image</th>
//                         <th className="border px-2 py-1">Model</th>
//                         <th className="border px-2 py-1">Brand</th>
//                         <th className="border px-2 py-1">Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {cars.map((car) => (
//                         <tr key={car._id}>
//                             <td className="border px-2 py-1">
//                                 <img src={`http://localhost:5000${car.image}`} alt={car.model} className="w-16 h-10 object-cover" />
//                             </td>
//                             <td className="border px-2 py-1">{car.model}</td>
//                             <td className="border px-2 py-1">{car.brand}</td>
//                             <td className="border px-2 py-1">
//                                 <button onClick={() => handleDelete(car._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default AdminDashboard;

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
