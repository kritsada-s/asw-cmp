import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import Image from 'next/image';
import { useState } from 'react';

const hotdeals = [
  {
    id: 1,
    image: 'https://assetwise.co.th/readytoMOVE-readytoMATCH/hotdeal/move-match_hotdeal_1.jpg',
    title: '',
    description: '',
  },
  {
    id: 2,
    image: 'https://assetwise.co.th/readytoMOVE-readytoMATCH/hotdeal/move-match_hotdeal_2.jpg',
    title: '',
    description: '',
  },
  {
    id: 3,
    image: 'https://assetwise.co.th/readytoMOVE-readytoMATCH/hotdeal/move-match_hotdeal_3.jpg',
    title: '',
    description: '',
  },
  {
    id: 4,
    image: 'https://assetwise.co.th/readytoMOVE-readytoMATCH/hotdeal/move-match_hotdeal_4.jpg',
    title: '',
    description: '',
  }, 
  {
    id: 5,
    image: 'https://assetwise.co.th/readytoMOVE-readytoMATCH/hotdeal/move-match_hotdeal_5.jpg',
    title: '',
    description: '',
  },
  {
    id: 6,
    image: 'https://assetwise.co.th/readytoMOVE-readytoMATCH/hotdeal/move-match_hotdeal_6.jpg',
    title: '',
    description: '',
  },
  {
    id: 7,
    image: 'https://assetwise.co.th/readytoMOVE-readytoMATCH/hotdeal/move-match_hotdeal_7.jpg',
    title: '',
    description: '',
  },
  {
    id: 8,
    image: 'https://assetwise.co.th/readytoMOVE-readytoMATCH/hotdeal/move-match_hotdeal_8.jpg',
    title: '',
    description: '',
  },
  {
    id: 9,
    image: 'https://assetwise.co.th/readytoMOVE-readytoMATCH/hotdeal/move-match_hotdeal_9.jpg', 
    title: '',
    description: '',
  },
  {
    id: 10,
    image: 'https://assetwise.co.th/readytoMOVE-readytoMATCH/hotdeal/move-match_hotdeal_10.jpg',
    title: '',
    description: '',
  },
  {
    id: 11,
    image: 'https://assetwise.co.th/readytoMOVE-readytoMATCH/hotdeal/move-match_hotdeal_11.jpg',
    title: '',
    description: '',
  },
  {
    id: 12,
    image: 'https://assetwise.co.th/readytoMOVE-readytoMATCH/hotdeal/move-match_hotdeal_12.jpg',
    title: '',
    description: '',
  },
  {
    id: 13,
    image: 'https://assetwise.co.th/readytoMOVE-readytoMATCH/hotdeal/move-match_hotdeal_13.jpg',
    title: '',
    description: '',
  },
  {
    id: 14,
    image: 'https://assetwise.co.th/readytoMOVE-readytoMATCH/hotdeal/move-match_hotdeal_14.jpg',
    title: '',
    description: '',
  },
  {
    id: 15,
    image: 'https://assetwise.co.th/readytoMOVE-readytoMATCH/hotdeal/move-match_hotdeal_15.jpg',
    title: '',
    description: '',
  },
  {
    id: 16,
    image: 'https://assetwise.co.th/readytoMOVE-readytoMATCH/hotdeal/move-match_hotdeal_16.jpg',
    title: '',
    description: '',
  },
  {
    id: 17,
    image: 'https://assetwise.co.th/readytoMOVE-readytoMATCH/hotdeal/move-match_hotdeal_17.jpg',
    title: '',
    description: '',
  },
  {
    id: 18,
    image: 'https://assetwise.co.th/readytoMOVE-readytoMATCH/hotdeal/move-match_hotdeal_18.jpg',
    title: '',
    description: '',
  }
  
]

const HotdealSlider = () => {
  return (
    <div id="hotdealSlider" className='py-10 lg:py-14 bg-gradient-to-tr from-[#eeb031] to-[#ffd16f] shadow-[0_5px_-5px_#000,0_-5px_-5px_#000]'>
      <Swiper
        spaceBetween={15}
        slidesPerView={1.5}
        centeredSlides={true}
        loop={true}
        speed={1500}
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          768: {
            slidesPerView: 2.5,
          },
          1280: {
            slidesPerView: 3.5,
          }
        }}
        //onInit={() => setIsSwiperReady(true)}
        // onSlideChange={() => console.log('slide change')}
        // onSwiper={(swiper) => console.log(swiper)}
      >
      { hotdeals.map((hotdeal) => (
        <SwiperSlide key={hotdeal.id} className='cursor-grab'>
          <Image src={hotdeal.image} alt={hotdeal.title} width={600} height={600} className='border-2 border-white' />
        </SwiperSlide>
      ))}
      </Swiper>
    </div>
  )
}

export default HotdealSlider