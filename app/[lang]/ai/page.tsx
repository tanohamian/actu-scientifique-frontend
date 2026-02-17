"use client"

import React, { useState } from 'react'
import styles from "@styles/AI.module.scss"
import { ask } from '../actions/chatAI'

export default function AiPage() {
    const [question, setQuestion] = useState<string>("")
    const [messages, setMessages] = useState<{sender : string, message : string}[]>([])
    const handleAsk = async () =>{
        if (!question) {
            alert("Veuillez entrer un message à envoyer")
            return
        }
        messages.push({sender: "user", message: question})
        const response = await ask(question)
        messages.push({sender: "ai", message: response as string})

        setMessages(messages)
        setQuestion("")
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setQuestion(e.target.value);
      };
  return (
    <div className={styles.mainWrapper}>
      <article>
        <h3>Ai chat</h3>
        <section>
            {
                messages.map((message, index)=>
                <div key={index}>
                    <p className={message.sender === "ai" ?  styles.aiMessage : styles.userMessage}>{message.message}</p>
                </div>)
            }
        </section> 
        <section> 
            <input 
                placeholder="Votre message..." 
                className={styles.questionField} 
                value={question}
                onChange={handleChange}
            />
            <button onClick={()=>handleAsk()}>Envoyer</button>
        </section>
        
      </article>
      
    </div>
  )
}
