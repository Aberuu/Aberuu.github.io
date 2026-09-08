import { useEffect, useRef } from 'react';
import { Analytics } from "@vercel/analytics/react";
import Header from './components/layout/Header';
import Hero from './components/sections/Hero';
import Identity from './components/sections/Identity';
import VideoEditing from './components/sections/VideoEditing';
import Photography from './components/sections/Photography';
import Engineering from './components/sections/Engineering';
import Process from './components/sections/Process';
import SelectedWork from './components/sections/SelectedWork';
import Manifesto from './components/sections/Manifesto';
import Footer from './components/layout/Footer';
import { setupSmoothScroll } from './lib/scroll';
import { animateLoader, initAllAnimations, refreshScrollTriggers } from './animations';

function App() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const scroll = setupSmoothScroll();
    let destroyAnimations = null;

    const loaderTween = animateLoader(() => {
      destroyAnimations = initAllAnimations(root);
      refreshScrollTriggers();
    });

    return () => {
      loaderTween?.kill();
      destroyAnimations?.();
      scroll.destroy();
    };
  }, []);

  return (
    <>
    <Analytics />
    <div ref={rootRef}>
      <div className="loader" aria-hidden="true">
        <p className="loader-word">Agaphe</p>
        <div className="loader-track">
          <div className="loader-fill" />
        </div>
      </div>

      <Header />
      <main>
        <Hero />
        <Identity />
        <VideoEditing />
        <Photography />
        <Engineering />
        <Process />
        <SelectedWork />
        <Manifesto />
      </main>
      <Footer />
    </div>
    </>
  );
}

export default App;
