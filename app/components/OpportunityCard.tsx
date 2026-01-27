
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
interface OpportunityCardProps {
    isScholarship: boolean
    content : string
    url: string
}
export default function OpportunityCard({isScholarship, content, url}: OpportunityCardProps){

    return(
        <a href={url}>
            <article className="rounded-bl-none shadow-xl w-120 max-w-full bg-[#AEB8C1] overflow-y-auto text-black font-bold p-5">
                {isScholarship?  <FontAwesomeIcon icon={faGraduationCap}/> : <FontAwesomeIcon icon={faBookOpen}/>}
                <p>{content}</p>
            </article>
        </a>
        
    )
}