'use client'

import IconComponent, { IconName } from "./Icons"



export default function SocialNetworks({ name, className }: { name: IconName, className?: string }) {
    return (
        <div className="w-full bg-white/10 min-h-[400px] rounded-lg p-6 flex items-center justify-center">
            <IconComponent name={name} className=" w-12 h-12 md:w-24 md:h-24 lg:w-32 lg:h-32 text-white" />
        </div>
    )
}