
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
interface OpportunityCardProps {
    isScholarship: boolean
    content: string
    url: string
}
export default function OpportunityCard({ isScholarship, content, url }: OpportunityCardProps) {

    return (
        <a href={url} target="_blank" rel="noopener noreferrer" className='w-fit'>
            <article className="rounded-lg shadow-xl w-120 max-w-full bg-[#AEB8C150] overflow-y-auto text-white font-bold p-5">
                {isScholarship ? <FontAwesomeIcon icon={faGraduationCap} /> : <FontAwesomeIcon icon={faBookOpen} />}
                <p>{content}</p>
            </article>
        </a>

    )
}