
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
        <a href={url} target="_blank" rel="noopener noreferrer">
            <article className="rounded-bl-none shadow-xl w-120 max-w-full  overflow-y-auto text-black font-bold p-5 border-2 border-white/50 rounded-lg">
                {isScholarship ? <FontAwesomeIcon icon={faGraduationCap} className='text-white mb-2' /> : <FontAwesomeIcon icon={faBookOpen} className='text-white mb-2' />}
                <p className="text-white">{content}</p>
            </article>
        </a>

    )
}