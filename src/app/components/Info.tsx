import Image from "next/image";
import Info01D from '../images/info01-d.webp';
import Info01M from '../images/info01-m.webp';
import Info02D from '../images/why_asw-easylife_d_01.webp';
import Info02M from '../images/why_asw-easylife_m_01.webp';

function Info() {
  return (
    <>
      <section id='info_1'>
        <div className="container pt-10">
          <Image src={Info01M} alt='' className='w-full h-auto block md:hidden'/>
          <Image src={Info01D} alt='' className='w-full h-auto hidden md:block'/>
        </div>
      </section>
      <section id='info_2'>
        <div className="container px-0 md:px-auto pt-10 pb-7">
          <Image src={Info02D} alt='' className='w-full h-auto hidden md:block'/>
          <Image src={Info02M} alt='' className='w-full h-auto block md:hidden'/>
        </div>
      </section>
    </>
  );
}

export default Info;