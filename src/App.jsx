import React, { useEffect } from 'react'
import RouterPage from './Routes/RouterPage'
import { MainContent } from './Content/MainContent';

const App = () => {

   useEffect(() => {
    document.title = MainContent.AppName;
    let faviconLink =
      document.querySelector('link[rel="icon"]') ||
      document.createElement("link");
    faviconLink.rel = "icon";
    faviconLink.href = MainContent.appFavicon;
    document.head.appendChild(faviconLink);
  }, []);
  
  return (
    <div className='select-none'>
      <RouterPage/>
    </div>
  )
}

export default App