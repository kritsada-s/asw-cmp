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
import axios from 'axios';

// Create a custom Axios instance
const api = axios.create({
  baseURL: 'https://api.assetwise.co.th',
  withCredentials: true, // This is important for CORS if the server uses credentials
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Basic YXN3X2Npc19jdXN0b21lcjphc3dfY2lzX2N1c3RvbWVyQDIwMjMh',
  },
});

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const router = useRouter();

  const handleProjectSelect = (project: Project) => {
    //console.log(project);
    setSelectedProject(project);
  };

  const handleFormSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await api.post('/cis/api/Customer/SaveOtherSource', {
        ...formData,
        ProjectID: selectedProject?.projectId
      });

      if (response.status === 200 || response.status === 201) {
        console.log('Form submitted successfully:', response.data);
        router.push('/thankyou');
      } else {
        setSubmitError("Submission failed. Please try again.");
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 403) {
          setSubmitError("Access forbidden. This may be due to CORS restrictions. Ensure the API allows requests from localhost:3000");
        } else if (error.code === 'ERR_NETWORK') {
          setSubmitError("Network error. This might be due to CORS. Check if the API allows requests from localhost:3000");
        } else {
          setSubmitError(error.response?.data?.message || "An error occurred during submission. Please try again.");
        }
      } else {
        setSubmitError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      <Header/>
      <Image src={Banner} width={1440} height={600} alt='' className='w-full h-auto'/>
      <ProjectSelector onSelectProject={handleProjectSelect} />
      <RegistrationForm 
        selectedProject={selectedProject} 
        onSubmit={handleFormSubmit}
        isSubmitting={isSubmitting}
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