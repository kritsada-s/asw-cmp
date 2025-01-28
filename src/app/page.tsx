'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ProjectSelector from './components/ProjectSelector';
import RegistrationForm from './components/RegisterForm';
import { FormData, Project } from './types';
import Header from './components/Header';
import Banner from './images/AW_ASW-EasyLife_LDP-Banner_v1.webp';
import BannerM from './images/AW_ASW-EasyLife_LDP-M_Banner_v1.webp';
import Info from './images/info-mockup_01.jpg';
import Image from 'next/image';
import Footer from './components/Footer';
import Link from 'next/link';
import Swal from 'sweetalert2'
import logger from './utils/logger';

const Home = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [utmSource, setUtmSource] = useState<string>(`${process.env.NEXT_PUBLIC_UTM}`);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const utmFromUrl = searchParams.get('utm_source');
    if (utmFromUrl) {
      setUtmSource(`${utmFromUrl}_${process.env.NEXT_PUBLIC_UTM}`);
    }
  }, [searchParams]);

  const handleProjectSelect = (project: Project) => {
    //console.log(project);
    setSelectedProject(project);
  };

  const registerSwal = Swal.mixin({
    customClass: {
      confirmButton: 'bg-ci-blue text-white text-[24px] py-2 leading-tight'
    }
  })

  const handleFormSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    if (selectedProject) {
      try {
        // TODO: remove this
        // const response = await fetch('/api/v1/save-other-source', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({
        //     ...formData,
        //     ProjectID: selectedProject?.projectId,
        //     utm_source: utmSource,
        //     utm_campaign: searchParams.get('utm_campaign') || '',
        //     utm_medium: searchParams.get('utm_medium') || '',
        //     utm_term: searchParams.get('utm_term') || '',
        //     utm_content: searchParams.get('utm_content') || '',
        //     Ref: utmSource
        //   }),
        // });
    
        // if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
        // await response.json();
        router.push('/thankyou');
      } catch (error) {
        console.error('Error submitting form:', error);
        setSubmitError(error instanceof Error ? error.message : "An unexpected error occurred.");
      } finally {
        setIsSubmitting(false);
      }

    } else {
      registerSwal.fire({ title: 'กรุณาเลือกโครงการ', icon: 'warning', confirmButtonText: 'ตกลง' })
      setIsSubmitting(false)
    }
  };

  return (
    <main>
      <Header/>
      <Image src={Banner} width={1440} height={600} alt='' className='w-full hidden md:block h-auto'/>
      <Image src={BannerM} width={640} height={640} alt='' className='w-full h-auto block md:hidden'/>
      <Image src={Info} width={1440} height={600} alt='' className='w-full'/>
      <RegistrationForm 
        selectedProject={selectedProject} 
        onSubmit={handleFormSubmit}
        isSubmitting={isSubmitting}
        utmSource={utmSource}
      />
      {submitError && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {submitError}
        </div>
      )}
      <section id="terms">
        <div className="container py-5">
          <Link href={{ pathname:'https://bit.ly/3Y395fQ', query: { 'utm_source': 'BUFFET_1OCT_Project' } }} target='_blank' className='flex mx-auto px-5 py-1 leading-tight border border-blue-500 hover:bg-blue-600 hover:text-white rounded w-fit bg-white'>ข้อมูลเงื่อนไขเพิ่มเติม</Link>
        </div>
      </section>
      <Footer/>
    </main>
  );
}

export default function App () {
  return(
    <Suspense>
      <Home/>
    </Suspense>
  )
}