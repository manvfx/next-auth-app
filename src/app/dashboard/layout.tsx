"use client";

import axios, { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from "next/link";
import {
    Bell,
    CircleUser,
    Home,
    LineChart,
    Menu,
    Package,
    Package2,
    Search,
    ShoppingCart,
    Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import LoadingScreen from '@/components/common/LoadingScreen';
import Sidebar from './sidebar';

interface UserResponse {
    user: string | null;
    error: AxiosError | null;
}

function DashboardLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [success, setSuccess] = useState(false);
    const [userData, setUserData] = useState<any>();
    const [activeMenu, setActiveMenu] = useState('Dashboard'); // State to track active menu item

    const logout = async () => {
        const { data } = await axios.get("/api/auth/logout");
        if (data) {
            router.push("/");
            return;
        }
    };

    const checkAuth = async () => {
        const { user, error } = await getUserProfile();
        if (error) {
            router.push("/");
            return;
        }
        setUserData(user);
        setSuccess(true);
    };

    useEffect(() => {
        checkAuth();
    }, []);

    if (!success) {
        return <LoadingScreen />;
    }

    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <Sidebar></Sidebar>
            <div className="flex flex-col">
                <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                className="shrink-0 md:hidden"
                            >
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle navigation menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="flex flex-col">
                            <nav className="grid gap-2 text-lg font-medium">
                                <Link
                                    href="#"
                                    className="flex items-center gap-2 text-lg font-semibold"
                                >
                                    <Package2 className="h-6 w-6" />
                                    <span className="sr-only">Acme Inc</span>
                                </Link>
                                <Link
                                    href="#"
                                    className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 transition-all ${activeMenu === 'Dashboard' ? 'bg-muted text-primary' : 'text-muted-foreground'
                                        }`}
                                    onClick={() => setActiveMenu('Dashboard')}
                                >
                                    <Home className="h-5 w-5" />
                                    Dashboard
                                </Link>
                                <Link
                                    href="#"
                                    className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 transition-all ${activeMenu === 'Orders' ? 'bg-muted text-primary' : 'text-muted-foreground'
                                        }`}
                                    onClick={() => setActiveMenu('Orders')}
                                >
                                    <ShoppingCart className="h-5 w-5" />
                                    Orders
                                    <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                                        6
                                    </Badge>
                                </Link>
                                <Link
                                    href="#"
                                    className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 transition-all ${activeMenu === 'Products' ? 'bg-muted text-primary' : 'text-muted-foreground'
                                        }`}
                                    onClick={() => setActiveMenu('Products')}
                                >
                                    <Package className="h-5 w-5" />
                                    Products
                                </Link>
                                <Link
                                    href="#"
                                    className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 transition-all ${activeMenu === 'Customers' ? 'bg-muted text-primary' : 'text-muted-foreground'
                                        }`}
                                    onClick={() => setActiveMenu('Customers')}
                                >
                                    <Users className="h-5 w-5" />
                                    Customers
                                </Link>
                                <Link
                                    href="#"
                                    className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 transition-all ${activeMenu === 'Analytics' ? 'bg-muted text-primary' : 'text-muted-foreground'
                                        }`}
                                    onClick={() => setActiveMenu('Analytics')}
                                >
                                    <LineChart className="h-5 w-5" />
                                    Analytics
                                </Link>
                            </nav>
                            <div className="mt-auto">
                                <Button size="sm" className="w-full">
                                    Logout
                                </Button>
                            </div>
                        </SheetContent>
                    </Sheet>
                    <div className="w-full flex-1">
                        <form>
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search products..."
                                    className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                                />
                            </div>
                        </form>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary" size="icon" className="rounded-full">
                                <CircleUser className="h-5 w-5" />
                                <span className="sr-only">Toggle user menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuItem>Support</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => logout()}>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </header>
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                    Hello {userData.user.name} | {userData.user.email} <br />
                    {children}
                </main>
            </div>
        </div>
    );
}

async function getUserProfile(): Promise<UserResponse> {
    try {
        const { data } = await axios.get("/api/auth/profile");
        return {
            user: data,
            error: null
        };
    } catch (error) {
        const err = error as AxiosError;
        return {
            user: null,
            error: err
        };
    }
}

export default DashboardLayout;
