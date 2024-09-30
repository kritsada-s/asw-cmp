'use client'

import React, { useState, useEffect } from 'react';
import { Container, Box, Typography } from '@mui/material';
import ProjectSelector from './components/ProjectSelector';
import RegisterForm from './components/RegisterForm';
import Image from 'next/image';
import Header from './components/Header';

interface ProjectsData {
  id: number;
  acf: {
    projects_group: {
      group_name: string;
      projects_listed: {
        image: string;
        project: string;
      }[]
    }[];
  };
}

export default function Home() {
  const [projectsData, setProjectsData] = useState<ProjectsData | null>(null);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>(null);

  useEffect(() => {
    fetch('https://assetwise.co.th/wp-json/wp/v2/promotion/24758')
      .then((response) => response.json())
      .then((data) => setProjectsData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleProjectSelect = (projectId: string) => {
    setSelectedProject(projectId);
  };

  const handleFormSubmit = (formValues: any) => {
    const combinedData = {
      ...formValues,
      selectedProject,
    };
    setFormData(combinedData);
  };

  return (
    <>
      <Header/>
      <Image src={require('./images/test-banner3000.webp')} alt='' width={1440} height={600} className='w-full mb-8'/>
      <div>
        <div className="container">
          <h2 className='text-5xl text-center'>
            บุฟเฟ่ต์ 999 สุขได้ไม่อั้น
          </h2>
          {projectsData && (
            <ProjectSelector
              projectsData={projectsData}
              onSelectProject={handleProjectSelect}
            />
          )}
        </div>
        <RegisterForm onSubmit={handleFormSubmit} />
        {formData && (
          <Box mt={4}>
            <Typography variant="h6">Submitted Form Data:</Typography>
            <pre>{JSON.stringify(formData, null, 2)}</pre>
          </Box>
        )}
      </div>
    </>
  );
}