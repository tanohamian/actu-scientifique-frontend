'use client';




interface  InputProps{
    typeInput:string,
    placeholderInput:string,
    inputValue:string,
    setInputValue:(value:string)=>void
}

export default function InputComponent({typeInput,placeholderInput,inputValue,setInputValue} : InputProps){
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setInputValue(e.target.value)
    }
    return(
        <input type={typeInput} placeholder={placeholderInput} value={inputValue} onChange={handleChange} className="border border-borderInput-300 text-inputTextColor-200" />
    )
}