import { Helmet } from 'react-helmet';
import Greeting from '../../../components/dashboard/Greeting/Greeting';
import Sidebar from '../../../components/dashboard/sidebar/Sidebar';


const Home = () => {


  return (
    <>
    <Helmet>
      <title>Inicio</title>
    </Helmet>
      <div className="h-full w-full flex font-Montserrat">
        <Sidebar />
        <div className="flex-1 h-full bg-zinc-200">
          <Greeting />
        </div>

      </div>
    </>
  )
}

export default Home