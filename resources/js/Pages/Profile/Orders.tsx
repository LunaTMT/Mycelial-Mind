import { useEffect, useState } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

interface Order {
    id: number;
    customerName: string;
    total: number;
    status: "Pending" | "Shipped" | "Delivered" | "Cancelled";
    date: string;
}

interface AuthProps {
    auth: {
        user?: any; // Change `any` to the specific user type if known
    };
}

export default function CustomerOrders({ auth }: AuthProps) {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const Layout = auth?.user ? AuthenticatedLayout : GuestLayout;

    useEffect(() => {
        setTimeout(() => {
            setOrders([
                { id: 1, customerName: "John Doe", total: 49.99, status: "Pending", date: "2024-02-11" },
                { id: 2, customerName: "Jane Smith", total: 79.99, status: "Shipped", date: "2024-02-10" },
                { id: 3, customerName: "Alice Brown", total: 129.99, status: "Delivered", date: "2024-02-09" },
                { id: 4, customerName: "Bob Johnson", total: 19.99, status: "Cancelled", date: "2024-02-08" },
            ]);
            setLoading(false);
        }, 1000);
    }, []);

    return (
        <Layout>
            <div className="min-h-[85vh] w-full h-full bg-blue-900  max-w-7xl sm:px-6 lg:px-8 p-5 flex gap-5 justify-center items-start ">
                
                <div className="p-6 w-full mx-auto bg-red-500 dark:bg-gray-800 rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                        Customer Orders
                    </h1>

                    {loading ? (
                        <p className="text-gray-600 dark:text-gray-300">Loading orders...</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
                                <thead>
                                    <tr className="bg-gray-200 dark:bg-gray-700">
                                        <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                                            Order ID
                                        </th>
                                        <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                                            Customer
                                        </th>
                                        <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                                            Total ($)
                                        </th>
                                        <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                                            Status
                                        </th>
                                        <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                                            Date
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order) => (
                                        <tr key={order.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center">
                                                {order.id}
                                            </td>
                                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                                                {order.customerName}
                                            </td>
                                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center">
                                                ${order.total.toFixed(2)}
                                            </td>
                                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center">
                                                <span
                                                    className={`px-2 py-1 text-sm font-semibold rounded-full ${
                                                        order.status === "Pending"
                                                            ? "bg-yellow-200 text-yellow-700"
                                                            : order.status === "Shipped"
                                                            ? "bg-blue-200 text-blue-700"
                                                            : order.status === "Delivered"
                                                            ? "bg-green-200 text-green-700"
                                                            : "bg-red-200 text-red-700"
                                                    }`}
                                                >
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center">
                                                {order.date}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}
