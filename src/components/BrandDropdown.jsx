import React from "react";
import { useNavigate } from "react-router-dom";

const BrandDropdown = ({ brands }) => {
    const navigate = useNavigate();

    const handleChange = (e) => {
        const selectedBrand = e.target.value;
        if (selectedBrand) {
            navigate(`/brand/${selectedBrand}`);
        }
    };

    return (
        <div className="my-4">
            <label className="mr-2 font-semibold">Select Brand:</label>
            <select
                onChange={handleChange}
                defaultValue=""
                className="border px-3 py-1 rounded"
            >
                <option value="" disabled>
                    -- Choose a brand --
                </option>
                {brands.map((brand, index) => (
                    <option key={index} value={brand}>
                        {brand}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default BrandDropdown;
