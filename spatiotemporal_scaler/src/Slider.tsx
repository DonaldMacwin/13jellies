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
  { label: '5×10^5 km', km: 5e5, readout: { prefix: '5×', base: '10', exponent: '5', suffix: 'km' } },
  { label: '5×10^10 km', km: 5e10, readout: { prefix: '5×', base: '10', exponent: '10', suffix: 'km' } },
  { label: '5×10^20 km', km: 5e20, readout: { prefix: '5×', base: '10', exponent: '20', suffix: 'km' } },
  { label: '5×10^24 km', km: 5e24, readout: { prefix: '5×', base: '10', exponent: '24', suffix: 'km' } },
  { label: '5×10^25 km', km: 5e25, readout: { prefix: '5×', base: '10', exponent: '25', suffix: 'km' } },
  // { label: '10^0 ly', ly: 1, readout: { base: '10', exponent: '0', suffix: '光年' } },
  // { label: '10^1 ly', ly: 10, readout: { base: '10', exponent: '1', suffix: '光年' } },
  // { label: '10^10 ly', ly: 1e10, readout: { base: '10', exponent: '10', suffix: '光年' } },
];

// Time magnitudes increasing from nearest to far (used outward from center)
const timeMagnitudes = [5e0, 5e1, 5e2, 5e3, 5e4, 5e5, 5e6, 5e8, 5e10, 5e12];

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

const renderReadout = (readout: ScaleReadout) => (
  <>
    {readout.prefix ? <span>{readout.prefix}</span> : null}
    <span>{readout.base}</span>
    {readout.exponent ? <sup>{readout.exponent}</sup> : null}
    {readout.suffix ? <span className="unit">{readout.suffix}</span> : null}
  </>
);

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

  const [spaceIndex, setSpaceIndex] = useState<number>(controlledSpaceIndex ?? initialSpaceIndex);
  const [timeIndex, setTimeIndex] = useState<number>(controlledTimeIndex ?? initialTimeIndex);

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
            value={spaceIndex}
            onChange={(e) => setSpaceIndex(Number(e.target.value))}
            aria-label="空間スケール"
          />
        </div>
      </div>
    </>
  );
};

export default Slider;
