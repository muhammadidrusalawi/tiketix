import { Link, Head, useForm} from "@inertiajs/react";
import {AdminLayout} from "@/Layouts/AdminLayout.jsx";
import {useState} from "react";
import {ChevronLeft, Loader2} from "lucide-react";
import TicketRepeater from "@/Components/TicketRepeater.jsx";

export default function CreateEvent(){
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        description: "",
        image: null,
        location: "",
        start_date: "",
        end_date: "",
        tickets: [
            { name: "", price: "", stock: "" },
        ],
    })

    const [preview, setPreview] = useState(null)

    const handleImage = (e) => {
        const file = e.target.files[0]
        setData("image", file)

        if (file) {
            setPreview(URL.createObjectURL(file))
        }
    }

    const setTickets = (tickets) => {
        setData("tickets", tickets)
    }

    const submit = (e) => {
        e.preventDefault()

        post(route("admin.events.store"), {
            forceFormData: true,
        })
    }

    return (
        <AdminLayout header="Buat Acara">
            <Head title="Buat Acara" />

            <div className="bg-white p-6 border rounded-xl">
                <form onSubmit={submit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="block text-sm font-medium">
                                Nama Acara
                            </label>
                            <input
                                type="text"
                                className="px-4 py-2 w-full border border-gray-300 rounded-md text-sm focus:border-blue-300"
                                placeholder="Koploin Fest vol 2"
                                value={data.name}
                                onChange={(e) => setData("name", e.target.value)}
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm">{errors.name}</p>
                            )}
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="block text-sm font-medium">
                                Lokasi
                            </label>
                            <input
                                type="text"
                                className="px-4 py-2 w-full border border-gray-300 rounded-md text-sm focus:border-blue-300"
                                value={data.location}
                                onChange={(e) => setData("location", e.target.value)}
                                placeholder="Jakarta International Stadium"
                            />
                            {errors.location && (
                                <p className="text-red-500 text-sm">{errors.location}</p>
                            )}
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="block text-sm font-medium">
                                Tanggal Mulai
                            </label>
                            <input
                                type="date"
                                className="px-4 py-2 w-full border border-gray-300 rounded-md text-sm focus:border-blue-300"
                                value={data.start_date}
                                onChange={(e) => setData("start_date", e.target.value)}
                            />
                            {errors.start_date && (
                                <p className="text-red-500 text-sm">{errors.start_date}</p>
                            )}
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="block text-sm font-medium">
                                Tanggal Selesai
                            </label>
                            <input
                                type="date"
                                className="px-4 py-2 w-full border border-gray-300 rounded-md text-sm focus:border-blue-300"
                                value={data.end_date}
                                onChange={(e) => setData("end_date", e.target.value)}
                            />
                            {errors.end_date && (
                                <p className="text-red-500 text-sm">{errors.end_date}</p>
                            )}
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="block text-sm font-medium">
                                Deskripsi Acara
                            </label>
                            <textarea
                                className="px-4 py-2 w-full border border-gray-300 rounded-md text-sm focus:border-blue-300"
                                rows={8}
                                value={data.description}
                                placeholder="Masukan deskripsi acara"
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                            />
                            {errors.description && (
                                <p className="text-red-500 text-sm">
                                    {errors.description}
                                </p>
                            )}
                        </div>


                        <div className="flex flex-col gap-1">
                            <label className="block text-sm font-medium">
                                Gambar
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImage}
                            />
                            {errors.image && (
                                <p className="text-red-500 text-sm">
                                    {errors.image}
                                </p>
                            )}

                            {preview && (
                                <img
                                    src={preview}
                                    className="mt-3 w-32 h-32 object-cover rounded border"
                                />
                            )}
                        </div>
                    </div>

                    <TicketRepeater
                        tickets={data.tickets}
                        setTickets={setTickets}
                        errors={errors}
                    />

                    <div className="flex justify-end gap-2">
                        <Link
                            href={route("admin.events.index")}
                            className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 text-sm font-medium px-4 py-2 border rounded-md"
                        >
                            <ChevronLeft size={18} /> Kembali ke Daftar
                        </Link>

                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-500 hover:bg-blue-600 text-sm font-medium text-white px-4 py-2 rounded-md"
                        >
                            {processing ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Simpan'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    )
}
