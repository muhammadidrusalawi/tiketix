import {AdminLayout} from "@/Layouts/AdminLayout.jsx";
import { Head, Link, usePage } from "@inertiajs/react";
import {
    CalendarDays,
    ChevronLeft,
    ChevronRight, MapPin,
    Plus,
    Search,
    TriangleAlert,
} from "lucide-react";

export default function Events(){
    const { events } = usePage().props;
    return (
        <AdminLayout header="Acara">
            <Head title="Acara" />

            <div className="h-full w-full flex flex-col gap-4">
                <div className="flex items-center justify-between gap-2">
                    <div className="relative w-full max-w-xl">
                        <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                            <Search size={16} />
                        </span>
                        <input
                            placeholder="Cari acara..."
                            type="text"
                            className="w-full py-2 pl-9 pr-4 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-0 focus:border-blue-500"
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <Link
                            href={route("admin.events.create")}
                            className="bg-blue-500 p-2 rounded-md text-white"
                        >
                            <Plus size={18} />
                        </Link>
                    </div>
                </div>

                {events.data.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {events.data.map((event) => (
                            <Link
                                href={route("admin.events.show", event.id)}
                                className="block"
                            >
                                <div
                                    key={event.id}
                                    className="flex flex-col overflow-hidden rounded-xl border bg-white cursor-pointer"
                                >
                                    <div className="relative h-56 w-full overflow-hidden bg-gray-100">
                                        <img
                                            src={event.image}
                                            alt={event.name}
                                            className="h-full w-full object-cover"
                                        />

                                        <div className="absolute top-2 right-2 bg-green-500 px-3 py-1.5 text-xs text-white rounded">
                                            {event.tickets?.length ?? 0} Tiket Tersedia
                                        </div>
                                    </div>

                                    <div className="flex flex-1 flex-col gap-1 p-4">
                                        <h3 className="font-semibold line-clamp-1 text-gray-800">
                                            {event.name}
                                        </h3>

                                        <div className="flex items-center gap-4 text-sm text-gray-500">
                                            <div className="flex items-center gap-1">
                                                <CalendarDays size={14} />
                                                <span className="text-[13px]">
                                                {new Date(event.start_date).toLocaleDateString("id-ID", {
                                                    day: "2-digit",
                                                    month: "long",
                                                    year: "numeric",
                                                })}
                                            </span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <MapPin size={14} />
                                                <span>{event.location}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="w-full flex items-center gap-2 p-4 rounded-md border border-yellow-300 bg-yellow-50 text-sm text-gray-700">
                        <div className="text-yellow-500">
                            <TriangleAlert size={18} />
                        </div>
                        <span>
                            Tidak ada acara tersedua, silahkan tambahkan terlebih
                            dahulu!
                        </span>
                    </div>
                )}

                <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                        Menampilkan {events.data.length} dari {events.total} acara
                    </div>

                    <ul className="flex items-center justify-center gap-3 text-gray-900">
                        <li>
                            {events.current_page === 1 ? (
                                <span className="grid size-8 place-content-center rounded border border-gray-200 text-gray-300 cursor-not-allowed">
                                    <ChevronLeft size={16} />
                                </span>
                            ) : (
                                <Link
                                    href={events.prev_page_url}
                                    className="grid size-8 place-content-center rounded border border-gray-200 transition-colors hover:bg-gray-50"
                                >
                                    <ChevronLeft size={16} />
                                </Link>
                            )}
                        </li>

                        <li className="text-sm font-medium tracking-widest">
                            {events.current_page} / {events.last_page}
                        </li>

                        <li>
                            {events.next_page_url ? (
                                <Link
                                    href={events.next_page_url}
                                    className="grid size-8 place-content-center rounded border border-gray-200 transition-colors hover:bg-gray-50"
                                >
                                    <ChevronRight size={16} />
                                </Link>
                            ) : (
                                <span className="grid size-8 place-content-center rounded border border-gray-200 text-gray-300 cursor-not-allowed">
                                    <ChevronRight size={16} />
                                </span>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </AdminLayout>
    )
}
