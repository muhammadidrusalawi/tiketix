import { Head, usePage } from "@inertiajs/react"
import { AdminLayout } from "@/Layouts/AdminLayout.jsx"
import {CalendarDays, MapPin} from "lucide-react";

export default function EventDetail() {
    const { event } = usePage().props

    return (
        <AdminLayout header="Detail Acara">
            <Head title={event.name} />

            <div className="w-full flex flex-row gap-4">
                <div className="flex-1 flex flex-col gap-4">
                    <div className="relative w-full">
                        <img
                            src={event.image}
                            alt={event.name}
                            className="w-full h-full rounded-lg border object-cover"
                        />
                    </div>

                    <div className="flex items-center gap-6 text-base text-gray-500">
                        <div className="flex items-center gap-2">
                            <CalendarDays size={16} />
                            <span className="text-[15px]">
                                {new Date(event.start_date).toLocaleDateString("id-ID", {
                                    day: "2-digit",
                                    month: "long",
                                    year: "numeric",
                                })}
                            </span>
                            <span>-</span>
                            <span className="text-[15px]">
                                {new Date(event.end_date).toLocaleDateString("id-ID", {
                                    day: "2-digit",
                                    month: "long",
                                    year: "numeric",
                                })}
                            </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <MapPin size={16} />
                            <span>{event.location}</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <h2 className="text-2xl font-semibold">
                            {event.name}
                        </h2>

                        <p className="text-gray-600">
                            {event.description}
                        </p>
                    </div>
                </div>

                <div className="w-full max-w-md sticky top-0 self-start">
                    <h3 className="text-xl font-semibold mb-2">
                        Tiket
                    </h3>

                    {event.tickets.length > 0 ? (
                        <div className="space-y-2">
                            {event.tickets.map((ticket) => (
                                <div
                                    key={ticket.id}
                                    className="flex items-center justify-between border rounded-lg bg-white px-6 py-4"
                                >
                                    <div>
                                        <p className="font-medium">
                                            {ticket.name}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Stock: {ticket.stock}
                                        </p>
                                    </div>

                                    <div className="text-right">
                                        <p className="font-semibold">
                                            Rp {Number(ticket.price).toLocaleString("id-ID")}
                                        </p>

                                        {ticket.stock === 0 && (
                                            <span className="text-xs text-red-500 font-medium">
                                                SOLD OUT
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500">
                            Belum ada tiket untuk acara ini
                        </p>
                    )}
                </div>

            </div>
        </AdminLayout>
    )
}
