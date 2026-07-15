export default function ChatInput() {
  return (
    <div className="p-5 border-t border-zinc-800 bg-[#0d0d0f] flex-shrink-0">
      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder="Type a message..."
          className="bg-zinc-900 text-zinc-400 placeholder:text-zinc-500 border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-violet-500"
        />
      </div>
    </div>
  );
}