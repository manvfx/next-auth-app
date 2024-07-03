"use client"
import React, { useState } from 'react';
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

function Sidebar() {
     return (
        <>
            <div className="hidden border-r bg-muted/40 md:block">
                <div className="flex h-full max-h-screen flex-col gap-2">
                    <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                        <Link href="/" className="flex items-center gap-2 font-semibold">
                            <Package2 className="h-6 w-6" />
                            <span className="">IOT Platform</span>
                        </Link>
                        <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                            <Bell className="h-4 w-4" />
                            <span className="sr-only">Toggle notifications</span>
                        </Button>
                    </div>


                    <div className="flex-1">
                        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                            <Link
                                href="/dashboard"
                                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all text-muted-foreground hover:text-foreground
                                    }`}
                            >
                                <Home className="h-4 w-4" />
                                Dashboard
                            </Link>
                            <Link
                                href="/dashboard/orders"
                                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all text-muted-foreground hover:text-foreground
                                    }`}
                            >
                                <ShoppingCart className="h-4 w-4" />
                                Orders
                                <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                                    6
                                </Badge>
                            </Link>
                            <Link
                                href="/dashboard/products"
                                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all text-muted-foreground hover:text-foreground
                                    }`}
                            >
                                <Package className="h-4 w-4" />
                                Products
                            </Link>
                            <Link
                                href="#"
                                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all text-muted-foreground hover:text-foreground
                                    }`}
                            >
                                <Users className="h-4 w-4" />
                                Customers
                            </Link>
                            <Link
                                href="/dashboard/settings"
                                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all text-muted-foreground hover:text-foreground
                                    }`}
                            >
                                <LineChart className="h-4 w-4" />
                                Settings
                            </Link>
                        </nav>
                    </div>
                    <div className="mt-auto p-4">
                        <Button size="sm" className="w-full">
                            Logout
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar