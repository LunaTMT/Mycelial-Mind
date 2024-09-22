import Navbar from '../../components/ui/Narbar'
import VideoPlayer from '../../components/ui/VideoPlayer'
import Cards from '../../components/ui/Cards'

export default function Home() {
    return( 
    <div className='flex flex-col items-center w-full h-full'>
        <Navbar />
        <VideoPlayer src={"/assets/videos/time_lapse.mp4"} />
        <Cards />
    </div>
    );
}