import Reveal from '../../utils/Reveal';
import VideoPlayer from '../../components/ui/VideoPlayer';
import Navbar from '../../components/ui/Navbar'; 
import CompanyInfo from './CompanyInfo';
import Cards from '../../components/ui/Cards';

import ParallaxVideo from '../../components/ui/ParallaxVideo'
import Lenis from 'lenis'

const lenis = new Lenis()



lenis.on('scroll', (e) => {
  console.log(e)
})


export default function Home() {
  return (
    <div className="flex flex-col w-full h-auto -z-50 ">
        
        <VideoPlayer src={"/assets/videos/time_lapse.mp4"} />
        <Navbar />

        <ParallaxVideo src={"/assets/videos/Mushroom_Growth.mp4"} />

        <Reveal>
          <CompanyInfo />
        </Reveal>
        

        <Reveal>
          <Cards />
        </Reveal>

    </div>
  );
}
