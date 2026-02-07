import {CalendarDays, Loader2, MapPin, Minus, Plus, Ticket} from "lucide-react";
import {Head, useForm, usePage} from "@inertiajs/react";
import {HomeLayout} from "@/Layouts/HomeLayout.jsx";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";

export default function UserEventDetail(){
    const { event } = usePage().props
    const { auth } = usePage().props;

    const [ticketQty, setTicketQty] = useState(
        () => event.tickets.reduce((acc, ticket) => {
            acc[ticket.id] = 0;
            return acc;
        }, {})
    );

    const increaseQty = (ticketId) => {
        setTicketQty(prev => {
            const stock = event.tickets.find(t => t.id === ticketId).stock;
            return {
                ...prev,
                [ticketId]: Math.min(prev[ticketId] + 1, stock)
            };
        });
    };

    const decreaseQty = (ticketId) => {
        setTicketQty(prev => ({
            ...prev,
            [ticketId]: Math.max(prev[ticketId] - 1, 0)
        }));
    };

    const totalPrice = event.tickets.reduce(
        (sum, ticket) => sum + ticket.price * (ticketQty[ticket.id] || 0),
        0
    );

    const { data, setData, post, processing, errors } = useForm({
        items: Object.entries(ticketQty)
            .filter(([_, qty]) => qty > 0)
            .map(([ticket_id, quantity]) => ({ ticket_id, quantity })),
    });

    useEffect(() => {
        setData({
            ...data,
            items: Object.entries(ticketQty)
                .filter(([_, qty]) => qty > 0)
                .map(([ticket_id, quantity]) => ({ ticket_id, quantity })),
        });
    }, [ticketQty]);

    const handleCheckout = (e) => {
        e.preventDefault();

        if (!auth.user){
            toast.error("Silahkan login terlebih dahulu")
            return;
        }

        if (data.items.length === 0) return;

        post(route('events.orderUser', event.slug));
    };

    return (
        <HomeLayout>
            <Head title={event.name} />

            <div className="w-full flex flex-row gap-8">
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

                <form onSubmit={handleCheckout} className="w-full max-w-sm sticky top-0 self-start">
                    {event.tickets.length > 0 ? (
                        <div className="space-y-2">
                            {event.tickets.map((ticket) => (
                                <div
                                    key={ticket.id}
                                    className="flex items-center justify-between border rounded-xl bg-white px-6 py-4"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="bg-blue-50 border border-blue-500 p-2 text-blue-500 rounded-lg">
                                            <Ticket />
                                        </div>
                                        <div>
                                            <p className="font-medium">
                                                {ticket.name}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                Rp{Number(ticket.price).toLocaleString("id-ID")}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-end gap-1">
                                        {ticket.stock === 0 ? (
                                            <span className="text-xs text-red-500 font-medium">
                                                SOLD OUT
                                            </span>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => decreaseQty(ticket.id)}
                                                    className="bg-gray-100 flex items-center p-2 border rounded-lg"
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <span className="w-6 text-center">{ticketQty[ticket.id]}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => increaseQty(ticket.id)}
                                                    className="bg-gray-100 flex items-center p-2 border rounded-lg"
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>
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

                    <div className="mt-4 flex items-center justify-between border bg-white rounded-xl">
                        <div className="px-6">
                            <p className="font-medium">Total</p>
                            <p className="text-sm text-gray-500">
                                Rp{totalPrice.toLocaleString("id-ID")}
                            </p>
                        </div>
                        <button
                            type="submit"
                            disabled={totalPrice === 0}
                            className="w-fit h-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-6 px-10 rounded-r-xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {processing ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Lanjutkan'}
                        </button>
                    </div>
                </form>
            </div>
        </HomeLayout>
    )
}
