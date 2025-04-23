import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ProjectGroup, Project } from '../types';
import { projectData_BigMatchBigMove, projectData_HouseCondo25, projectsData } from '../lib/projectData';
import { Radio, RadioGroup } from "@nextui-org/react";
import { cn } from '@nextui-org/react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import LifeNearUni from './LifeNearUni';
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

  const handleGroupChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newGroup = projectData_HouseCondo25.find(group => group.group_name === e.target.value);
    if (newGroup) {
      const projects = projectsData.filter(p => newGroup.projects_listed.includes(p.projectId));
      setSelectedGroup({...newGroup, projects_listed: projects});
      setSelectedProject(null);
    }
  };  

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
      <div className="location-selector-container bg-white relative">
        <div className="container pt-10 px-5 pb-5">
          <div className="project-selection-title text-center mb-5">
            <h1 className='text-[28px] md:text-[36px] font-bold leading-tight text-[#0167bc]'>ASSETWISE <br className='md:hidden' />BIG MATCH BIG MOVE</h1>
          </div>
          <div className="w-full mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
              {projectData_BigMatchBigMove.map((project) => (
                <ProjectBox key={project} project={projectsData.find(p => p.projectId === project)} selectedProject={selectedProject} handleProjectSelect={handleProjectSelect} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectSelector;