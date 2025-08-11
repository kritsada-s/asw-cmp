import { Project, ProjectGroup } from "../types";
import ProjectBox from "./ProjectBox";

interface LifeNearUniProps {
  selectedGroup: ProjectGroup;
  selectedProject: Project | null;
  handleProjectSelect: (project: Project) => void;
}

const projects_listed_group = [
  {
      "group_name": "ม.เกษตรฯ​",
      "projects": [61, 76]
  },
  {
      "group_name": "ม.รังสิต / ม.กรุงเทพ(รังสิต)",
      "projects": [59, 74, 93, 94, 104]
  },
  {
      "group_name": "ม.มหิดล ศาลายา​​",
      "projects": [89, 99]
  },
  {
      "group_name": "โรงเรียนบดินทร์เดชา​​",
      "projects": [98]
  }
]

function LifeNearUni({ selectedGroup, selectedProject, handleProjectSelect }: LifeNearUniProps) {

  const uni = [
    {
      key: 'ku',
      name: 'ม.เกษตรฯ',
      projects: []
    },
    {
      key: 'rangsit',
      name: 'ม.รังสิต / ม.กรุงเทพ(รังสิต)​',
      projects: []
    },
    {
      key: 'salaya',
      name: 'ม.มหิดล ศาลายา​​',
      projects: []
    },
    {
      key: 'bodin',
      name: 'โรงเรียนบดินทร์เดชา',
      projects: []
    }
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