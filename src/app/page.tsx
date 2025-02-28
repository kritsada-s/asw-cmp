'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ProjectSelector from './components/ProjectSelector';
import RegistrationForm from './components/RegisterForm';
import { FormData, Project } from './types';
import Header from './components/Header';
import Banner from './images/AW_TunThueng_RV2_d.png';
import BannerM from './images/AW_TunThueng_RV2_m.jpg';
import Image from 'next/image';
import Footer from './components/Footer';
import Link from 'next/link';
import Swal from 'sweetalert2'

const Home = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [utmSource, setUtmSource] = useState<string>('Tumthung_13JAN25_MainWeb');
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const utmFromUrl = searchParams.get('utm_source');
    const location = searchParams.get('location') || searchParams.get('loc');
    
    if (utmFromUrl) {
      setUtmSource(`${utmFromUrl}_Tumthung_13JAN25_MainWeb`);
    }

    if (location) {
      setSelectedLocation(location);
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
        const response = await fetch('https://node.assetwise.dev/webhook/promotion-campaign', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...formData,
            ProjectID: selectedProject?.projectId,
            utm_source: utmSource,
            utm_campaign: searchParams.get('utm_campaign') || '',
            utm_medium: searchParams.get('utm_medium') || '',
            utm_term: searchParams.get('utm_term') || '',
            utm_content: searchParams.get('utm_content') || '',
            Ref: utmSource
          }),
        });
    
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
        await response.json();
        router.push('/thankyou');
      } catch (error) {
        console.error('Error submitting form:', error);
        //setSubmitError(error instanceof Error ? error.message : "An unexpected error occurred.");
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
      <ProjectSelector onSelectProject={handleProjectSelect} selectedLocation={selectedLocation} />
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