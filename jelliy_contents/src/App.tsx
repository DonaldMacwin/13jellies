//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import { useState, useEffect } from 'react';
//import ReactDOM from 'react-dom';
import SpaceTime from './component/spaceTime';

function App() {
  const [currentHash, setCurrentHash] = useState(window.location.hash);
  // URLハッシュ変更時のイベントuseEffect
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };
    
    // イベントリスナーを登録
    window.addEventListener('hashchange', handleHashChange);
    
    // クリーンアップ
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);
  
  // ハッシュに基づいて表示を変更
  if (currentHash === '#SpaceTime') {
    return <SpaceTime />;
  } else if (currentHash === '#politics') {
    return <div>politics</div>;
  } else if (currentHash === '#industry') {
    return <div>industry</div>;
  } else if (currentHash === '#art') {
    return <div>art</div>;
  } else if (currentHash === '#society') {
    return <div>society</div>;
  } else if (currentHash === '#medicine') {
    return <div>medicine</div>;
  } else if (currentHash === '#biology') {
    return <div>biology</div>;
  } else if (currentHash === '#philosophy') {
    return <div>philosophy</div>;
  } else if (currentHash === '#chemistry') {
    return <div>chemistry</div>;
  } else if (currentHash === '#physics') {
    return <div>physics</div>;
  } else if (currentHash === '#linguistics') {
    return <div>linguistics</div>;
  } else if (currentHash === '#mathematics') {
    return <div>mathematics</div>;
  } else {
    return <div>デフォルト</div>;
  }
}

export default App
