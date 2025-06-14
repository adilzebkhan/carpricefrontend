import React from "react";

const CarTable = ({ cars, onEdit, onDelete }) => {
    return (
        <div className="bg-white shadow rounded">
            <table className="w-full table-auto border-collapse">
                <thead className="bg-gray-200">
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
                                <img src={car.image} alt={car.model} className="w-20 h-12 object-cover" />
                            </td>
                            <td className="border px-3 py-2">{car.brand}</td>
                            <td className="border px-3 py-2">{car.model}</td>
                            <td className="border px-3 py-2">{car.variant}</td>
                            <td className="border px-3 py-2">PKR {car.price}</td>
                            <td className="border px-3 py-2 space-x-2">
                                <button onClick={() => onEdit(car)} className="text-blue-600 hover:underline">Edit</button>
                                <button onClick={() => onDelete(car._id)} className="text-red-600 hover:underline">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CarTable;
