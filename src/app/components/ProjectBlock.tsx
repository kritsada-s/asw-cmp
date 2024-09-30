import Image from "next/image";
import { useEffect, useState } from "react";

interface Project {
  image: string;
  project: string;
}[]

async function fetchMediaData(mediaId: string) {
  const url = `https://assetwise.co.th/wp-json/wp/v2/media/${mediaId}?_fields=link`;
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    const link = data.link;
    if (!link) {
      throw new Error('Link not found in the response');
    }
    return link;
  } catch (error) {
    console.error("There was a problem fetching the media data:", error);
    throw error;
  }
}

const ProjectBlock = ( {data} : {data: Project}) => {
  const [img, setImg] = useState('')
  const [imgLoaded, setImgLoaded] = useState(true)
  useEffect(()=>{
    fetchMediaData(data.image).then(setImg)
    setImgLoaded(false)
  }, [data.image]);
  return (
    <>
      <p>{ data.project }</p>
      { imgLoaded ? 'Loading...' : <Image src={img} alt="" width={320} height={320}/> }
    </>
  );
}

export default ProjectBlock;