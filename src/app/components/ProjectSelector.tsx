import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ProjectGroup, Project } from '../types';
import { projectData } from '../lib/projectData';
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
}

const ProjectSelector: React.FC<ProjectSelectorProps> = ({ onSelectProject }) => {
  const [selectedGroup, setSelectedGroup] = useState<ProjectGroup | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isProjectSelectorOpen, setIsProjectSelectorOpen] = useState(false);
  const projectsSelectorContainer = useRef<HTMLDivElement>(null);
  const [projectSelectorHeight, setProjectSelectorHeight] = useState(0);

  const handleGroupChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newGroup = projectData.find(group => group.group_name === e.target.value);
    if (newGroup) {
      setSelectedGroup(newGroup);
      setSelectedProject(null);
    }
  };

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
    onSelectProject(project);
  };

  const CustomRadio = (props: any) => {
    const {children, ...otherProps} = props;
    return (
      <Radio
        {...otherProps}
        classNames={{
          base: cn(
            "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
            "flex-row-reverse max-w-[300px] cursor-pointer rounded-lg gap-4 px-2 py-4 md:p-4 border-3 border-neutral-200",
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
  const v = '13012025';

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
        <div className="container pt-10 px-5 pb-10">
          <h3 className='project-selector-title relative pb-5 text-[36px] font-bold mb-7 text-center leading-none'>เลือกทำเลที่คุณสนใจ</h3>
          <RadioGroup className='flex' orientation='horizontal' classNames={{ wrapper: cn("grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4") }}>
            { projectData.map((group) => (
              <CustomRadio key={group.group_name} value={group.group_name} onChange={() => setSelectedGroup(group)}>
                <h3 className='text-lg md:text-2xl group-data-[selected=true]:text-white'>{group.group_name}</h3>
              </CustomRadio>  
            )) }
          </RadioGroup>
        </div>
        { selectedGroup && <div className='bottom-arrow-pane'></div> }
      </div>
      <div className="project-selector-container" ref={projectsSelectorContainer}>
        <div className="container grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {selectedGroup && selectedGroup.projects_listed.map((project) => (
            <div key={project.projectId} className='project-box shadow-md rounded-b-md'>
              <Image
                src={`https://assetwise.co.th/promotion-campaign/medias/images/Tumthung/Tumthung_${project.image}?v=${v}`}
                alt={project.project}
                width={300}
                height={300}
                loading="lazy"
                className="w-full object-cover group-[.p-selected]:opacity-20 transition"
                priority={false}
              />
              <p className="hidden text-sm">{project.project}</p>
              <div className='flex justify-between p-4'>
                <Link href={{ pathname:'https://assetwise.co.th/condominium'+project.link, query: { 'utm_source': 'Tumthung_13JAN25_Project' } }} target='_blank' className='text-[16px] flex items-center gap-1 underline text-neutral-600'>รายละเอียดโครงการ <ExternalLinkIcon size='12' /></Link>
                <Checkbox isSelected={selectedProject?.projectId === project.projectId} onValueChange={() => handleProjectSelect(project)} radius='none' size='lg' icon={<CheckIconSVG />} classNames={{ wrapper: cn("w-[35px] h-[35px] mr-0 rounded-sm group-data-[selected=true]:bg-green-500"), icon: cn("w-7 h-7") }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectSelector;