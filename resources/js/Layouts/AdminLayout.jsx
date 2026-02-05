import { useEffect, useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import {
    Bell,
    ChevronsUpDown,
    House,
    LogOut,
    MessageCircle,
    PanelLeft,
    ReceiptText,
    UserPen,
    Building2,
    UsersRound,
    CalendarDays,
} from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/Popover";

const menuItems = [
    { name: "Dashboard", href: route("dashboard"), icon: House },
    { name: "Acara", href: "#", icon: CalendarDays },
    { name: "Transaksi", href: "#", icon: ReceiptText },
    { name: "Pengguna", href: "#", icon: UsersRound },
];

export function AdminLayout({ children, header }) {
    const { url, props } = usePage();
    const user = props.auth.user;
    const [isSidebarVisible, setIsSidebarVisible] = useState(() => {
        const stored = localStorage.getItem("sidebarVisible");
        return stored === null ? true : stored === "true";
    });

    useEffect(() => {
        localStorage.setItem("sidebarVisible", isSidebarVisible);
    }, [isSidebarVisible]);

    return (
        <div className="flex min-h-screen bg-gray-100">
            <aside
                className={`fixed left-0 top-0 h-screen w-64 bg-white border-r flex flex-col gap-4 p-6 transition-all duration-500 ease-in-out z-40
                ${isSidebarVisible ? "translate-x-0" : "-translate-x-full"}
            `}
            >
                <span className="flex items-center gap-2">
                  <div className="bg-blue-500 text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg text-white">
                    <Building2 className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">Tiketix</span>
                    <span className="truncate text-xs">Platform Booking</span>
                  </div>
                </span>

                <nav className="flex flex-col gap-1">
                    {menuItems.map((item) => {
                        const itemPath = new URL(
                            item.href,
                            window.location.origin
                        ).pathname;
                        const isActive =
                            url === itemPath || url.startsWith(itemPath + "/");

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex px-1 py-1.5 items-center gap-4 text-sm font-medium ${
                                    isActive
                                        ? "text-blue-500"
                                        : "text-gray-700 hover:text-blue-500"
                                }`}
                            >
                                <item.icon
                                    color="currentColor"
                                    className="h-4 w-4"
                                />
                                <span>{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="mt-auto">
                    <Popover>
                        <PopoverTrigger asChild>
                            <div className="flex items-center justify-between cursor-pointer">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-sm font-medium text-white leading-none">
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>

                                    <div className="flex flex-col text-sm leading-none">
                                        <span className="font-medium text-gray-800">
                                            {user.name}
                                        </span>
                                        <span className="text-gray-500">
                                            {user.email}
                                        </span>
                                    </div>
                                </div>
                                <ChevronsUpDown
                                    color="currentColor"
                                    className="h-4 w-4 cursor-pointer"
                                />
                            </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-52 ml-8 mb-2">
                            <div className="w-full flex flex-col items-start gap-2">
                                <Link
                                    href={route("profile.edit")}
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
                </div>
            </aside>

            {isSidebarVisible && (
                <div
                    className="fixed inset-0 bg-black/30 z-30 sm:hidden"
                    onClick={() => setIsSidebarVisible(false)}
                ></div>
            )}

            <div
                className={`flex flex-col gap-4 flex-1 h-screen transition-all duration-500 ${
                    isSidebarVisible ? "md:ml-64" : "ml-0"
                } p-4 overflow-y-auto`}
            >
                <header className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() =>
                                setIsSidebarVisible(!isSidebarVisible)
                            }
                            className="p-2 rounded-md hover:bg-gray-200"
                        >
                            <PanelLeft size={18} />
                        </button>
                        {header && (
                            <h2 className="text-md font-semibold">{header}</h2>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="p-2 rounded-md hover:bg-gray-200">
                            <MessageCircle size={18} />
                        </button>
                        <button className="p-2 rounded-md hover:bg-gray-200">
                            <Bell size={18} />
                        </button>
                    </div>
                </header>
                <main className="flex-1">{children}</main>
            </div>
        </div>
    );
}
