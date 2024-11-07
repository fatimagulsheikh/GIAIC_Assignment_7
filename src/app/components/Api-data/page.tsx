"use client";
import { useEffect, useState } from "react";

export default function Page() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("https://dummyjson.com/products");
                if (!response.ok) throw new Error("Failed to fetch data");
                const data = await response.json();
                setProducts(data.products);
            } catch (error) {
                setError(error.message);
                console.error("Failed to fetch products:", error);
            }
        };

        fetchProducts();
    }, []);

    // Click event handler
    const handleClick = (title, price) => {
        alert(`You clicked on: ${title}\nPrice: $${price}`);
    };

    return (
        <div className="max-w-3xl mx-auto p-8 bg-gradient-to-br from-green-300 via-teal-300 to-blue-400 rounded-3xl shadow-2xl">
            <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8 drop-shadow-lg">
                Product List 🌟
            </h1>
            
            {error && <p className="text-red-600 text-center mb-4">Error: {error}</p>}
            {products.length === 0 && !error && <p className="text-center text-gray-700">Loading...</p>}
            
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
                {products.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => handleClick(item.title, item.price)}
                        className="bg-white rounded-lg p-5 shadow-lg transition-transform transform hover:scale-105 cursor-pointer hover:bg-gray-100 border border-gray-200 hover:border-blue-400"
                    >
                        {/* Product Image */}
                        <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="w-full h-48 object-cover rounded-md mb-4"
                        />
                        
                        {/* Product Details */}
                        <h3 className="text-2xl font-semibold text-gray-800 mb-2 hover:text-blue-600 transition-colors">
                            {item.title}
                        </h3>
                        <p className="text-lg text-gray-600 font-medium">Price: ${item.price}</p>
                        <p className="text-sm text-gray-500 mt-1">
                            {item.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
