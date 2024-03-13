import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuth } from '../../../context/Auth/AuthContext';
import { useTask } from '../../../context/task/TaskContext';
import { motion } from 'framer-motion';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';


const Sidebar = () => {

  const { signOut } = useAuth();

  const { state } = useTask();


  return (
    <article className="xs:w-2/5 lg:w-1/5 bg-gray-200 h-full xs:py-3">
      <section className="bg-gray-100 xs:p-2 h-full rounded-xl lg:p-4 flex flex-col">
        <h1 className="font-bold text-xl xs:mt-2 lg:mt-7">Por hacer</h1>
        <ul className="mt-5 flex flex-col justify-between h-full">
          {
            state.taskLists && state.taskLists.length > 0 && (
              <>
                <motion.div 
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: .7, delay: 0.5, ease: 'easeInOut', type: 'tween' }}
                className='flex flex-col lg:gap-2'>
                  <h2 className='text-zinc-400 lg:text-sm'>Tareas</h2>
                  <hr />
                  {state.taskLists && state.taskLists.map((taskList) => (
                    <li key={taskList.description} className="flex items-center justify-between lg:p-4 cursor-pointer rounded-lg mb-2 hover:bg-gray-200">
                      <span className='font-bold'>{taskList.title}</span>
                      <span className='flex justify-center items-center bg-zinc-200 font-bold lg:text-xs
               rounded-full lg:py-1 lg:px-4'> {taskList.countTotalTask} </span>
                    </li>
                  ))}
                </motion.div>
              </>
            )
          }
          {state.taskLists && state.taskLists.length === 0 && (
            <motion.li
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: 'easeInOut', type: 'tween' }}
              className="flex-1 flex items-center justify-between p-2 rounded-lg mb-2">
              <span className='font-Montserrat text-center flex flex-col justify-center items-center border-2 border-dashed lg:p-5 h-1/2
              rounded-xl lg:gap-2 shadow-sm'>
                <span className='lg:text-lg font-bold'>Excelente 😎</span>
                No tienes pendientes, crea una lista si necesitas asignarte una tarea
                <div className='flex justify-center items-center lg:gap-3'>
                  <p className='border-[1px] border-dashed border-black/30 lg:p-2 '>Control</p> + <p className='border-[1px] border-dashed border-black/30 lg:py-2 lg:px-5'>L</p>
                </div>
              </span>
            </motion.li>
          )}
          <li>
            <motion.span
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .5, delay: 0.5, ease: 'easeInOut', type: 'tween' }}

              onClick={signOut}
              className='flex items-center justify-between lg:p-4 rounded-lg mb-2 hover:bg-gray-200
            cursor-pointer'>
              <div className='flex lg:gap-2'>
                <FontAwesomeIcon icon={faArrowRightFromBracket} className='self-center lg:text-lg' />
                <p className=''>Cerrar sesión</p>
              </div>
            </motion.span>
          </li>
        </ul>
      </section>
    </article>
  )
}

export default Sidebar