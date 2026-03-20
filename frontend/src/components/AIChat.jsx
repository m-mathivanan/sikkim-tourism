import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Bot, Send, X, MessageCircle, Loader2 } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [language, setLanguage] = useState('english');
  const [languages, setLanguages] = useState({});
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchLanguages();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchLanguages = async () => {
    try {
      const response = await axios.get(`${API}/ai/languages`);
      if (response.data.success) {
        setLanguages(response.data.data.languages);
      }
    } catch (error) {
      console.error('Error fetching languages:', error);
    }
  };

  const sendMessage = async () => {
    if (!currentMessage.trim() || isLoading) return;

    const userMessage = currentMessage.trim();
    setCurrentMessage('');
    
    // Add user message to chat
    const newUserMessage = {
      type: 'user',
      content: userMessage,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setIsLoading(true);

    try {
      const response = await axios.post(`${API}/ai/chat`, {
        session_id: sessionId,
        message: userMessage,
        language: language
      });

      if (response.data.success) {
        const aiMessage = {
          type: 'ai',
          content: response.data.data.response,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMessage]);
      } else {
        throw new Error(response.data.error || 'Failed to get AI response');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        type: 'ai',
        content: 'I apologize, but I encountered an error. Please try again later.',
        timestamp: new Date(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const startNewChat = () => {
    setMessages([]);
  };

  const getWelcomeMessage = () => {
    const welcomeMessages = {
      english: "🙏 Namaste! I'm your AI guide to Sikkim's sacred monasteries. Ask me about monastery histories, Buddhist traditions, travel tips, or spiritual practices. How can I help you today?",
      nepali: "🙏 नमस्ते! म तपाईंको सिक्किमका पवित्र गुम्बाहरूको AI गाइड हुँ। मलाई गुम्बाका इतिहास, बौद्ध परम्परा, यात्रा सुझावहरू बारे सोध्नुहोस्।",
      hindi: "🙏 नमस्ते! मैं सिक्किम के पवित्र मठों का AI गाइड हूँ। मुझसे मठों के इतिहास, बौद्ध परंपराओं, यात्रा सुझावों के बारे में पूछें।",
      tibetan: "🙏 Tashi Delek! I'm here to guide you through Tibet's rich monastery heritage in Sikkim.",
      bengali: "🙏 নমস্কার! আমি সিকিমের পবিত্র মঠগুলির AI গাইড। মঠের ইতিহাস, বৌদ্ধ ঐতিহ্য সম্পর্কে জিজ্ঞাসা করুন।",
      sikkimese: "🙏 Hello! I'm your friendly guide to Sikkim's beautiful monasteries and local culture."
    };
    
    return welcomeMessages[language] || welcomeMessages.english;
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="ai-chat-trigger bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className="w-96 h-[500px] shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white p-4 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot className="w-5 h-5" />
              <div>
                <h3 className="font-semibold">AI Monastery Guide</h3>
                <p className="text-xs opacity-90">Powered by Gemini Pro</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={startNewChat}
                className="text-white hover:bg-white/20 px-2 py-1 text-xs"
              >
                New Chat
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 p-1"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <CardContent className="p-0 flex flex-col h-[calc(500px-80px)]">
          {/* Language Selector */}
          <div className="p-3 border-b">
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-full text-sm">
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(languages).map(([code, name]) => (
                  <SelectItem key={code} value={code}>{name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-slate-500 py-8">
                <Bot className="w-12 h-12 mx-auto mb-3 text-orange-500" />
                <p className="text-sm leading-relaxed">{getWelcomeMessage()}</p>
              </div>
            )}
            
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white'
                      : message.isError
                      ? 'bg-red-50 text-red-700 border border-red-200'
                      : 'bg-slate-100 text-slate-800'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  <p className={`text-xs mt-1 opacity-70 ${
                    message.type === 'user' ? 'text-white' : 'text-slate-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-100 text-slate-800 p-3 rounded-2xl flex items-center space-x-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <p className="text-sm">AI is thinking...</p>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <textarea
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about monasteries, festivals, or Buddhist culture..."
                className="flex-1 p-2 border border-slate-200 rounded-lg resize-none text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                rows="2"
                disabled={isLoading}
              />
              <Button
                onClick={sendMessage}
                disabled={!currentMessage.trim() || isLoading}
                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-3 py-2 rounded-lg transition-all duration-200"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};