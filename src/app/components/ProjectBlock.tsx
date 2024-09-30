import { useEffect, useMemo, useState } from "react";
import ProjectLinkButton from "./ProjectLinkButton";

const ProjectBlock = ({ mediaId, postId, projectId, onProjectData }: {
    mediaId: number;
    postId: number;
    projectId: number;
    onProjectData: (data: any) => void; }) => {

    const [imgUrl, setImgUrl] = useState('');
    const [title, setTitle] = useState('');

    useEffect(() => {
        const fetchData = async () => {
          try {
            const [mediaResponse, postResponse] = await Promise.all([
              fetch(`https://assetwise.co.th/wp-json/wp/v2/media/${mediaId}`),
              fetch(`https://assetwise.co.th/wp-json/wp/v2/condominium/${postId}?_fields=title,link,acf`)
            ]);
    
            const mediaData = await mediaResponse.json();
            const postData = await postResponse.json();
    
            setTitle(postData?.title.rendered);
            //handleProjectId(postData?.acf.project_id);
            setImgUrl(mediaData?.guid.rendered);
    
            // Send data to parent component
            onProjectData({
              media: mediaData,
              post: postData
            });
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
    }, [mediaId, postId, onProjectData]);

    return (
        <>
            { imgUrl && <img src={ imgUrl } alt="" width={500} height={500}/> }
            <p>{ projectId }</p>
            <p>{title}</p>
            <ProjectLinkButton/>
        </>
    );
}

export default ProjectBlock;