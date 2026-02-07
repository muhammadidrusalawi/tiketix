import { Head } from "@inertiajs/react";
import {HomeLayout} from "@/Layouts/HomeLayout.jsx";
import {CircleCheck} from "lucide-react";

export default function SuccessOrder() {
    return (
        <HomeLayout>
            <Head title="Order Success" />

            <div className="flex flex-col gap-4 items-center justify-center text-green-600">
                <CircleCheck size={100} />
                <p className="text-2xl font-bold">Berhasil Order</p>
            </div>
        </HomeLayout>
    );
}
