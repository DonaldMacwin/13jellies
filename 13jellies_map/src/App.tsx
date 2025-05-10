import { useState, useEffect, useRef } from 'react'
import type { MouseEvent } from 'react'
import './App.css'
import jelliesImage from './assets/13jellies_C.png';
import iconTap from './assets/icon_tap.png';
import '../../../13jellies/asset/css/common.css'

function App() {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState<number>(0);
  const [startY, setStartY] = useState<number>(0);
  const [offsetX, setOffsetX] = useState<number>(0);
  const [offsetY, setOffsetY] = useState<number>(0);
  const [scale, setScale] = useState<number>(1);
  const imageWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const imageWrap = imageWrapRef.current;

    const handleWheel = (e: WheelEvent) => {
      const scaleFactor = 1.2;
      const newScale = e.deltaY > 0 ? scale / scaleFactor : scale * scaleFactor;
      // 最小1.0倍、最大2.0倍に制限
      setScale(Math.min(Math.max(newScale, 1.0), 2.0));
      e.preventDefault();
      e.stopPropagation();
    };

    if (imageWrap) {
      imageWrap.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (imageWrap) {
        imageWrap.removeEventListener('wheel', handleWheel);
      }
    };
  }, [scale]);

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

  return (
    <>
      <div
        id="image_wrap"
        ref={imageWrapRef}
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
      >
        <ul className='tap_list'>
          <li className='tap_item_politics'>
            <a href="https://cf268321.cloudfree.jp/13jellies/13jellies.php#politics" target="_top"><img src={iconTap} alt="" className="img" /></a>
          </li>
          <li className='tap_item_industry'>
            <a href="https://cf268321.cloudfree.jp/13jellies/13jellies.php#industry" target="_top"><img src={iconTap} alt="" className="img" /></a>
          </li>
          <li className='tap_item_art'>
            <a href="https://cf268321.cloudfree.jp/13jellies/13jellies.php#art" target="_top"><img src={iconTap} alt="" className="img" /></a>
          </li>
          <li className='tap_item_social'>
            <a href="https://cf268321.cloudfree.jp/13jellies/13jellies.php#social" target="_top"><img src={iconTap} alt="" className="img" /></a>
          </li>
          <li className='tap_item_medichine'>
            <a href="https://cf268321.cloudfree.jp/13jellies/13jellies.php#medichine" target="_top"><img src={iconTap} alt="" className="img" /></a>
          </li>
          <li className='tap_item_biology'>
            <a href="https://cf268321.cloudfree.jp/13jellies/13jellies.php#biology" target="_top"><img src={iconTap} alt="" className="img" /></a>
          </li>
          <li className='tap_item_SpaceTime1'>
            <a href="https://cf268321.cloudfree.jp/13jellies/13jellies.php#SpaceTime" target="_top"><img src={iconTap} alt="" className="img" /></a>
          </li>
          <li className='tap_item_SpaceTime2'>
            <a href="https://cf268321.cloudfree.jp/13jellies/13jellies.php#SpaceTime" target="_top"><img src={iconTap} alt="" className="img" /></a>
          </li>
          <li className='tap_item_philosophy'>
            <a href="https://cf268321.cloudfree.jp/13jellies/13jellies.php#philosophy" target="_top"><img src={iconTap} alt="" className="img" /></a>
          </li>
          <li className='tap_item_chemistry'>
            <a href="https://cf268321.cloudfree.jp/13jellies/13jellies.php#chemistry" target="_top"><img src={iconTap} alt="" className="img" /></a>
          </li>
          <li className='tap_item_physics'>
            <a href="https://cf268321.cloudfree.jp/13jellies/13jellies.php#physics" target="_top"><img src={iconTap} alt="" className="img" /></a>
          </li>
          <li className='tap_item_linguistics'>
            <a href="https://cf268321.cloudfree.jp/13jellies/13jellies.php#linguistics" target="_top"><img src={iconTap} alt="" className="img" /></a>
          </li>
          <li className='tap_item_mathematics'>
            <a href="https://cf268321.cloudfree.jp/13jellies/13jellies.php#mathematics" target="_top"><img src={iconTap} alt="" className="img" /></a>
          </li>
        </ul>
        <figure>
          <img src={jelliesImage} alt="" className="img" />
        </figure>
      </div>
    </>
  )
}

export default App
