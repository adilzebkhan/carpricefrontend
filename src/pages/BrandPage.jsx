import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import api, { BACKEND } from "../Util/api";    // ✅ use shared api / URL

const BrandPage = () => {
  const { brandName } = useParams();
  const [allCars, setAllCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // axios.get("http://localhost:5000/api/cars")
    api.get("/api/cars")
      .then((res) => {
        setAllCars(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading cars:", err);
        setLoading(false);
      });
  }, []);

  const brandCars = allCars.filter(
    (car) => car.brand.toLowerCase() === brandName.toLowerCase()
  );

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto p-4 mt-10">
      <h2 className="text-2xl font-bold mb-6">Cars by {brandName}</h2>
      {brandCars.length === 0 ? (
        <p>No cars found for this brand.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {brandCars.map((car) => (
            <div key={car._id} className="bg-white p-4 rounded shadow">
              <img
                // src={`http://localhost:5000${car.image}`}
                src={`${BACKEND}${car.image}`}
                alt={car.model}
                className="w-full h-48 object-cover rounded"
              />
              <h3 className="text-xl font-semibold mt-2">{car.model}</h3>
              <p>Variant: {car.variant}</p>
              <p>Price: Rs. {car.price.toLocaleString()}</p>
              <Link
                to={`/car/${car._id}`}
                className="mt-2 inline-block text-blue-600 underline"
              >
                View Details →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BrandPage;
