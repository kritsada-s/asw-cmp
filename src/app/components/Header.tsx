'use client'
import Image from "next/image";
import Link from "next/link";
import Logo from "../images/asw_logo_hr.png";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from "@nextui-org/react";
import { useEffect, useState } from "react";
const menus = [
    { 
        label: 'รายละเอียด',
        link: '#info_1',
    },
    { 
        label: 'โครงการที่เข้าร่วม',
        link: '#projectSelector',
    }
]

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    useEffect(() => {
        console.log(isMenuOpen);
    }, [isMenuOpen]);

    return (
        <Navbar className="bg-white shadow-lg z-10 fixed top-0 left-0 w-full" maxWidth="full" height="65px" onMenuOpenChange={() => {setIsMenuOpen(!isMenuOpen) }}>
            <div className="container gap-2 p-0 md:px-3 flex items-center justify-between">
                <NavbarMenuToggle className="md:hidden h-7" />
                <NavbarBrand>
                    <Link title="AssetWise" target="_blank" href={{ pathname: 'https://assetwise.co.th', query: { utm_source: process.env.NEXT_PUBLIC_UTM } }} className="max-w-36 lg:max-w-fit">
                        <Image src={Logo} alt="Logo" width={160} height={17} />
                    </Link>
                </NavbarBrand>
                <NavbarContent className="gap-2 md:gap-5" justify="end">
                    <div className="hidden gap-4 md:flex">
                        {menus.map((item: any, key: number) => (
                            <NavbarItem key={key} className="hover:text-[#e75f2f] transition">
                                <Link className="text-[22px] leading-tight" href={item.link}>{item.label}</Link>
                            </NavbarItem>
                        ))}
                    </div>
                    <NavbarItem>
                        <Link href='#registerForm' className="bg-gradient-to-tl from-[#eb5f30] to-[#feca00] text-white px-4 py-1 rounded hover:bg-ci-blue/80 transition font-semibold text-[22px] leading-tight" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)' }}>
                        ลงทะเบียน
                        </Link>
                    </NavbarItem>
                </NavbarContent>
                <NavbarMenu className="pt-10 bg-black/50">
                    {menus.map((item: any, key: number) => (
                        <NavbarMenuItem key={key} className="text-[24px] font-thin text-white text-center leading-tight" onClick={() => setIsMenuOpen(true)}>
                            <Link href={item.link}>{item.label}</Link>
                        </NavbarMenuItem>
                    ))}
                </NavbarMenu>
            </div>
        </Navbar>
    );
}

export default Header;