'use client'
import {Navbar, NavbarBrand, NavbarContent, NavbarItem} from "@heroui/navbar";
import Link from "next/link";
import Image from "next/image";
import {usePathname} from "next/navigation";
import {Button} from "@heroui/button";
import {siteConfig} from "@/config/site.config";
import {layoutConfig} from "@/config/layout.config";

export const Logo = () => {
    return (<Image src="/vercel.svg"
                   width={26}
                   height={26}
                   alt={siteConfig.title}
                   priority/>);
}

export default function Header() {

    const pathname = usePathname();

    const getNavItems = () => {
        return (
            siteConfig.navItems.map(({href, label}, i) => {
                const isActive = pathname === href;
                return (<NavbarItem key={href}>
                    <Link color="foreground"
                          href={href}
                          className={`px-3 py-1 
                                    ${isActive ? "text-blue-500" : "text-foreground"}
                                    hover:text-blue-300 hover:border
                                    hover:border-blue-300 hover:rounded-md
                                    transition-colors
                                    transform-border
                                    duration-200
                                  `}>
                        {label}
                    </Link>
                </NavbarItem>)
            })
        )
    }

    return (
        <Navbar className={`justify-between h-[${layoutConfig.header}]`}>
            <NavbarBrand>
                <Link href="/" className="flex gap-1">
                    <Logo/>
                    <p className={"font-bold text-inherit"}>{siteConfig.title}</p>
                </Link>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                {getNavItems()}
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem className="hidden lg:flex">
                    <Link href="/">Логин</Link>
                </NavbarItem>
                <NavbarItem>
                    <Button as={Link} color="primary" href="#" variant="flat">Регистрация</Button>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}
