import { useChat } from "@ai-sdk/react";
import { Sparkles, Send, Bot, User } from 'lucide-react';
import { DynamicWidget } from '../components/DynamicWidget';

export default function home() {
  // useChat automatically hits your /api/chat route and handles streaming state loops
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();

  // Helper function to extract our custom UI tags out of the streaming text string
  const renderMessageContent = (text) => {
    const chartRegex = /\[RENDER_CHART:\s*({.*?})\s*\]/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = chartRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      parts.push(<DynamicWidget key={match.index} tagContent={match[1]} />);
      lastIndex = chartRegex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts.length > 0 ? parts : text;
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 flex flex-col items-center justify-between p-4 font-sans">
      {/* Header */}
      <header className="w-full max-w-3xl py-4 border-b border-zinc-900 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-emerald-400 animate-pulse" />
          <h1 className="text-md font-bold tracking-tight">Streaming UI Engine</h1>
        </div>
        <span className="text-xs px-2 py-1 bg-zinc-900 border border-zinc-800 text-zinc-400 rounded-md font-mono">
          AI-Frontend-Niche
        </span>
      </header>

      {/* Main Chat Screen Area */}
      <main className="flex-1 w-full max-w-3xl my-4 overflow-y-auto space-y-6 pr-2 scrollbar-thin">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center py-20 space-y-3">
            <p className="text-zinc-400 text-sm max-w-xs">
              Ask me to analyze metric intervals to trigger the dynamic streaming UI components.
            </p>
            <button 
              onClick={() => handleInputChange({ target: { value: 'Show me a comparison chart of server loads across US-East, US-West, and EU-Central' } })}
              className="text-xs bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 px-3 py-1.5 rounded-lg text-zinc-300 transition"
            >
              Try: "Show me a comparison chart of server loads..."
            </button>
          </div>
        )}

        {messages.map((m) => (
          <div key={m.id} className={`flex gap-4 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-3 max-w-[85%] p-4 rounded-2xl border ${
              m.role === 'user' 
                ? 'bg-emerald-950/20 border-emerald-900/30 text-zinc-100 flex-row-reverse' 
                : 'bg-zinc-900/40 border-zinc-900 text-zinc-300'
            }`}>
              <div className="p-1 h-fit bg-zinc-800 border border-zinc-700 rounded-lg">
                {m.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-emerald-400" />}
              </div>
              <div className="text-sm leading-relaxed space-y-2 whitespace-pre-wrap">
                {renderMessageContent(m.content)}
              </div>
            </div>
          </div>
        ))}
      </main>

      {/* Input Action Tray */}
      <footer className="w-full max-w-3xl bg-zinc-900/50 border border-zinc-900 p-2 rounded-xl backdrop-blur-md">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask the streaming engine anything..."
            className="flex-1 bg-transparent px-3 py-2 text-sm focus:outline-none placeholder-zinc-500 text-zinc-200"
            disabled={isLoading}
          />
          <button 
            type="submit" 
            disabled={isLoading || (!input || "").trim}
            className="p-2 bg-emerald-500 hover:bg-emerald-400 disabled:bg-zinc-800 disabled:text-zinc-600 text-zinc-950 font-bold rounded-lg transition"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </footer>
    </div>
  );
}