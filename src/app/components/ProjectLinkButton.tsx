const ProjectLinkButton = ({url}:{url: string}) => {
    function handleRedirect() {
        console.log('go to');
    }
    return(
        <button onClick={handleRedirect} className="flex mx-auto px-5 py-1 leading-tight border border-blue-500 hover:bg-blue-600 hover:text-white rounded text-sm">รายละเอียดโครงการ</button>
    )
}

export default ProjectLinkButton