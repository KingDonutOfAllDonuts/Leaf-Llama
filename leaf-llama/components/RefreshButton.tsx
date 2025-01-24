import { FaSyncAlt } from 'react-icons/fa';
import { twMerge } from 'tailwind-merge';

const RefreshButton = ({className='' ,onClick}) => {
  return (
    <FaSyncAlt
    className= {twMerge('w-5 h-5 transition-transform duration-300 hover:rotate-180', className)}
    onClick={()=> onClick()}
    />
  )
}
export default RefreshButton