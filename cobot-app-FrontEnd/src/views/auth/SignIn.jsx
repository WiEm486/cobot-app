import React, { useState } from 'react';
import axios from 'axios';
import InputField from 'components/fields/InputField';
import Checkbox from 'components/checkbox';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = () => {
    axios.post('http://localhost:3000/user/signin', {
      email,
      password,

    })
      .then(response => {
        console.log('Login successful:', response.data);
        // Rediriger l'utilisateur ou effectuer d'autres actions après la connexion réussie
        navigate('/admin')
      })
      .catch(error => {
        console.log(email, password)
        console.error('Login failed:', error);
        // Gérer les erreurs de connexion, par exemple afficher un message d'erreur à l'utilisateur
      });
  };

  return (
    <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          Sign In
        </h4>
        <div className="mb-6 flex items-center gap-3">
          <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
          <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
        </div>

        {/* Email */}
        <InputField
          variant="auth"
          extra="mb-3"
          label="Email*"
          placeholder="mail@simple.com"
          id="email"
          type="text"
          value={email}
          onChange={(e) => { setEmail(e.target.value); console.log(email) }}
        />

        {/* Password */}
        <InputField
          variant="auth"
          extra="mb-3"
          label="Password*"
          placeholder="Min. 8 characters"
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Checkbox */}
        {/* <div className="mb-4 flex items-center justify-between px-2">
          <div className="flex items-center">
            <Checkbox
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <p className="ml-2 text-sm font-medium text-navy-700 dark:text-white">
              Keep me logged In
            </p>
          </div>
          <a
            className="text-sm font-medium text-customGreen dark:text-white"
            href=" "
          >
            Forgot Password?
          </a>
        </div> */}

        {/* Sign In Button */}
        <button
          className="linear mt-2 w-full rounded-xl bg-customGreen py-[12px] text-base font-medium text-white transition duration-200 hover:bg-green-300  dark:text-white dark:hover:bg-green-50"
          onClick={handleSignIn}
        >
          Sign In
        </button>

        {/* Create Account Link */}
        <div className="mt-4">
          <span className="text-sm font-medium text-navy-700 dark:text-gray-600">
            Not registered yet?
          </span>
          <a
            href="/auth/sign-up"
            className="ml-1 text-sm font-medium text-customGreen dark:text-white"
          >
            Create an account
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
