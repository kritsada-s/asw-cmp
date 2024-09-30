'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import ProjectSelector from './components/ProjectSelector';
import RegistrationForm from './components/RegisterForm';
import { FormData, Project } from './types';
import Header from './components/Header';
import Banner from './images/test-banner3000.webp';
import Image from 'next/image';
import Footer from './components/Footer';

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const router = useRouter();

  const handleProjectSelect = (project: Project) => {
    //console.log(project);
    setSelectedProject(project);
  };

  const handleFormSubmit = async (formData: FormData) => {
    // console.log(formData);
    // return
    try {
      const response = await fetch('/api/v1/save-other-source', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic YXN3X2Npc19jdXN0b21lcjphc3dfY2lzX2N1c3RvbWVyQDIwMjMh'
        },
        body: JSON.stringify(formData),
      });

      //router.push('/thankyou');

      if (response.ok) {
        router.push('/thankyou');
      } else {
        console.error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <main>
      <Header/>
      <Image src={Banner} width={1440} height={600} alt='' className='w-full h-auto'/>
      <ProjectSelector onSelectProject={handleProjectSelect} />
      <RegistrationForm selectedProject={selectedProject} onSubmit={handleFormSubmit} />
      <Footer/>
    </main>
  );
}