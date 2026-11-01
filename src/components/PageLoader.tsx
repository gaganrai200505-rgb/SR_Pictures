export default function PageLoader() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-transparent text-white select-none">
      <div className="relative w-12 h-12 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-2 border-amber-400/20 animate-ping" />
        <div className="w-8 h-8 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
      </div>
      <p className="mt-4 text-xs font-mono uppercase tracking-widest text-neutral-500">
        Loading View...
      </p>
    </div>
  );
}
