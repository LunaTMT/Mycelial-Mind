import Reveal from '../../utils/Reveal';
import VideoPlayer from '../../components/ui/VideoPlayer';
import Navbar from '../../components/ui/Navbar'; 
import CompanyInfo from './CompanyInfo';
import Cards from '../../components/ui/Cards';


import Lenis from 'lenis'

const lenis = new Lenis()


export default function Home() {
  return (
    <div className="flex flex-col w-full h-auto -z-50">
        
        <VideoPlayer src={"/assets/videos/time_lapse.mp4"} />
        <Navbar />

        <Reveal>
          <CompanyInfo />
        </Reveal>
      
        <Reveal>
          <Cards />
        </Reveal>

    </div>
  );
}
