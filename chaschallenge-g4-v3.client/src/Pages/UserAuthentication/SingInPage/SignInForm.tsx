// SignInForm.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import '../../../scss/Sass-Pages/_SignUpPage.scss'; // Importera din CSS-fil för att använda klasserna

interface FormValues {
  email: string;
  password: string;
}

const SignInForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>();

  const formSubmit: SubmitHandler<FormValues> = (data) => {
    console.log('Form submitted', data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(formSubmit)}>
        <div className="input-container">
          {/* <label htmlFor="email" className="input-label">Email:</label> */}
          <input
            id="email"
            type="email"
            placeholder='E-postadress'
            {...register('email', {
              required: 'Email is Required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 'Invalid email address'
              }
            })}
            className="input-field" // Lägg till klassen för input-fält
          />
          {errors.email && <span className="error-message">{errors.email.message}</span>} {/* Använd klassen för felmeddelande */}
        </div>
        <div className="input-container">
          {/* <label htmlFor="password" className="input-label">Password:</label> */}
          <input
            id="password"
            type="password"
            placeholder='Lösenord'
            {...register('password', {
              required: 'Password is Required'
            })}
            className="input-field" // Lägg till klassen för input-fält
          />
          {errors.password && <span className="error-message">{errors.password.message}</span>} {/* Använd klassen för felmeddelande */}
        </div>
        <div className='signin-forgot-container'>
          <Link className='forgot-link' to='/home'>Glömt lösenordet?</Link>
        </div>
        <button type="submit" className="login-button">Logga in</button> {/* Använd klassen för knappen */}
      </form>
      <Link to="/signup" className="link-button">Har du inte ett konto redan?</Link> {/* Använd klassen för länk-knappen */}
    </>
  );
}

export default SignInForm;



