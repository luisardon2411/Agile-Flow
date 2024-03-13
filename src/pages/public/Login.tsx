import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet'
import Image from '../../assets/todo-image.jpg'
import { LoginProps } from '../../containers/Login/interfaces/LoginFormikProps';
import { useAuth } from '../../context/Auth/AuthContext';
import Logo from '../../assets/logo.png';
import Input from '../../components/forms/input/Input';
import GoogleIcon from '../../assets/google-icon.png';

const mensajes = [
  "Da un pequeño paso cada día y verás grandes resultados.",
  "El cambio comienza con tu próxima acción.",
  "Fluir es el arte de avanzar sin esfuerzo.",
  "La agilidad es la capacidad de adaptarse y prosperar en el cambio.",
  "Cada tarea completada es un paso hacia tu objetivo.",
  "Prioriza, actúa y avanza.",
  "La simplicidad es la sofisticación del flujo de trabajo.",
  "Sé ágil, sé eficiente, sé excepcional.",
  "Transforma los obstáculos en oportunidades.",
  "Innovar es romper tus propios límites."
];

const Login: React.FC<LoginProps> = ({ formik }) => {

  const [index, setIndex] = useState(0)
  const { signInWithGoogle } = useAuth();

  useEffect(() => {
    const intervalId = setInterval(() => {

      setIndex((i) => (i + 1) % mensajes.length);
    }, 4000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <Helmet>
        <title>Iniciar sesión</title>
      </Helmet>
      <div className="h-full w-full flex font-Montserrat">
        { /** Image */}
        <div className="w-4/5 h-full relative">
          <img src={Image} alt="Login" className='object-cover w-full h-full' />
          {/** Overlar */}
          <AnimatePresence mode='wait'>
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: .5 }}
              className="absolute inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50 text-white"
            >
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: .5 }}
                className="text-center md:text-md  xl:text-2xl font-Montserrat">
                {mensajes[index]}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
        { /** Form */}
        <div className='h-full w-full flex flex-col justify-center items-center gap-2'>
          {/** Logo */}
          <motion.img
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .5, delay: .5 }}
            src={Logo} className='h-20 rounded-xl' />

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .5, delay: .5 }}
            className='font-bold text-2xl'>Iniciar sesión</motion.h1>
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .5, delay: .5 }}
            onSubmit={formik?.handleSubmit}
            className=' w-96 flex flex-col gap-4 xs:p-10 rounded-lg'>
            <Input type='email'
              name='email'
              placeholder='Ingresa tu correo electrónico'
              value={formik?.values.email}
              onChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
              errorMessage={formik?.errors.email} />
            <Input type='password'
              name='password'
              placeholder='Ingresa tu contraseña'
              value={formik?.values.password}
              onChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
              errorMessage={formik?.errors.password}
              isPassword
            />
            { /** Google button */}
            <button
              type='button'
              onClick={signInWithGoogle}
              className='
              flex items-center justify-center gap-2
              rounded-md sm:text-sm md:text-md lg:text-md text-gray-600 ring-2 ring-gray-200 xs:p-3'>
              <img src={GoogleIcon} alt="Google" className='h-6 w-6' />
              Iniciar sesión con Google
            </button>
            { /** Submit button */}
            <button
              type='submit'
              className='xs:p-3 bg-prussian-blue-600 text-white rounded-md'>Iniciar sesión</button>
          </motion.form>
        </div>
      </div>
    </>
  )
}

export default Login