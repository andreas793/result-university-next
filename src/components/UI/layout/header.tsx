'use client'
import {Navbar, NavbarBrand, NavbarContent, NavbarItem} from "@heroui/navbar";
import Link from "next/link";
import Image from "next/image";
import {usePathname} from "next/navigation";
import {Button} from "@heroui/button";
import {siteConfig} from "@/config/site.config";
import {layoutConfig} from "@/config/layout.config";
import RegistrationModal from "@/components/UI/modals/registration.modal";
import {useState} from "react";
import LoginModal from "@/components/UI/modals/login.modal";
import {signOutFunc} from "@/actions/sign-out";
import {useAuthStore} from "@/store/auth.store";

export const Logo = () => {
    return (<Image src="/vercel.svg"
                   width={26}
                   height={26}
                   alt={siteConfig.title}
                   priority/>);
}

export default function Header() {

    const pathname = usePathname();

    const {isAuth, session, status, setAuthState} = useAuthStore();


    const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);

    const getNavItems = () => {
        return (
            siteConfig.navItems.map(({href, label}) => {
                const isActive = pathname === href;
                return (<NavbarItem key={href}>
                    <Link
                        color="foreground"
                        href={href}
                        className={`px-3 py-1 
                            ${isActive ? "text-blue-500" : "text-foreground"}
                            hover:text-blue-300 hover:border
                            hover:border-blue-300 hover:rounded-md
                            transition-colors
                            transform-border
                            duration-200`}
                    >
                        {label}
                    </Link>
                </NavbarItem>)
            })
        )
    }

    const handleSignOut = async () => {
        try {
            await signOutFunc();
        } catch (error) {
            console.log(error);
        }
        setAuthState("unauthenticated", null);
    }

    return (
        <Navbar style={{height: `${layoutConfig.header}`}}>
            <NavbarBrand>
                <Link href="/public" className="flex gap-1">
                    <Logo/>
                    <p className={"font-bold text-inherit"}>{siteConfig.title}</p>
                </Link>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                {getNavItems()}
            </NavbarContent>
            <NavbarContent justify="end">
                {isAuth && <p>Привет, {session?.user?.email}!</p>}
                { status === "loading" ? <p>Загрузка...</p> : !isAuth ? (
                    <>
                        <NavbarItem className="hidden lg:flex">
                            <Button as={Link} color='secondary' href="#" variant='flat'
                                    onPress={() => setIsLoginOpen(true)}>Логин</Button>
                        </NavbarItem>
                        <NavbarItem>
                            <Button as={Link} color="primary" href="#" variant="flat"
                                    onPress={() => setIsRegistrationOpen(true)}>Регистрация</Button>
                        </NavbarItem>
                    </>) : (
                        <NavbarItem className="hidden lg:flex">
                            <Button as={Link} color='secondary' href="#" variant='flat'
                                    onPress={handleSignOut}>Выйти</Button>
                        </NavbarItem>
                )}

            </NavbarContent>
            <RegistrationModal isOpen={isRegistrationOpen} onClose={() => setIsRegistrationOpen(false)}/>
            <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)}/>
        </Navbar>
    );
}
