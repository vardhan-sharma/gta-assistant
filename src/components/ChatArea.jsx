export default function ChatArea({ children }) {
  return (
    <div className="flex-1 overflow-y-auto px-8 py-6">
      {children}
    </div>
  );
}