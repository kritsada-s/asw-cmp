import Image from "next/image";
import Link from "next/link";
import Logo from "../images/asw_logo_hr.png";

const menus = [
    { 
        label: 'คอนโดมิเนียม',
        link: `https://assetwise.co.th/condominium?utm_source=${process.env.NEXT_PUBLIC_UTM}`,
    },
    { 
        label: 'ทาวน์โฮม',
        link: `https://assetwise.co.th/house?utm_source=${process.env.NEXT_PUBLIC_UTM}`,
    },
    { 
        label: 'โปรโมชั่น',
        link: `https://assetwise.co.th/promotion?utm_source=${process.env.NEXT_PUBLIC_UTM}`,
    },
    { 
        label: 'รู้จักแอสเซทไวส์',
        link: `https://assetwise.co.th/about-us?utm_source=${process.env.NEXT_PUBLIC_UTM}`,
    },
    { 
        label: 'นักลงทุนสัมพันธ์',
        link: `https://investor.assetwise.co.th/th/home?utm_source=${process.env.NEXT_PUBLIC_UTM}`,
    },
]

function Header() {
    return (
        <div className="bg-white shadow-lg z-10">
            <div className="container min-h-[50px] lg:min-h-16 flex items-center justify-center lg:justify-between">
                <Link title="AssetWise" target="_blank" href={{ pathname: 'https://assetwise.co.th', query: { utm_source: process.env.NEXT_PUBLIC_UTM } }} className="max-w-36 lg:max-w-fit">
                    <Image src={Logo} alt="Logo" width={160} height={17} />
                </Link>
                <ul className="gap-5 hidden lg:flex">
                    {menus.map((item: any, key: number) => (
                        <Link key={key} href={item.link} className="hover:text-ci-lightblue transition">{item.label}</Link>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Header;