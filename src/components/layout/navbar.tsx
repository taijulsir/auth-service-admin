"use client"

import { ThemeToggle } from "@/components/theme-toggle"
import { UserNav } from "@/components/layout/user-nav"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb"
import { usePathname } from "next/navigation"
import React from "react"

export function Navbar() {
    const pathname = usePathname()
    const pathSegments = pathname.split("/").filter(Boolean)

    return (
        <header className="sticky top-0 z-30 flex h-16 items-center border-b bg-background/95 px-4 backdrop-blur sm:px-6">
            <div className="flex flex-1 items-center gap-4">
                <Breadcrumb className="hidden md:flex">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                        </BreadcrumbItem>
                        {pathSegments.slice(1).map((segment, index) => {
                            const href = `/${pathSegments.slice(0, index + 2).join("/")}`
                            const isLast = index === pathSegments.length - 2
                            const title = segment.charAt(0).toUpperCase() + segment.slice(1)

                            return (
                                <React.Fragment key={href}>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        {isLast ? (
                                            <BreadcrumbPage>{title}</BreadcrumbPage>
                                        ) : (
                                            <BreadcrumbLink href={href}>{title}</BreadcrumbLink>
                                        )}
                                    </BreadcrumbItem>
                                </React.Fragment>
                            )
                        })}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className="flex items-center gap-4">
                <ThemeToggle />
                <UserNav />
            </div>
        </header>
    )
}
