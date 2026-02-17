

interface OpportunityEventCardProps {
    title: string
    content: string
}
export default function OpportunityEventCard({ title, content }: OpportunityEventCardProps) {

    return (
        <article className="rounded-bl-none shadow-xl w-85 max-w-90  overflow-y-auto text-black font-bold p-5 h-100 text-xl border-2 border-white/50 rounded-lg">
            <h3 className="text-white mb-2">{title}</h3>
            <p className="text-white">{content}</p>
        </article>
    )
}