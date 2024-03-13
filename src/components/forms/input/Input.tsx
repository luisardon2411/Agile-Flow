import { ChangeEvent, FocusEvent } from 'react';
import { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

interface InputTypes {
  value?: string;
  name?: string;
  id?: string;
  nameLabel?: string;
  type?: 'text' | 'number' | 'password' | '' | 'email';
  placeholder?: string;
  isPassword?: boolean;
  errorMessage?: string;
  onChange?: ( e: ChangeEvent<HTMLInputElement> ) => void;
  onBlur?: ( e: FocusEvent<HTMLInputElement> ) => void;

}

interface InputPasswordProps {
  value?: string;
  name?: string;
  id?: string;
  nameLabel?: string;
  type?: 'text' | 'number' | 'password' | '';
  state?: boolean
  changeState?: () => void;
  placeholder?: string;
  isPassword?: boolean;
  errorMessage?: string;
  onChange?: ( e: ChangeEvent<HTMLInputElement> ) => void;
  onBlur?: ( e: FocusEvent<HTMLInputElement> ) => void;
}

const Input = ( { name, id, type, isPassword, placeholder, value, errorMessage, onChange, onBlur }: InputTypes  ) => {

  const [ hasVisiblePassword, setHasVisiblePassword  ] = useState(false);
  const changeVisiblePassword = () => {
    setHasVisiblePassword(!hasVisiblePassword);
  }
  return (
    <>
    {
      isPassword ? <InputPassword onChange={ onChange } onBlur={ onBlur } errorMessage={ errorMessage } value={ value } name={ name } placeholder={ placeholder } state={ hasVisiblePassword } changeState={ changeVisiblePassword } />
      : (
      <div className='relative w-full sm:mb-1 lg:mb-2 xl:mb-2'>
        <input type={ type } name={name} id={ id }
        placeholder={ placeholder } value={ value }
        onChange={ onChange }
        onBlur={ onBlur }
        className={`w-full sm:p-4 sm:text-sm lg:text-md outline-none bg-gray-50 rounded-md 
         placeholder:placeholder-gray-800
        transition-all duration-200 delay-50 mb-2 ${ errorMessage ? 'outline-red-700' : 'outline-none focus:outline-prussian-blue-400' }`} />
        {
          errorMessage ? <div className='sm:text-xs xl:text-sm text-red-700 font-thin'> { errorMessage } </div>
                : null
        }
      </div>
      )
    }
    </>
  )
}


const InputPassword = ({ name, id, placeholder, state, errorMessage, changeState, value, onChange  }: InputPasswordProps) => { 
  return (
    <div className='relative w-full'>
        <input type={ `${ state ? 'text' : 'password' }` } name={name} id={ id }
        placeholder={ placeholder } value={ value }
        onChange={ onChange }
        className={`w-full sm:p-4 sm:text-sm lg:text-md outline-none bg-gray-50 rounded-md
         placeholder:placeholder-gray-800
        transition-all duration-200 delay-50 mb-2 ${ errorMessage ? 'outline-red-700' : 'outline-none focus:outline-prussian-blue-400' }`} />
        {
          errorMessage ? <div className='sm:text-xs xl:text-sm text-red-700 font-thin'> { errorMessage } </div>
                       : null
        }
        <button onClick={ changeState } type='button' >
          {
            state ? <EyeSlashIcon className='absolute lg:right-5 lg:top-4 2xl:right-3 2xl:top-3 sm:h-7 sm:w-7 cursor-pointer text-stone-700' />
                  : <EyeIcon className='absolute lg:right-5 lg:top-4 2xl:right-3 2xl:top-3 sm:h-7 sm:w-7 cursor-pointer text-stone-700' />
          }
        </button>
    </div>
  )
}

export default Input