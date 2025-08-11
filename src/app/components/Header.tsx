'use client';

import Image from "next/image";
import Link from "next/link";
import Logo from "../images/asw_logo_hr.png";
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

const menus = [
    { 
        label: 'คอนโดมิเนียม',
        link: 'https://assetwise.co.th/condominium',
    },
    { 
        label: 'ทาวน์โฮม',
        link: 'https://assetwise.co.th/house',
    },
    { 
        label: 'โปรโมชั่น',
        link: 'https://assetwise.co.th/promotion',
    },
    { 
        label: 'รู้จักแอสเซทไวส์',
        link: 'https://assetwise.co.th/about-us',
    },
    { 
        label: 'นักลงทุนสัมพันธ์',
        link: 'https://investor.assetwise.co.th/th/home',
    },
]

function Header() {
    const handleRegisterClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const targetSection = document.querySelector('#registerForm');
        if (targetSection) {
            gsap.to(window, {
                duration: 0.6,
                scrollTo: { 
                    y: targetSection,
                    offsetY: 70
                },
                ease: "power2.inOut"
            });
        }
    };
    return (
        <div className="bg-white shadow-lg z-50 fixed top-0 left-0 right-0 w-full">
            <div className="container h-fit flex items-center justify-between py-4">
                <Link title="AssetWise" target="_blank" href={{ pathname: 'https://assetwise.co.th', query: { utm_source: 'BIGMAXDEALS_WEB_Direct' } }} className="max-w-36 lg:max-w-fit">
                    <Image src={Logo} alt="Logo" width={200} height={22} />
                </Link>
                <div className="menu-right flex gap-4 items-center">
                    <ul className="gap-5 hidden lg:flex">
                        {menus.map((item: any, key: number) => (
                            <Link key={key} href={item.link} className="text-neutral-700 hover:text-[#004ab3] transition">{item.label}</Link>
                        ))}
                    </ul>
                    <button className="bg-gradient-to-br from-[#004ab3] to-[#0167bc] text-white px-4 py-1 rounded-md" onClick={handleRegisterClick}>ลงทะเบียน</button>
                </div>
            </div>
        </div>
    );
}

export default Header;