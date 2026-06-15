export const DynamicWidget = ({ tagContent }) => {
  try {
    // Parse the JSON data sent inside the streaming tag
    const data = JSON.parse(tagContent);
    
    // Calculate max value for a simple pure-CSS/SVG bar chart
    const maxVal = Math.max(...data.values, 1);

    return (
      <div className="my-4 p-4 bg-zinc-900 border border-zinc-800 rounded-xl w-full max-w-md shadow-2xl animate-fade-in">
        <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">
          📊 Real-Time Dynamic Analytics
        </h4>
        <div className="space-y-3">
          {data.labels.map((label, idx) => {
            const val = data.values[idx];
            const percentage = (val / maxVal) * 100;
            
            return (
              <div key={label} className="space-y-1">
                <div className="flex justify-between text-xs font-medium text-zinc-300">
                  <span>{label}</span>
                  <span className="font-mono text-emerald-400">{val}</span>
                </div>
                {/* Optimized purely with CSS transitions to look smooth while streaming */}
                <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-linear--to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  } catch (e) {
    return <span className="text-xs text-red-400">Failed to stream structural widget data.</span>;
  }
};