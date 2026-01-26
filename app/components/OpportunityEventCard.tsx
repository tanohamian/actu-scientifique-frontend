

interface OpportunityEventCardProps {
    title: string
    content : string
}
export default function OpportunityEventCard({title, content}: OpportunityEventCardProps){

    return(
        <article className="rounded-bl-none shadow-xl w-85 max-w-90  bg-[#AEB8C1] overflow-y-auto text-black font-bold p-5 h-100 text-xl">
            <h3>{title}</h3>
           <p>{content}</p>
        </article>
    )
}