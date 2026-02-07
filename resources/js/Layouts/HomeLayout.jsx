import {Link, usePage} from "@inertiajs/react";
import { LogOut, UserPen} from "lucide-react";
import {Popover, PopoverContent, PopoverTrigger} from "@/Components/ui/Popover.jsx";
import {useEffect, useRef} from "react";
import toast from "react-hot-toast";

export function HomeLayout({children}) {
    const { auth, flash } = usePage().props;

    const shown = useRef(false);

    useEffect(() => {
        if (shown.current) return;

        if (flash?.success) {
            toast.success(flash.success);
        }

        shown.current = true;
    }, [flash]);

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <header className="fixed top-0 z-50 w-full bg-white border-b">
                <nav className="flex w-full items-center justify-between max-w-6xl mx-auto p-4">
                    <Link
                        href="/"
                        className="flex items-center gap-4"
                    >
                        <div className="relative h-7 w-11">
                            <div className="absolute left-0 top-0 z-0 h-8 w-8 rounded-full bg-yellow-500 border-2 border-white" />
                            <div className="absolute left-6 top-0 z-10 h-8 w-8 rounded-full bg-blue-500 border-2 border-white" />
                        </div>
                        <span className="text-2xl font-bold text-gray-800">Tiketix</span>
                    </Link>
                    <div>
                        {auth.user ? (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <button className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-sm font-medium text-white leading-none">
                                        {auth.user.name.charAt(0).toUpperCase()}
                                    </button>
                                </PopoverTrigger>
                                <PopoverContent className="w-52 mr-40 mt-2">
                                    <div className="w-full flex flex-col items-start gap-2">
                                        <Link
                                            href="#"
                                            className="w-full flex items-center gap-4 text-sm font-medium px-4 py-2 border border-gray-300 rounded-md"
                                        >
                                            <UserPen size={18} />
                                            Profil
                                        </Link>
                                        <Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                            className="w-full flex items-center gap-4 text-sm font-medium px-4 py-2 bg-red-500 text-white outline-none rounded-md"
                                        >
                                            <LogOut size={18} />
                                            <span>Keluar</span>
                                        </Link>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link
                                    href={route('login')}
                                    className="px-4 py-2 bg-white hover:bg-gray-50 border text-sm font-medium rounded-md"
                                >
                                    Masuk
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-md"
                                >
                                    Daftar
                                </Link>
                            </div>
                        )}
                    </div>
                </nav>
            </header>

            <main className="w-full max-w-6xl mx-auto flex flex-col gap-12 mt-24 px-4 pb-4">
                {children}
            </main>
        </div>
    )
}
