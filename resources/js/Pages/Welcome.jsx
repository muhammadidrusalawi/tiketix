import {Head, Link, usePage} from '@inertiajs/react';
import {CalendarDays, LogOut, MapPin} from "lucide-react";
import {HomeLayout} from "@/Layouts/HomeLayout.jsx";

export default function Welcome({ auth }) {
    const {data}= usePage().props;

    return (
        <HomeLayout>
            <Head title="Welcome" />

            <div className="relative h-80 w-full overflow-hidden rounded-lg">
                <img
                    src="https://ui.shadcn.com/placeholder.svg"
                    alt="hero"
                    className="h-full w-full object-cover"
                />
            </div>

            <div className="flex flex-col gap-6">
                <div className="border-l-4 border-blue-500">
                    <h2 className="ml-3 text-xl font-semibold text-gray-800">Unggulan</h2>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    {data.map((event) => (
                        <div
                            key={event.id}
                            className="flex flex-col overflow-hidden rounded-xl border bg-white"
                        >
                            <div className="relative h-48 w-full overflow-hidden hover:scale-105 transform duration-300 cursor-pointer">
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
                                        <CalendarDays size={13} />
                                        <span className="text-[13px]">
                                                {new Date(event?.start_date).toLocaleDateString("id-ID", {
                                                    day: "2-digit",
                                                    month: "short",
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

                            <div className="grid grid-cols-2 items-center">
                                    <span className="text-[13px] text-gray-500 text-center px-4 py-2 bg-gray-100 line-clamp-1">
                                        Mulai dari Rp{event.tickets[0]?.price.toLocaleString("id-ID")}
                                    </span>
                                <Link
                                    href={route('events.detail', event.slug)}
                                    className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-sm text-white font-medium px-4 py-2"
                                >
                                    Beli Tiket
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="h-[200vh]" />
        </HomeLayout>
    );
}
