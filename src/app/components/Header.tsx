import Image from "next/image";
import Link from "next/link";
import { metadata } from "../layout";

const menus = [
    { 
        label: 'คอนโดมิเนียม',
        link: '',
    },
    { 
        label: 'ทาวน์โฮม',
        link: '',
    },
    { 
        label: 'โปรโมชั่น',
        link: '',
    },
    { 
        label: 'รู้จักแอสเซทไวส์',
        link: '',
    },
    { 
        label: 'นักลงทุนสัมพันธ์',
        link: '',
    },
]

function Header() {
    return (
        <div className="bg-white shadow-lg z-10">
            <div className="container min-h-20 flex items-center justify-between">
                <Link title="AssetWise" target="_blank" href={{ pathname: 'https://assetwise.co.th', query: { utm_source: 'buffet999-MainWeb_2024' } }}>
                    <Image src={require('../images/asw_logo_hr.png')} alt="Logo" width={200} height={22}/>
                </Link>
                <ul className="flex gap-5">
                    {menus.map((item: any, key: number) => (
                        <Link key={key} href={item.link} className="hover:text-ci-lightblue transition">{item.label}</Link>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Header;