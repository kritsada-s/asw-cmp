const CheckIconSVG = ({...props}) => {
  const {isSelected, isIndeterminate, disableAnimation, size, ...otherProps} = props;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check" {...otherProps}><path d="M20 6 9 17l-5-5"/></svg>
  )
}

const ExternalLinkIcon = ({...props}) => {
  const {isSelected, isIndeterminate, disableAnimation, size, ...otherProps} = props;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-external-link" {...otherProps}><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
  )
}

export { CheckIconSVG, ExternalLinkIcon }