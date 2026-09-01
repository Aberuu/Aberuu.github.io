import Hero from '../components/sections/Hero';
import Marquee from '../components/sections/Marquee';
import Projects from '../components/sections/Projects';
import About from '../components/sections/About';
import Services from '../components/sections/Services';
import Awards from '../components/sections/Awards';
import Contact from '../components/sections/Contact';

function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Projects />
      <About />
      <Services />
      <Awards />
      <Contact />
    </>
  );
}

export default Home;
