import { useEffect, useState } from 'react'
import ChatBox from './components/ChatBox'

function App() {

  const [messages, setMessages] = useState([])

  useEffect(()=>{
    
   const storedMesseges = JSON.parse(localStorage.getItem("messeges"))

   if(storedMesseges?.length > 0 ){
    setMessages(storedMesseges)
   }
  },[])

  useEffect(()=>{
    localStorage.setItem("messeges", JSON.stringify(messages))
  },[messages])
  

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 justify-center items-center">
      <h1 className='text-4xl mb-4'>AI Chatbot</h1>
      <ChatBox  messages={messages} setMessages={setMessages}/>
    </div>

  )
}

export default App
