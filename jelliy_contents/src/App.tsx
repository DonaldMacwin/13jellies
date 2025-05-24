import './App.css'
import { useState, useEffect } from 'react';
import SpaceTime from './component/spaceTime';
import Art from './component/art';
import Society from './component/society';
import Medicine from './component/medicine';
import Biology from './component/biology';
import Politics from './component/politics';


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
    return <Politics />;
  } else if (currentHash === '#industry') {
    return <div>industry</div>;
  } else if (currentHash === '#art') {
    return <Art />;
  } else if (currentHash === '#society') {
    return <Society />;
  } else if (currentHash === '#medicine') {
    return <Medicine />;
  } else if (currentHash === '#biology') {
    return <Biology />;
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
