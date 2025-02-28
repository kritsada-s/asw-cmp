import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ProjectGroup, Project } from '../types';
import { projectData_HouseCondo25, projectsData } from '../lib/projectData';
import { Checkbox, Radio, RadioGroup } from "@nextui-org/react";
import ProjectLinkButton from './ProjectLinkButton';
import CheckIcon from '../images/check-o.png';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@nextui-org/react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { CheckIconSVG, ExternalLinkIcon } from '../lib/svg';

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
            <h1 className='text-[36px] font-bold leading-none'>AssetWise Grand Sales</h1>
            <p className="text-neutral-500">มหกรรมบ้านและคอนโดครั้งที่ 47</p>
          </div>
          <div className="w-full lg:w-2/3 mx-auto">
            <RadioGroup className='flex' value={selectedGroup?.group_key} orientation='horizontal' classNames={{ wrapper: cn("grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4") }}>
              { projectData_HouseCondo25.map((group) => (
                <CustomRadio 
                  key={group.group_key} 
                  value={group.group_key} 
                  onChange={() => {
                    const projects = projectsData.filter(p => group.projects_listed.includes(p.projectId));
                    setSelectedGroup({...group, projects_listed: projects});
                  }}
                >
                  <h3 className='md:text-lg lg:text-2xl group-data-[selected=true]:text-white'>{group.group_name}</h3>
                </CustomRadio>  
              )) }
            </RadioGroup>
          </div>
        </div>
        { selectedGroup && <div className='bottom-arrow-pane'></div> }
      </div>
      <div className="project-selector-container" ref={projectsSelectorContainer}>
        <div className="container grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {selectedGroup && selectedGroup.projects_listed.map((project) => (
            <div key={project.projectId} className='project-box shadow-md rounded-b-md bg-white flex md:flex-col'>
              <div className='thumbnail w-1/2 md:w-full aspect-[3/4] bg-cover bg-top' style={{ backgroundImage: `url(https://assetwise.co.th/wp-content/uploads/${project.thumb})` }}></div>
              <div className='flex w-auto flex-col md:flex-row justify-center md:justify-between p-4 gap-2'>
                <div className='project-info'>
                  { project.logo && <Image src={`https://assetwise.co.th/wp-content/uploads/${project.logo}`} alt={project.nameTH || ''} width={80} height={40} className='h-[42px] w-auto mb-2' /> }
                  <p className="text-[24px] md:text-2xl font-medium leading-none">{project.nameTH}</p>
                  <p className='text-[16px] md:text-lg text-neutral-500'>เริ่มต้น {project.price} บาท<span className='text-red-700'>*</span></p>
                </div>
                <div className="flex justify-between pt-4 md:pt-0">
                  {/* <Link href={{ pathname:'https://assetwise.co.th/condominium'+project.link, query: { 'utm_source': process.env.UTM_TEXT } }} target='_blank' className='text-[16px] flex items-center gap-1 underline text-neutral-600'>รายละเอียดโครงการ <ExternalLinkIcon size='12' /></Link> */}
                  <Checkbox isSelected={selectedProject?.projectId === project.projectId} onValueChange={() => handleProjectSelect(project)} radius='none' size='lg' icon={<CheckIconSVG />} classNames={{ wrapper: cn("w-[35px] h-[35px] mr-0 rounded-sm group-data-[selected=true]:bg-green-500"), icon: cn("w-7 h-7") }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectSelector;