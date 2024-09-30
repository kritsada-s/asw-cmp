import React, { useState } from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, Typography, SelectChangeEvent } from '@mui/material';
import Image from 'next/image';
import ProjectBlock from './ProjectBlock';
import ProjectLinkButton from './ProjectLinkButton';
import data from '../data.json';

interface ProjectsData {
  id: number;
  acf: {
    projects_group: {
      group_name: string;
      projects_listed: Project[]
    }[];
  };
}

interface Project {
  image: string;
  project: string;
}[]

interface ProjectSelectorProps {
  projectsData: ProjectsData;
  onSelectProject: (projectId: string) => void;
}

const ProjectSelector: React.FC<ProjectSelectorProps> = ({ projectsData, onSelectProject }) => {
  console.log(data);
  
  const [selectedGroup, setSelectedGroup] = useState<number>(0);
  const [selectedProject, setSelectedProject] = useState('')

  const handleGroupChange = (event: SelectChangeEvent<number>) => {
    setSelectedGroup(Number(event.target.value));
  };

  const handleSelectProject = (id: string) => {
    setSelectedProject(id)
    onSelectProject(id)
  }
  
  return (
    <Box mb={4}>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <FormControl variant="outlined" style={{ minWidth: 120 }}>
          <InputLabel>เลือกทำเลที่ต้องการ</InputLabel>
          <Select
            value={selectedGroup}
            onChange={handleGroupChange}
            label="เลือกทำเลที่ต้องการ"
          >
            {projectsData.acf.projects_group.map((group, index) => (
              <MenuItem key={index} value={index}>
                {group.group_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <div className='grid grid-cols-4 gap-5'>
        {projectsData.acf.projects_group[selectedGroup].projects_listed.map((project, key:number) => (
          <div>
            <div className={`border border-gray-300 rounded aspect-square cursor-pointer hover:bg-gray-300 mb-4 ${project.project === selectedProject ? 'bg-ci-blue text-white text-center':'bg-white'}`} key={key} 
              onClick={() => handleSelectProject(project.project)}>
              <ProjectBlock data={project} />
            </div>
            <ProjectLinkButton url={'https://assetwise.co.th'} />
          </div>
        ))}
      </div>
    </Box>
  );
};

export default ProjectSelector;