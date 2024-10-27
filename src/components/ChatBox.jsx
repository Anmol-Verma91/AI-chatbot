import { useState } from 'react'

const API_KEY = import.meta.env.VITE_API_KEY

const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key="


function ChatBox() {

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    const fetchChatResponse = async () => {

        try {
            const res = await fetch(`${API_URL}${API_KEY}`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ "contents": [{ "parts": [{ "text": newMessage }] }] })

              })

            if (!res.ok) throw new Error(`Error: ${res.status}`)
                
            const data = await res.json()
            setMessages(prev => [...prev, { text: data.candidates[0].content.parts[0].text, sentByUser: false }]);
        } catch (error) {
            console.log(error)
        }
    }

    const handleSendMessage = (e) => {
        e.preventDefault()
        if (newMessage.trim()) {
            fetchChatResponse()
            setMessages(prev => [...prev, { text: newMessage, sentByUser: true }]);
            setNewMessage('');
        }
    }

    return (
        <div className="w-full min-h-56 max-w-lg flex flex-col bg-white shadow-lg rounded-lg">
            <div className="flex-1 p-4 overflow-y-auto">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`my-2 p-3 break-words ${message.sentByUser ? 'bg-green-500 text-white justify-self-end rounded-l-xl rounded-br-xl' : 'bg-gray-200 rounded-r-xl rounded-bl-xl'
                            } max-w-xs`}
                    >
                        {message.text}
                    </div>
                ))}
            </div>
            <form className="p-4 bg-gray-100 flex" onSubmit={handleSendMessage}>
                <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 p-2 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button
                    className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                >
                    Send
                </button>
            </form>
        </div>
    );

}

export default ChatBox
