import Image from "next/image";
import Link from "next/link";
import Logo from "../images/asw_logo_hr.png";
import { metadata } from "../layout";

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
    return (
        <div className="bg-white shadow-lg z-10">
            <div className="container min-h-[60px] lg:min-h-20 flex items-center justify-center lg:justify-between">
                <Link title="AssetWise" target="_blank" href={{ pathname: 'https://assetwise.co.th', query: { utm_source: 'Tumthung-13Jan25-MainWeb_2024' } }} className="max-w-36 lg:max-w-fit">
                    <Image src={Logo} alt="Logo" width={200} height={22} />
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