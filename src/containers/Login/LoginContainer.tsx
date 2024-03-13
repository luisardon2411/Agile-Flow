import * as Yup from 'yup';
import Login from "../../pages/public/Login"
import { useFormik } from 'formik';
import { useAuth } from '../../context/Auth/AuthContext';
import { useState } from 'react';
import ErrorModal from '../../components/modal/ErrorModal';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('El email no es válido').required('El email es requerido'),
  password: Yup.string().required('La contraseña es requerida'),
})

const LoginContainer = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { signInWithEmail } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      const response = await signInWithEmail(values.email, values.password);
      if (response.error) {
        setErrorMessage(response.error);
        setIsModalOpen(true);
      } else {
        setErrorMessage('');
        setIsModalOpen(false);
      }
      setSubmitting(false);
    }
  })

  return (
    <>
      <Login formik={formik} />
      <ErrorModal isOpen={isModalOpen} message={errorMessage} onClose={() => setIsModalOpen(false)} />
    </>
  )
}

export default LoginContainer