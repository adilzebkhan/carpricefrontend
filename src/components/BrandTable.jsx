import React from "react";

const BrandTable = ({ brands, onEdit, onDelete }) => {
    return (
        <div className="bg-white rounded shadow p-4">
            <h2 className="text-xl font-semibold mb-4">Brand List</h2>
            <table className="w-full table-auto border-collapse">
                <thead>
                    <tr className="bg-gray-200 text-left">
                        <th className="p-2 border">Logo</th>
                        <th className="p-2 border">Brand Name</th>
                        <th className="p-2 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {brands.map((brand) => (
                        <tr key={brand._id} className="border-t">
                            <td className="p-2 border">
                                <img src={brand.brandLogo} alt={brand.brandName} className="h-10" />
                            </td>
                            <td className="p-2 border">{brand.brandName}</td>
                            <td className="p-2 border space-x-2">
                                <button
                                    onClick={() => onEdit(brand)}
                                    className="text-blue-600 hover:underline"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => onDelete(brand._id)}
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

export default BrandTable;
