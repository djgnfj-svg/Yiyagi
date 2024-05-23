import React, { useEffect, useState, useRef } from 'react';
import SiteBar from '../components/SiteBar';

function Chat_Page() {
    const [messages, setMessages] = useState([]);
    const [participants, setParticipants] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const textareaRef = useRef(null);

    useEffect(() => {
        const tempMessages = [
            { author: "홍길동", text: "안녕하세요!" },
            { author: "김철수", text: "오늘 날씨가 참 좋네요." },
            { author: "이영희", text: "채팅 앱 테스트 중입니다." },
        ];
        setMessages(tempMessages);

        const tempParticipants = [
            { name: "홍길동", photoUrl: "홍길동의 사진 URL" },
            { name: "김철수", photoUrl: "김철수의 사진 URL" },
            { name: "이영희", photoUrl: "이영희의 사진 URL" },
        ];
        setParticipants(tempParticipants);
    }, []);

    const sendMessage = () => {
        if (newMessage.trim() !== '') {
            const tempMessage = { author: "나", text: newMessage };
            setMessages([...messages, tempMessage]);
            setNewMessage('');
            resizeTextarea();  // Reset the textarea size after sending the message
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const resizeTextarea = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            const newHeight = Math.min(textarea.scrollHeight, 120);  // Max height for 5 lines
            textarea.style.height = `${newHeight}px`;
        }
    };

    useEffect(() => {
        resizeTextarea();
    }, [newMessage]);

    return (
        <div className="flex">
            <SiteBar participants={participants} />
            <main className="flex-1 flex flex-col relative h-screen">
                <div className="top-0 left-0 right-0 bg-white p-4 shadow-md flex items-center space-x-4 z-10">
                    {participants.map((participant, index) => (
                        <div key={index} className="flex flex-col mr-3 items-center">
                            <img
                                src={participant.photoUrl}
                                alt={participant.name}
                                className="w-12 h-12 rounded-full"
                            />
                            <span className="text-sm">{participant.name}(마케팅)</span>
                        </div>
                    ))}
                </div>
                <div className="flex-grow overflow-y-auto p-4">
                    <div className="flex flex-col space-y-4">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`flex ${message.author === '나' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`rounded-lg p-2 ${message.author === '나' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
                                    style={{ whiteSpace: 'pre-wrap' }}  // Preserve new lines and spaces
                                >
                                    {message.author === '나' ? '' : <div className="font-bold">{message.author}</div>}
                                    <div>{message.text}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="p-4 border-t border-gray-300">
                    <div className="flex">
                        <textarea
                            ref={textareaRef}
                            className="flex-grow border rounded-l-lg p-2 bg-gray-200 text-black resize-none"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyDown={handleKeyDown}
                            rows={1}
                            style={{ maxHeight: '120px', overflow: 'hidden' }}  // Max height for 5 lines and hide scrollbar
                        />
                        <button
                            onClick={sendMessage}
                            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-r-lg flex-shrink-0"
                            style={{ flexBasis: 'auto', width: '80px' }}
                        >
                            Send
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Chat_Page;
