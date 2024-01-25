import { TooltipProps } from "recharts";

const HistoryTooltip: React.FC<TooltipProps<any, string>> = ({ payload, label, active }) => {
  const dateLabel = new Date(label).toLocaleString('en-us', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  if (active && payload?.length) {
    const analysis = payload[0].payload;

    return (
      <div className="p-8 custom-tooltip bg-white/5 shadow-md border border-black/10 rounded-lg backdrop-blur-md relative">
        <div
          className="absolute left-2 top-2 w-2 h-2 rounded-full"
          style={{ background: analysis.color }}
        ></div>
        <p className="label text-sm text-black/30">{dateLabel}</p>
        <p className="intro text-xl uppercase">{analysis.mood}</p>
      </div>
    )
  }

  return null;
}

export default HistoryTooltip;
