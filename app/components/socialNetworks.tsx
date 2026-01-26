'use client'
import IconComponent, { IconName } from "./Icons"

export default function SocialNetworks({ name, className = "" }: { name: IconName, className?: string }) {
    return (
        <button className={`w-full bg-white/10 hover:bg-white/20 transition-all duration-200 rounded-lg p-4 flex items-center justify-center group ${className}`}>
            <div className="flex flex-col items-center gap-2">
                <IconComponent
                    name={name}
                    className="w-8 h-8 text-white group-hover:scale-110 transition-transform"
                />
                <span className="text-white text-sm font-medium hidden sm:block">
                    {name.replace('Icon', '')}
                </span>
            </div>
        </button>
    )
}