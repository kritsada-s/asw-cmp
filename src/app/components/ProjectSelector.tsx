import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ProjectGroup, Project } from '../types';
import { projectData_BigMaxDeals, projectsData } from '../lib/projectData';
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
    const newGroup = projectData_BigMaxDeals.find(group => group.group_name === e.target.value);
    if (newGroup) {
      const projects = projectsData
        .filter(p => newGroup.projects_listed.includes(p.projectId || 0))
        .sort((a, b) => {
          const aIndex = newGroup.projects_listed.indexOf(a.projectId);
          const bIndex = newGroup.projects_listed.indexOf(b.projectId);
          return aIndex - bIndex;
        });
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
    const {children, subtitle, ...otherProps} = props;
    return (
      <div className='group-container'>
        <Radio
          {...otherProps}
          classNames={{
            base: cn(
              "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
              "flex-row-reverse max-w-[300px] xl:max-w-full w-full cursor-pointer rounded-lg gap-4 px-2 py-4 md:p-4 border-3 border-neutral-200",
              "data-[selected=true]:border-green-600 data-[selected=true]:bg-green-500 data-[selected=true]:text-white",
            ),
            wrapper: cn("group-data-[selected=true]:border-white"),
            control: cn("group-data-[selected=true]:bg-white")
          }}
        >
          {children}
        </Radio>
        { !selectedGroup && (
          <p className='subtitle text-neutral-500 text-[20px] leading-none text-center mt-4'>{subtitle}</p>
        ) }
      </div>
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
          <div className="project-selection-title text-center mb-10 flex flex-col gap-4">
            <h1 className='text-[28px] md:text-[48px] font-bold leading-tight text-[#0167bc]'>ASSETWISE ใจใหญ่ให้เต็มแม็กซ์</h1>
            <p className="text-neutral-900 text-[36px] leading-none font-bold">28 คอนโดใหม่และพร้อมอยู่กับข้อเสนอแบบเต็มแม็กซ์<br/> <span className='text-red-500'>ส่วนลดสูงสุด 1,500,000 บาท*</span> และรับ <span className='text-red-500'>Samsung Galaxy Z Fold 7*</span></p>
            <p className="text-neutral-800 text-[24px] leading-none">เลือกทำเลที่ใช่ ฟังก์ชั่นที่ครบ ตอบโจทย์ทุกความคุ้มค่า<br/>กับคอนโดจาก AssetWise เต็มใจให้เต็มแม็กซ์​</p>
          </div>
          <div className="w-full lg:w-4/5 mx-auto">
            <RadioGroup className='flex' value={selectedGroup?.group_key} orientation='horizontal' classNames={{ wrapper: cn("grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4") }}>
              { projectData_BigMaxDeals.map((group) => (
                <CustomRadio 
                  key={group.group_key} 
                  value={group.group_key} 
                  subtitle={group.group_sub_title}
                  onChange={() => {
                    const projects = projectsData
                      .filter(p => group.projects_listed.includes(p.projectId))
                      .sort((a, b) => {
                        const aIndex = group.projects_listed.indexOf(a.projectId);
                        const bIndex = group.projects_listed.indexOf(b.projectId);
                        return aIndex - bIndex;
                      });
                    setSelectedGroup({...group, projects_listed: projects});
                  }}
                >
                  <h3 className='md:text-2xl text-[22px] font-bold group-data-[selected=true]:text-white'>{group.group_name}</h3>
                </CustomRadio>  
              )) }
            </RadioGroup>
            <p className='text-neutral-800 text-[32px] leading-none text-center mt-7'>{selectedGroup?.group_desc}</p>
          </div>
        </div>
        { selectedGroup && <div className='bottom-arrow-pane'></div> }
      </div>
      <div className="project-selector-container" ref={projectsSelectorContainer}>
          {selectedGroup?.group_key === 'campus-zone' ? (
            <LifeNearUni 
              selectedGroup={selectedGroup} 
              selectedProject={selectedProject}
              handleProjectSelect={handleProjectSelect}
            />
          ) : (
            <div className="container grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
              {selectedGroup && selectedGroup.projects_listed.map((project) => (
                <ProjectBox key={project.projectId} project={project} selectedProject={selectedProject} handleProjectSelect={handleProjectSelect} />
              ))}
            </div>
          )}
      </div>
    </div>
  );
};

export default ProjectSelector;