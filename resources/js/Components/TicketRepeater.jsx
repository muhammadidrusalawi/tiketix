import {Trash2} from "lucide-react";

export default function TicketRepeater({ tickets, setTickets, errors }) {
    const addTicket = () => {
        setTickets([
            ...tickets,
            { name: "", price: "", stock: "" },
        ])
    }

    const removeTicket = (index) => {
        setTickets(tickets.filter((_, i) => i !== index))
    }

    const updateTicket = (index, field, value) => {
        const updated = [...tickets]
        updated[index][field] = value
        setTickets(updated)
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="font-medium">Ticket Acara</h3>
                <button
                    type="button"
                    onClick={addTicket}
                    className="px-4 py-2 text-sm font-medium bg-blue-500 hover:bg-blue-600 text-white rounded"
                >
                    Tambah Ticket
                </button>
            </div>

            {tickets.map((ticket, index) => (
                <div
                    key={index}
                    className="space-y-2"
                >
                    <div className="flex items-end gap-4">
                        <div className="w-full flex flex-col gap-1">
                            <label className="block text-sm font-medium">
                                Nama Tiket
                            </label>
                            <input
                                type="text"
                                placeholder="VIP"
                                className="px-4 py-2 w-full border border-gray-300 rounded-md text-sm focus:border-blue-300"
                                value={ticket.name}
                                onChange={(e) =>
                                    updateTicket(index, "name", e.target.value)
                                }
                            />
                            {errors?.[`tickets.${index}.name`] && (
                                <p className="text-red-500 text-sm">
                                    {errors[`tickets.${index}.name`]}
                                </p>
                            )}
                        </div>

                        <div className="w-full flex flex-col gap-1">
                            <label className="block text-sm font-medium">
                                Harga
                            </label>
                            <input
                                type="number"
                                placeholder="1.750.000"
                                className="px-4 py-2 w-full border border-gray-300 rounded-md text-sm focus:border-blue-300"
                                value={ticket.price}
                                onChange={(e) =>
                                    updateTicket(index, "price", e.target.value)
                                }
                            />
                            {errors?.[`tickets.${index}.price`] && (
                                <p className="text-red-500 text-sm">
                                    {errors[`tickets.${index}.price`]}
                                </p>
                            )}
                        </div>

                        <div className="w-full flex flex-col gap-1">
                            <label className="block text-sm font-medium">
                                Stok
                            </label>
                            <input
                                type="number"
                                placeholder="300"
                                className="px-4 py-2 w-full border border-gray-300 rounded-md text-sm focus:border-blue-300"
                                value={ticket.stock}
                                onChange={(e) =>
                                    updateTicket(index, "stock", e.target.value)
                                }
                            />
                            {errors?.[`tickets.${index}.stock`] && (
                                <p className="text-red-500 text-sm">
                                    {errors[`tickets.${index}.stock`]}
                                </p>
                            )}
                        </div>

                        <div className="flex items-end justify-end">
                            <button
                                type="button"
                                onClick={() => removeTicket(index)}
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-red-500 hover:bg-red-600 rounded-md text-white"
                            >
                                <Trash2 size={17} /> Hapus
                            </button>
                        </div>
                    </div>
                </div>
            ))}

            {errors?.tickets && (
                <p className="text-red-500 text-sm">{errors.tickets}</p>
            )}
        </div>
    )
}
