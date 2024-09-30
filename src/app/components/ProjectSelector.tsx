import React, { useState } from 'react';
import { ProjectGroup, Project } from '../types';
import { projectData } from '../lib/projectData';
import { Select, SelectItem } from "@nextui-org/react";
import ProjectLinkButton from './ProjectLinkButton';
import CheckIcon from '../images/check-o.png';
import Link from 'next/link';
import Image from 'next/image';

interface ProjectSelectorProps {
  onSelectProject: (project: Project) => void;
}

const ProjectSelector: React.FC<ProjectSelectorProps> = ({ onSelectProject }) => {
  const [selectedGroup, setSelectedGroup] = useState<ProjectGroup>(projectData[0]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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

  return (
    <div id='projectSelector' className="container">
      <div className="py-10">
        <div className="flex justify-end items-center mb-4 gap-4">
          <p>เลือกทำเลที่ต้องการ</p>
          <Select
            className="max-w-xs"
            onChange={handleGroupChange}
            radius='sm'
            variant='bordered'
            aria-labelledby='location'
            defaultSelectedKeys={[selectedGroup.group_name]}
          >
            {projectData.map((group) => (
              <SelectItem key={group.group_name} value={group.group_name}>
                {group.group_name}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {selectedGroup.projects_listed.map((project) => (
            <div key={project.projectId}>
              <div
                className={`border rounded-[4px] overflow-hidden cursor-pointer mb-3 relative ${
                  selectedProject?.projectId === project.projectId
                    ? 'p-selected group bg-orange-500'
                    : ''
                }`}
                onClick={() => handleProjectSelect(project)}
              >
                <Image src={CheckIcon} alt='' width={120} height={120} className='absolute left-1/2 -ml-[60px] top-1/2 -mt-[60px] transition -translate-y-[250px] group-[.p-selected]:translate-y-0 opacity-100'/>
                <img src={`https://assetwise.co.th/promotion-campaign/medias/images/${project.image}`} 
                alt={project.project} width={300} height={300} className="w-full object-cover group-[.p-selected]:opacity-20 transition" />
                <p className="hidden text-sm">{project.project}</p>
              </div>
              <Link href={{ pathname:'https://assetwise.co.th/condominium'+project.link, query: { 'utm_source': 'Buffet1Oct_Project' } }} target='_blank' className='flex mx-auto px-5 py-1 leading-tight border border-blue-500 hover:bg-blue-600 hover:text-white rounded text-sm w-fit'>รายละเอียดโครงการ</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectSelector;