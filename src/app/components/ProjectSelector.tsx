import React, { useState } from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, Typography, SelectChangeEvent } from '@mui/material';

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

interface ProjectSelectorProps {
  projectsData: ProjectsData;
  onSelectProject: (projectId: string) => void;
}

const ProjectSelector: React.FC<ProjectSelectorProps> = ({ projectsData, onSelectProject }) => {
  const [selectedGroup, setSelectedGroup] = useState<number>(0);

  const handleGroupChange = (event: SelectChangeEvent<number>) => {
    setSelectedGroup(Number(event.target.value));
  };

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
          <div className='border border-gray-300 rounded aspect-square cursor-pointer hover:bg-gray-300' key={key} 
            onClick={() => onSelectProject(project.project)}>
            <p>{project.image}</p>
            <Typography>Project ID: {project.project}</Typography>
          </div>
        ))}
      </div>
    </Box>
  );
};

export default ProjectSelector;