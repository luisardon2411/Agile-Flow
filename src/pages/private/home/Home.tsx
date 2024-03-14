import { Helmet } from 'react-helmet';
import Greeting from '../../../components/dashboard/Greeting/Greeting';
import Sidebar from '../../../components/dashboard/sidebar/Sidebar';
import { useDashboard } from '../../../context/Dashboard/DashboardContext';
import SendMessage from '../../../components/dashboard/send-message/SendMessage';


const Home = () => {

  const { page } = useDashboard();

  return (
    <>
    <Helmet>
      <title>Inicio</title>
    </Helmet>
      <div className="h-full w-full flex font-Montserrat">
        <Sidebar />
        <div className="flex-1 h-full bg-zinc-200 flex flex-col">
          <Greeting />
          {
            page === 'Enviar mensaje' && ( <SendMessage /> )
          }
        </div>

      </div>
    </>
  )
}

export default Home