import React, { useEffect, useMemo, useState } from 'react';
import './styles/Slider.css';

export type SpaceTick = { label: string; km?: number; ly?: number };
export type TimeTick = { label: string; yearsOffset: number }; // years relative to now

export type SliderChange = {
  spaceIndex: number;
  timeIndex: number;
  space: SpaceTick;
  time: TimeTick;
};

type SliderMark = {
  label: string;
  tooltip: string;
};

export interface SliderProps {
  onChange?: (v: SliderChange) => void;
  spaceIndex?: number;
  timeIndex?: number;
}

type ScaleReadout = {
  prefix?: string;
  base: string;
  exponent?: string;
  suffix: string;
};

const spaceTicks: Array<SpaceTick & { readout: ScaleReadout }> = [
  { label: '5×10^0 km', km: 5e0, readout: { prefix: '5×', base: '10', exponent: '0', suffix: 'km' } },
  { label: '5×10^1 km', km: 5e1, readout: { prefix: '5×', base: '10', exponent: '1', suffix: 'km' } },
  { label: '5×10^2 km', km: 5e2, readout: { prefix: '5×', base: '10', exponent: '2', suffix: 'km' } },
  { label: '5×10^3 km', km: 5e3, readout: { prefix: '5×', base: '10', exponent: '3', suffix: 'km' } },
  { label: '5×10^10 km', km: 5e10, readout: { prefix: '5×', base: '10', exponent: '10', suffix: 'km' } },
  { label: '5×10^20 km', km: 5e20, readout: { prefix: '5×', base: '10', exponent: '20', suffix: 'km' } },
  { label: '5×10^24 km', km: 5e24, readout: { prefix: '5×', base: '10', exponent: '24', suffix: 'km' } },
  { label: '5×10^25 km', km: 5e25, readout: { prefix: '5×', base: '10', exponent: '25', suffix: 'km' } },
  // { label: '10^0 ly', ly: 1, readout: { base: '10', exponent: '0', suffix: '光年' } },
  // { label: '10^1 ly', ly: 10, readout: { base: '10', exponent: '1', suffix: '光年' } },
  // { label: '10^10 ly', ly: 1e10, readout: { base: '10', exponent: '10', suffix: '光年' } },
];

// Time magnitudes increasing from nearest to far (used outward from center)
const timeMagnitudes = [5e0, 5e1, 5e2, 5e3, 5e4, 5e5, 5e6, 5e8, 5e10];

const formatExp = (v: number) => {
  const k = Math.round(Math.log10(v / 5));
  return `5×10^${k}`;
};

// Build ticks so that index 0 is far past and index N-1 is far future, center is '今'
const buildTimeTicks = (): TimeTick[] => {
  const past = timeMagnitudes
    .slice()
    .reverse()
    .map((v) => ({ label: `${formatExp(v)}年前`, yearsOffset: -v }));
  const future = timeMagnitudes.map((v) => ({ label: `${formatExp(v)}年後`, yearsOffset: v }));
  return [...past, { label: '今', yearsOffset: 0 }, ...future];
};

const timeTicks: TimeTick[] = buildTimeTicks();

const timeMarks: SliderMark[] = [
  { label: "5×10^10年前", tooltip: "宇宙の始まりより前\n500億年前(5×10^10)" },
  { label: "5×10^8年前", tooltip: "動物の時代の始まり\n5億年前(5×10^8)" },
  { label: "5×10^6年前", tooltip: "人類の系統が分かれたころ\n500万年前(5×10^6)" },
  { label: "5×10^5年前", tooltip: "原人の活動期\n50万年前(5×10^5)" },
  { label: "5×10^4年前", tooltip: "人類が世界へ広がったころ\n5万年前(5×10^4)" },
  { label: "5×10^3年前", tooltip: "文字の始まり\n5000年前(5×10^3)" },
  { label: "5×10^2年前", tooltip: "地動説の前夜\n500年前(5×10^2)" },
  { label: "5×10^1年前", tooltip: "現代の記憶\n50年前(5×10^1)" },
  { label: "5×10^0年前", tooltip: "最近の出来事\n5年前(5×10^0)" },
  { label: "今", tooltip: "今" },
  { label: "5×10^0年後", tooltip: "近未来\n5年後(5×10^0)" },
  { label: "5×10^1年後", tooltip: "世代の入れ替わり\n50年後(5×10^1)" },
  { label: "5×10^2年後", tooltip: "手入れを受け継ぐ長さ\n500年後(5×10^2)" },
  { label: "5×10^3年後", tooltip: "有史と同じ長さ\n5000年後(5×10^3)" },
  { label: "5×10^4年後", tooltip: "次の氷期\n5万年後(5×10^4)" },
  { label: "5×10^5年後", tooltip: "人類の寿命の限界\n50万年後(5×10^5)" },
  { label: "5×10^6年後", tooltip: "大陸移動と種の入れ替わり\n500万年後(5×10^6)" },
  { label: "5×10^8年後", tooltip: "植物の寿命\n5億年後(5×10^8)" },
  { label: "5×10^10年後", tooltip: "太陽の燃え殻\n500億年後(5×10^10)" },
];

const spaceMarks: SliderMark[] = [
  { label: "5×10^25 km", tooltip: "計算上の宇宙圏 半径50杼km以上\n10^12 光年以上" },
  { label: "5×10^24 km", tooltip: "観測可能な宇宙圏 半径5杼km\n10^11 光年" },
  { label: "5×10^20 km", tooltip: "銀河間 半径5垓km\n5,285万光年" },
  { label: "5×10^10 km", tooltip: "太陽系内 半径500億km" },
  { label: "5×10^3 km", tooltip: "国家圏 半径5000km" },
  { label: "5×10^2 km", tooltip: "広域圏 半径500km" },
  { label: "5×10^1 km", tooltip: "地域圏 半径50km" },
  { label: "5×10^0 km", tooltip: "都市圏 半径5km" },
];

const formatTimeLabel = (t: TimeTick) => t.label;

const timeReadout = (tick: TimeTick): ScaleReadout => {
  if (tick.yearsOffset === 0) {
    return { base: '現在', suffix: '' };
  }

  const absYears = Math.abs(tick.yearsOffset);
  const exponent = Math.round(Math.log10(absYears / 5)).toString();
  return {
    prefix: '5×',
    base: '10',
    exponent,
    suffix: tick.yearsOffset < 0 ? '年前' : '年後',
  };
};

const renderReadout = (readout: ScaleReadout) => {
  // split prefix like '5×' into number and multiplication sign so only '×' can be smaller
  const prefix = readout.prefix ?? '';
  const hasX = prefix.includes('×');
  const numPart = hasX ? prefix.replace('×', '') : prefix;

  return (
    <>
      {prefix ? (
        <>
          <span className="readout-prefix-num">{numPart}</span>
          {hasX ? <span className="readout-prefix-x">×</span> : null}
        </>
      ) : null}
      <span className="readout-base">{readout.base}</span>
      {readout.exponent ? <sup className="readout-exp">{readout.exponent}</sup> : null}
      {readout.suffix ? <span className="unit">{readout.suffix}</span> : null}
    </>
  );
};

const timeTickShortLabel = (tick: TimeTick) => {
  if (tick.yearsOffset === 0) {
    return '現在';
  }

  const absYears = Math.abs(tick.yearsOffset);
  const exponent = Math.round(Math.log10(absYears / 5));
  return `${tick.yearsOffset < 0 ? '-' : '+'}5×10^${exponent}`;
};

export const Slider: React.FC<SliderProps> = ({ onChange, spaceIndex: controlledSpaceIndex, timeIndex: controlledTimeIndex }) => {
  const initialSpaceIndex = 0; // smallest at start
  const initialTimeIndex = Math.floor(timeTicks.length / 2); // center = 今
  const maxSpaceIndex = spaceTicks.length - 1;

  const visualToLogicalSpaceIndex = (visualIndex: number) => maxSpaceIndex - visualIndex;
  const logicalToVisualSpaceIndex = (logicalIndex: number) => maxSpaceIndex - logicalIndex;

  const [spaceIndex, setSpaceIndex] = useState<number>(controlledSpaceIndex ?? initialSpaceIndex);
  const [timeIndex, setTimeIndex] = useState<number>(controlledTimeIndex ?? initialTimeIndex);
  const [hoveredTimeMark, setHoveredTimeMark] = useState<number | null>(null);
  const [hoveredSpaceMark, setHoveredSpaceMark] = useState<number | null>(null);

  useEffect(() => {
    if (typeof controlledSpaceIndex === 'number') {
      setSpaceIndex(controlledSpaceIndex);
    }
  }, [controlledSpaceIndex]);

  useEffect(() => {
    if (typeof controlledTimeIndex === 'number') {
      setTimeIndex(controlledTimeIndex);
    }
  }, [controlledTimeIndex]);

  const currentSpace = useMemo(() => spaceTicks[spaceIndex], [spaceIndex]);
  const currentTime = useMemo(() => timeTicks[timeIndex], [timeIndex]);
  const currentTimeReadout = useMemo(() => timeReadout(currentTime), [currentTime]);

  useEffect(() => {
    onChange?.({ spaceIndex, timeIndex, space: currentSpace, time: currentTime });
  }, [currentSpace, currentTime, onChange, spaceIndex, timeIndex]);

  return (
    <>
      <div className="time-slider-shell">
        <div className="time-slider-root">
          <div className="slider-counter slider-counter-time">{renderReadout(currentTimeReadout)}</div>
          <div className="time-slider-wrap">
            <input
              className="time-slider"
              type="range"
              min={0}
              max={timeTicks.length - 1}
              step={1}
              value={timeIndex}
              onChange={(e) => setTimeIndex(Number(e.target.value))}
              aria-label="時間スケール"
            />
            <div className="time-slider-marks" aria-hidden={false}>
              {timeMarks.map((mark, idx) => (
                <button
                  key={mark.label}
                  type="button"
                  className="slider-mark slider-mark-time"
                  style={{ left: `${(idx / (timeMarks.length - 1)) * 100}%` }}
                  onClick={() => setTimeIndex(idx)}
                  onMouseEnter={() => setHoveredTimeMark(idx)}
                  onMouseLeave={() => setHoveredTimeMark(null)}
                  onFocus={() => setHoveredTimeMark(idx)}
                  onBlur={() => setHoveredTimeMark(null)}
                  aria-label={mark.label}
                >
                  <span className="slider-mark-dot" />
                  {hoveredTimeMark === idx ? <span className="slider-mark-tooltip">{mark.tooltip}</span> : null}
                </button>
              ))}
            </div>
          </div>
          {/*<div className="time-label">{formatTimeLabel(currentTime)}</div>*/}
        </div>
      </div>

      <div className="scaling-slider-wrapper" aria-hidden={false}>
        <div className="slider-counter">{renderReadout(currentSpace.readout)}</div>
        <div className="vertical-rotator">
          <input
            className="vertical-slider"
            type="range"
            min={0}
            max={spaceTicks.length - 1}
            step={1}
            value={logicalToVisualSpaceIndex(spaceIndex)}
            onChange={(e) => setSpaceIndex(visualToLogicalSpaceIndex(Number(e.target.value)))}
            aria-label="空間スケール"
          />
          <div className="space-slider-marks" aria-hidden={false}>
            {spaceMarks.map((mark, idx) => (
              <button
                key={mark.label}
                type="button"
                className="slider-mark slider-mark-space"
                style={{ top: `${(idx / (spaceMarks.length - 1)) * 100}%` }}
                onClick={() => setSpaceIndex(visualToLogicalSpaceIndex(idx))}
                onMouseEnter={() => setHoveredSpaceMark(idx)}
                onMouseLeave={() => setHoveredSpaceMark(null)}
                onFocus={() => setHoveredSpaceMark(idx)}
                onBlur={() => setHoveredSpaceMark(null)}
                aria-label={mark.label}
              >
                <span className="slider-mark-dot" />
                {hoveredSpaceMark === idx ? <span className="slider-mark-tooltip slider-mark-tooltip-space">{mark.tooltip}</span> : null}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Slider;
