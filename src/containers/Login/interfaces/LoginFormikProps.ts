import { FormikProps } from 'formik';

interface loginFormikProps {
    email: string;
    password: string;
}

export interface LoginProps {
    children?: React.ReactNode | JSX.Element[],
    formik?: FormikProps<loginFormikProps> | undefined
}
