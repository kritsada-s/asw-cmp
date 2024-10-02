import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BannerM from "../images/buffet999-banner-m.webp";
import Image from "next/image";
import BackButton from "../components/BackButton";

export default function ThankYou() {
  return (
    <>
      <Header/>
      <section id="thankyouBody" className="min-h-[60vh] py-10 bg-gradient-to-b from-blue-50 to-white">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between shadow">
            <Image src={BannerM} alt="" width={500} height={500}/>
            <div className="box flex flex-col items-center bg-white w-full p-5 justify-center">
              <h2 className="text-[28px] lg:text-[36px]">ขอบคุณสำหรับการลงทะเบียน</h2>
              <p className="text-neutral-600 text-[18px]">เจ้าหน้าที่จะติดต่อท่านกลับเพื่อแจ้งสิทธิพิเศษจากโครงการ</p>
              <p className="text-neutral-600 text-[18px] mb-5">สอบถามข้อมูลเพิ่มเติม โทร: <Link className="underline" href='tel:021680000'>02-168-0000</Link></p>
              <BackButton/>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </>
  );
}