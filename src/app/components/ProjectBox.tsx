import { cn } from "@nextui-org/react";

import Image from "next/image";
import { CheckIconSVG } from "../lib/svg";
import { Checkbox } from "@nextui-org/react";

function ProjectBox(props: any) {
  const { project, selectedProject, handleProjectSelect } = props;
    return (
      <div key={project.projectId} className={ `pid-${project.projectId} project-box shadow-md rounded-b-md bg-white flex md:flex-col`}>
        <div className='thumbnail w-1/2 md:w-full aspect-[3/4] bg-cover bg-top' style={{ backgroundImage: `url(https://assetwise.co.th/wp-content/uploads/${project.thumb})` }}></div>
        <div className='flex w-auto flex-col md:flex-row justify-center md:justify-between p-4 gap-2'>
          <div className='project-info'>
            { project.logo && <Image src={`https://assetwise.co.th/wp-content/uploads/${project.logo}`} alt={project.nameTH || ''} width={80} height={40} className='h-[42px] w-auto mb-2' /> }
            <p className="text-[24px] md:text-2xl font-medium leading-none">{project.nameTH}</p>
            <p className='text-[16px] md:text-xl text-neutral-500'>เริ่มต้น {project.price} ลบ.<span className='text-red-700'>*</span></p>
          </div>
          <div className="flex justify-between pt-4 md:pt-0">
            {/* <Link href={{ pathname:'https://assetwise.co.th/condominium'+project.link, query: { 'utm_source': HouseCondo68_WEB_Direct } }} target='_blank' className='text-[16px] flex items-center gap-1 underline text-neutral-600'>รายละเอียดโครงการ <ExternalLinkIcon size='12' /></Link> */}
            <Checkbox isSelected={selectedProject?.projectId === project.projectId} onValueChange={() => handleProjectSelect(project)} radius='none' size='lg' icon={<CheckIconSVG />} classNames={{ wrapper: cn("w-[35px] h-[35px] mr-0 rounded-sm group-data-[selected=true]:bg-green-500"), icon: cn("w-7 h-7") }} />
          </div>
        </div>
      </div>
    )
}

export default ProjectBox;