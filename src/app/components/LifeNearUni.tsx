import { Project, ProjectGroup } from "../types";
import ProjectBox from "./ProjectBox";

interface LifeNearUniProps {
  selectedGroup: ProjectGroup;
  selectedProject: Project | null;
  handleProjectSelect: (project: Project) => void;
}

function LifeNearUni({ selectedGroup, selectedProject, handleProjectSelect }: LifeNearUniProps) {

  const uni = [
    {
      key: 'ku',
      name: 'ม.เกษตรฯ',
      projects: []
    },
    {
      key: 'rsu',
      name: 'ม.รังสิต',
      projects: []
    },
    {
      key: 'mu',
      name: 'ม.มหิดล ศาลายา',
      projects: []
    },
    {
      key: 'kmitl',
      name: 'ม.เทคโนโลยีพระจอมเกล้าลาดกระบัง',
      projects: []
    },
    {
      key: 'kmutt',
      name: 'ม.เทคโนโลยีพระจอมเกล้าธนบุรี',
      projects: []
    },
  ]

  // Initialize projectsByUniversity object
  const projectsByUniversity: { [key: string]: Project[] } = {};

  // Initialize uni projects arrays
  uni.forEach(u => {
    projectsByUniversity[u.key] = [];
  });

  // Group projects by university
  selectedGroup.projects_listed.forEach(project => {
    if (project.university) {
      const matchingUni = uni.find(u => project.university === u.key);
      if (matchingUni) {
        projectsByUniversity[matchingUni.key].push(project);
      }
    }
  });

  return (
    <div>
      {Object.keys(projectsByUniversity).map((university, index) => (
        <div key={index}>
          <div className="container">
            <h3 className="text-3xl lg:text-4xl font-bold mb-3 lg:mb-5 text-neutral-800">{uni.find(u => u.key === university)?.name}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 mb-10">
            {projectsByUniversity[university].map((project) => (
              <ProjectBox key={project.projectId} project={project} selectedProject={selectedProject} handleProjectSelect={handleProjectSelect} />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default LifeNearUni;