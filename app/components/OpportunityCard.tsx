
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
interface OpportunityCardProps {
    isScholarship: boolean
    content : string
}
export default function OpportunityCard({isScholarship, content}: OpportunityCardProps){

    return(
        <section className="bg-gray rounded-lg shadow-xl max-w-2xl w-50  overflow-y-auto text-white">
           {isScholarship?  <FontAwesomeIcon icon={faGraduationCap}/> : <FontAwesomeIcon icon={faBookOpen}/>}
           <p>{content}</p>
        </section>
    )
}