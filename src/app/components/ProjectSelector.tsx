import React, { useState } from 'react';
import { Project } from '../types';
import { easyLifeData } from '../lib/projectData';
import Link from 'next/link';
import Image from 'next/image';
import { FaCheck } from 'react-icons/fa';

interface ProjectSelectorProps {
  onSelectProject: (project: Project) => void;
  utmSource: string;
}

const ProjectSelector: React.FC<ProjectSelectorProps> = ({ onSelectProject, utmSource }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const ProjectBlock = ({ project }: { project: Project }) => {
    return (
      <div key={project.projectId} className={`rounded shadow-md border border-transparent hover:border-orange-500 transition-all duration-300 ${selectedProject?.projectId === project.projectId ? 'border-green-600' : ''}`}>
        <div className='flex bg-white rounded w-full'>
          <Image src={`https://assetwise.co.th/wp-content/uploads${project.image}`} alt={project.project} width={100} height={100} className='w-1/2 h-auto bg-neutral-200 aspect-square object-cover' />
          <div className='flex flex-col gap-2 p-4 w-full justify-between'>
            <div className="top">
              <Image src={`https://assetwise.co.th/wp-content/uploads${project.logo}`} alt={project.project} width={100} height={100} className='w-20 h-auto' />
              <h3 className='font-bold text-neutral-800'>{project.project}</h3>
            </div>
            <div className="bottom flex items-center gap-3">
              <button onClick={() => handleProjectSelect(project)} className={`${selectedProject?.projectId === project.projectId ? 'bg-green-600' : 'bg-ci-blue'} text-white w-20 h-8 rounded font-lighter text-base`}>{selectedProject?.projectId === project.projectId ? <FaCheck className='w-5 h-auto mx-auto' /> : 'จองเลย'}</button>
              <Link href={{ pathname: `/project/${project.key}`, query: { 'utm_source': utmSource } }} target='_blank' className='text-sm text-neutral-500'>ดูรายละเอียด</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
    onSelectProject(project);
  };

  return (
    <div id='projectSelector' className="bg-gradient-to-b from-blue-50 to-white">
      <div className="container py-10 flex flex-col gap-4">
        <h1 className='text-[32px] md:text-[46px] text-center'>เลือกโครงการที่คุณสนใจ</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {easyLifeData.map((project) => (
            <ProjectBlock key={project.projectId} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectSelector;