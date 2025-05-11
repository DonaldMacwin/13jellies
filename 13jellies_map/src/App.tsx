import { useState, useEffect, useRef } from 'react'
import type { MouseEvent, TouchEvent } from 'react'
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
  const dragStartPosRef = useRef({ x: 0, y: 0 });
  const [clickStarted, setClickStarted] = useState(false);
  
  // ホイール処理 - スクロールとの連携
  useEffect(() => {
    const imageWrap = imageWrapRef.current;

    const handleWheel = (e: WheelEvent) => {
      const scaleFactor = 1.2;
      let newScale = scale;
      if (e.deltaY > 0) {
        // 縮小
        newScale = scale / scaleFactor;
      } else {
        // 拡大
        newScale = scale * scaleFactor;
      }
      // 最小0.9倍、最大2.5倍に制限
      const clampedScale = Math.min(Math.max(newScale, 0.9), 2.5);

      // 拡大・縮小が限界値に達しているか判定
      const atMin = scale <= 0.9 && e.deltaY > 0;
      const atMax = scale >= 2.5 && e.deltaY < 0;

      if (atMin || atMax) {
        // 限界値ならpreventDefaultしない（親ページに伝播させる）
        return;
      } else {
        setScale(clampedScale);
        e.preventDefault();
        e.stopPropagation();
      }
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

  // ここからマウスドラッグ操作用の処理
  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    // リンククリックでないことを確認
    if ((e.target as HTMLElement).tagName === 'A' || 
        (e.target as HTMLElement).closest('a')) {
      return; // リンクならドラッグ開始しない
    }
    
    e.preventDefault();
    e.stopPropagation();
    
    setClickStarted(true);
    dragStartPosRef.current = { x: e.clientX, y: e.clientY };
    
    // カーソルスタイル更新
    if (imageWrapRef.current) {
      imageWrapRef.current.style.cursor = 'grabbing';
    }
  };

  const handleMouseUp = () => {
    if (clickStarted) {
      setClickStarted(false);
      setIsDragging(false);
      
      // カーソルスタイル戻す
      if (imageWrapRef.current) {
        imageWrapRef.current.style.cursor = 'grab';
      }
    }
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    // クリック開始点から少し動いたらドラッグとみなす
    if (clickStarted && !isDragging) {
      const moveX = Math.abs(e.clientX - dragStartPosRef.current.x);
      const moveY = Math.abs(e.clientY - dragStartPosRef.current.y);
      
      if (moveX > 5 || moveY > 5) {
        setIsDragging(true);
        setStartX(e.clientX - offsetX);
        setStartY(e.clientY - offsetY);
      }
    }
    
    // ドラッグ中の移動処理
    if (isDragging) {
      e.preventDefault();
      e.stopPropagation();
      setOffsetX(e.clientX - startX);
      setOffsetY(e.clientY - startY);
    }
  };

  // ここからタッチ操作用
  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 1) {
      // リンククリックでないことを確認
      if ((e.target as HTMLElement).tagName === 'A' || 
          (e.target as HTMLElement).closest('a')) {
        return; // リンクならドラッグ開始しない
      }
      
      const touch = e.touches[0];
      setClickStarted(true);
      dragStartPosRef.current = { x: touch.clientX, y: touch.clientY };
    }
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (e.touches.length !== 1) return;
    
    const touch = e.touches[0];
    
    // クリック開始点から少し動いたらドラッグとみなす
    if (clickStarted && !isDragging) {
      const moveX = Math.abs(touch.clientX - dragStartPosRef.current.x);
      const moveY = Math.abs(touch.clientY - dragStartPosRef.current.y);
      
      if (moveX > 5 || moveY > 5) {
        setIsDragging(true);
        setStartX(touch.clientX - offsetX);
        setStartY(touch.clientY - offsetY);
        
        // タッチ時はスクロールを防止
        e.preventDefault();
      }
    }
    
    // ドラッグ中の移動処理
    if (isDragging) {
      e.preventDefault();
      setOffsetX(touch.clientX - startX);
      setOffsetY(touch.clientY - startY);
    }
  };

  const handleTouchEnd = () => {
    setClickStarted(false);
    setIsDragging(false);
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
          transition: isDragging ? 'none' : 'transform 0.1s ease',
          willChange: 'transform',
          userSelect: 'none',
          width: '100%',
          height: '100%'
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <ul className='tap_list' style={{ pointerEvents: isDragging ? 'none' : 'auto' }}>
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
            <a href="https://cf268321.cloudfree.jp/13jellies/13jellies.php#society" target="_top"><img src={iconTap} alt="" className="img" /></a>
          </li>
          <li className='tap_item_medichine'>
            <a href="https://cf268321.cloudfree.jp/13jellies/13jellies.php#medicine" target="_top"><img src={iconTap} alt="" className="img" /></a>
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
          <img 
            src={jelliesImage} 
            alt="" 
            className="img"
            draggable="false" 
            style={{ pointerEvents: 'none' }}  // 画像自体のドラッグイベントを無効化
          />
        </figure>
      </div>
    </>
  )
}

export default App
