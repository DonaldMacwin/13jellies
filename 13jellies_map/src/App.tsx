import { useState } from 'react'
import type { MouseEvent, WheelEvent } from 'react'
import './App.css'
import '../../../13jellies/asset/css/common.css'

function App() {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState<number>(0);
  const [startY, setStartY] = useState<number>(0);
  const [offsetX, setOffsetX] = useState<number>(0);
  const [offsetY, setOffsetY] = useState<number>(0);
  const [scale, setScale] = useState<number>(1);

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartX(e.clientX - offsetX);
    setStartY(e.clientY - offsetY);
    const imageWrap = document.getElementById('image_wrap');
    if (imageWrap) {
      imageWrap.style.cursor = 'grabbing';
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    const imageWrap = document.getElementById('image_wrap');
    if (imageWrap) {
      imageWrap.style.cursor = 'grab';
    }
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      setOffsetX(e.clientX - startX);
      setOffsetY(e.clientY - startY);
    }
  };

  const handleWheel = (e: WheelEvent<HTMLDivElement>) => {
    const scaleFactor = 1.2;
    // deltaYが正の場合は縮小、負の場合は拡大
    const newScale = e.deltaY > 0 ? scale / scaleFactor : scale * scaleFactor;
    // 最小0.9倍、最大2.0倍まで拡大縮小可能
    setScale(Math.min(Math.max(newScale, 0.9), 2.0));
    e.preventDefault();
  };

  return (
    <>
      <div
        id="image_wrap"
        style={{
          position: 'relative',
          transform: `translate(${offsetX}px, ${offsetY}px) scale(${scale})`,
          cursor: isDragging ? 'grabbing' : 'grab',
          transformOrigin: 'center center',
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        onWheel={handleWheel}
      >
        <ul className='tap_list'>
          <li className='tap_item_politics'>
            <a href="../../../13jellies.php#politics"><img src="/src/assets/icon_tap.png" alt="" className="img" /></a>
          </li>
          <li className='tap_item_2'>
            <img src="/src/assets/icon_tap.png" alt="" className="img" />
          </li>
          <li className='tap_item_3'>
            <img src="/src/assets/icon_tap.png" alt="" className="img" />
          </li>
          </ul>
        <figure>
          <img src="/src/assets/13jellies_C.png" alt="" className="img" />
        </figure>
      </div>
    </>
  )
}

export default App
