import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ProjectGroup, Project } from '../types';
import { projectData_SuperDeals, projectsData } from '../lib/projectData';
import { Radio, RadioGroup } from "@nextui-org/react";
import { cn } from '@nextui-org/react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ProjectBox from './ProjectBox';

interface ProjectSelectorProps {
  onSelectProject: (project: Project) => void;
  selectedLocation: string | null;
}

const ProjectSelector: React.FC<ProjectSelectorProps> = ({ onSelectProject, selectedLocation }) => {
  const [selectedGroup, setSelectedGroup] = useState<ProjectGroup | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isProjectSelectorOpen, setIsProjectSelectorOpen] = useState(false);
  const projectsSelectorContainer = useRef<HTMLDivElement>(null);
  const [projectSelectorHeight, setProjectSelectorHeight] = useState(0);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const location = searchParams.get('loc') || searchParams.get('location');
    if (location) {
      console.log('Location from URL:', location);
    }
  }, []);

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
    onSelectProject(project);
    if (project) {
      const targetSection = document.querySelector('#registerForm');
        if (targetSection) {
            gsap.to(window, {
                duration: 0.6,
                scrollTo: { 
                    y: targetSection,
                    offsetY: 70
                },
                ease: "power2.inOut"
            });
        }
    }
  };

  const CustomRadio = (props: any) => {
    const {children, ...otherProps} = props;
    return (
      <Radio
        {...otherProps}
        classNames={{
          base: cn(
            "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
            "flex-row-reverse max-w-[300px] xl:max-w-full cursor-pointer rounded-lg gap-4 px-2 py-4 md:p-4 border-3 border-neutral-200",
            "data-[selected=true]:border-green-600 data-[selected=true]:bg-green-500 data-[selected=true]:text-white",
          ),
          wrapper: cn("group-data-[selected=true]:border-white"),
          control: cn("group-data-[selected=true]:bg-white")
        }}
      >
        {children}
      </Radio>
    );
  };

  const firstRenderRef = useRef(true);
  const v = '15012025';

  useGSAP(() => {
    if (firstRenderRef.current) {
      gsap.set(projectsSelectorContainer.current, { height: 0, opacity: 0, padding: '0' });
      firstRenderRef.current = false;
    }
  }, []);

  useGSAP(() => {
    if (selectedGroup) {
      gsap.fromTo('.project-box', {
        transform: 'translateY(-50px)',
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
        stagger: 0.1,
      }, {
        transform: 'translateY(0)',
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out',
        stagger: 0.1,
      });
    }
  }, [selectedGroup]);

  useGSAP(() => {
    if (selectedGroup) {
      gsap.to(projectsSelectorContainer.current, {
        height: 'auto',
        padding: '85px 0 40px',
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out',
      });
    }
  }, [selectedGroup]);

  return (
    <div id='projectSelector' className="bg-gradient-to-b from-blue-50 to-white">
      <div className='container px-4 md:px-5 py-10'>
        <div className='headline text-center font-light leading-tight text-neutral-800'>
          <h1 className='leading-tight text-neutral-800 mb-2 font-bold text-[50px]'>SUPER DEALS แรงแห่งปี!</h1>
          <p className='text-neutral-700 font-light text-2xl'>31 ก.ค. - 6 ส.ค. นี้ ที่บูธ MEGA Bangna โซนหน้า IKEA<br/>
          พบกับโปรงแรงแห่งปี จองน้อย แจกหนัก ผ่อนสบาย<br/>
          กับ 9 คอนโด จาก AssetWise</p>
        </div>
      </div>
      <div className='container px-4 md:px-5 py-10'>
        <div className="row-content grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {projectData_SuperDeals.map((projectId) => (
            <ProjectBox key={projectId} project={projectsData.find(p => p.projectId === projectId)} selectedProject={selectedProject} handleProjectSelect={handleProjectSelect}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectSelector;