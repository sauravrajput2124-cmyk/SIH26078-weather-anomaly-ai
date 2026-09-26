import React, { useEffect, useState } from 'react';
import { Play, Pause, RotateCcw, Calendar, ChevronRight } from 'lucide-react';

interface TimelineSliderProps {
  currentDay: number;
  onDayChange: (day: number) => void;
  maxDays?: number;
}

export const TimelineSlider: React.FC<TimelineSliderProps> = ({
  currentDay,
  onDayChange,
  maxDays = 10,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let timer: any = null;
    if (isPlaying) {
      timer = setInterval(() => {
        onDayChange((prev) => (prev >= maxDays ? 1 : prev + 1));
      }, 1500);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying, maxDays, onDayChange]);

  const daysArray = Array.from({ length: maxDays }, (_, i) => i + 1);

  return (
    <div className="bg-navy-900 border border-navy-700 rounded-xl p-4 shadow-xl">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-cyan-400" />
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">
            Spatio-Temporal Forecast Timeline (3–10 Day Horizon)
          </h3>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center space-x-1 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 px-3 py-1 rounded text-xs font-semibold transition cursor-pointer"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>Pause Track</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Play 10-Day Track</span>
              </>
            )}
          </button>

          <button
            onClick={() => {
              setIsPlaying(false);
              onDayChange(1);
            }}
            className="p-1 rounded bg-navy-800 hover:bg-navy-700 text-slate-400 hover:text-white transition cursor-pointer"
            title="Reset to Day 1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Slider Track */}
      <div className="relative py-2">
        <input
          type="range"
          min="1"
          max={maxDays}
          value={currentDay}
          onChange={(e) => onDayChange(Number(e.target.value))}
          className="w-full h-2.5 bg-navy-950 rounded-lg appearance-none cursor-pointer accent-cyan-400"
        />

        {/* Day Number Buttons */}
        <div className="flex justify-between items-center mt-3">
          {daysArray.map((day) => {
            const isActive = day === currentDay;
            const isPeak = day === 5 || day === 6;

            return (
              <button
                key={day}
                onClick={() => onDayChange(day)}
                className={`flex flex-col items-center p-1.5 rounded-lg transition text-xs cursor-pointer ${
                  isActive
                    ? 'bg-cyan-500 text-navy-950 font-black shadow-lg shadow-cyan-500/30 scale-105'
                    : 'bg-navy-950 text-slate-400 hover:bg-navy-800 hover:text-white border border-navy-800'
                }`}
              >
                <span className="font-mono font-bold text-[11px]">DAY {day}</span>
                {isPeak && !isActive && (
                  <span className="text-[9px] text-amber-400 font-bold">PEAK</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-2.5 pt-2 border-t border-navy-800 flex items-center justify-between text-[11px] text-slate-400">
        <div className="flex items-center space-x-1">
          <span>Current temporal index:</span>
          <span className="text-cyan-400 font-mono font-bold">Forecast Step +{currentDay * 24} Hours</span>
        </div>
        <div className="flex items-center space-x-1 text-slate-400">
          <span>Spatial Mesh updates dynamically</span>
          <ChevronRight className="w-3 h-3 text-cyan-400" />
        </div>
      </div>
    </div>
  );
};
