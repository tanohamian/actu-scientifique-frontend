
'use client';

interface ButtonText{
    textButton:string,
    onclick ?: ()=>void
}

export default function ButtonComponent({textButton,onclick}:ButtonText){
    return (
        <button className="text-white bg-secondary p-6 rounded-md" onClick={onclick}  >
            {textButton}
        </button>
    )
}