import React, { useState } from 'react';

function Chat({ messages, onSendMessage, isSending }) {
    const [inputValue, setInputValue] = useState('');

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && inputValue.trim() !== '') {
            onSendMessage(inputValue);
            setInputValue('');
        }
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {messages.map((message, index) => (
                    <div key={index} className="break-words p-2 bg-gray-200 rounded-md">
                        {message}
                    </div>
                ))}
            </div>
            <div className="p-4 flex items-center">
                <input
                    type="text"
                    className="input border-2 border-gray-300 p-2 rounded-md flex-grow"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={isSending}
                />
                <button
                    onClick={() => {
                        if (inputValue.trim() !== '') {
                            onSendMessage(inputValue);
                            setInputValue(''); // 입력창을 클리어합니다.
                        }
                    }}
                    className={`ml-2 px-4 py-2 rounded-md ${isSending ? 'bg-gray-300 text-gray-500' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
                    disabled={isSending}
                >
                    보내기
                </button>
            </div>
        </div>
    );
}

export default Chat;