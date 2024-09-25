import Image from "next/image";

export default async function Home() {
  let data = await fetch('https://assetwise.co.th/wp-json/wp/v2/condominium?per_page=100');
  let posts = await data.json()  
  return (
    <div className="container mx-auto">
      { posts.map((post:any, key:number)=>(
        <p key={key}>{post?.title?.rendered}</p>
      )) }
    </div>
  );
}
