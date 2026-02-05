import { AdminLayout } from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard() {
    return (
        <AdminLayout header="Dashboard">
            <Head title="Dashboard" />

            <div className="w-full flex flex-col bg-white p-4 rounded-xl border">
                <h2 className="text-2xl font-semibold">Dashboard</h2>
                <p className="text-gray-500">
                    Selamat datang di dashboard admin Tiketix
                </p>
            </div>
        </AdminLayout>
    );
}
