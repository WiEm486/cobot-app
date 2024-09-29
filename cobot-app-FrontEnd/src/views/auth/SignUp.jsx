import Footer from "components/footer/FooterAuthDefault";

import { Link, Route } from "react-router-dom";
//import routes from "routes.js";
import authImg from "assets/img/auth/backgroundIm.png"
import FixedPlugin from "components/fixedPlugin/FixedPlugin";
import React, { useState } from 'react';
import axios from 'axios';
import InputField from 'components/fields/InputField';
import Checkbox from 'components/checkbox';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();
    const getRoutes = (routes) => {
        return routes.map((prop, key) => {
            if (prop.layout === "/auth") {
                return (
                    <Route path={`/${prop.path}`} element={prop.component} key={key} />
                );
            } else {
                return null;
            }
        });
    };
    document.documentElement.dir = "ltr";

    const handleSignUp = () => {
        axios.post('http://localhost:3000/user/add', {
            username,
            email,
            password,

        })
            .then(response => {
                console.log('SignUp successful:', response.data);
                // Rediriger l'utilisateur ou effectuer d'autres actions après la connexion réussie
                navigate('/auth')
            })
            .catch(error => {
                console.log(email, password)
                console.error('Login failed:', error);
                // Gérer les erreurs de connexion, par exemple afficher un message d'erreur à l'utilisateur
            });
    };

    return (
        <div>
            <div className="relative float-right h-full min-h-screen w-full !bg-white dark:!bg-navy-900">
                <FixedPlugin />
                <main className={`mx-auto min-h-screen`}>
                    <div className="relative flex">
                        <div className="mx-auto flex min-h-full w-full flex-col justify-start pt-12 md:max-w-[75%] lg:h-screen lg:max-w-[1013px] lg:px-8 lg:pt-0 xl:h-[100vh] xl:max-w-[1383px] xl:px-0 xl:pl-[70px]">
                            <div className="mb-auto flex flex-col pl-5 pr-5 md:pr-0 md:pl-12 lg:max-w-[48%] lg:pl-0 xl:max-w-full">

                                <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
                                    <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
                                        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
                                            Sign Up
                                        </h4>
                                        <div className="mb-6 flex items-center gap-3">
                                            <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
                                            <div className="h-px w-full bg-gray-200 dark:bg-navy-700" />
                                        </div>

                                        {/* Username */}
                                        <InputField
                                            variant="auth"
                                            extra="mb-3"
                                            label="Username*"
                                            placeholder="username123"
                                            id="Username"
                                            type="text"
                                            value={username}
                                            onChange={(e) => { setUsername(e.target.value); }}
                                        />


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



                                        {/* Sign Up Button */}
                                        <button
                                            className="linear mt-2 w-full rounded-xl bg-customGreen py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
                                            onClick={handleSignUp}
                                        >
                                            Sign Up
                                        </button>

                                        {/* Create Account Link */}
                                        <div className="mt-4">
                                            <span className="text-sm font-medium text-navy-700 dark:text-gray-600">
                                                Already have an account ?
                                            </span>
                                            <a
                                                href="/auth"
                                                className="ml-1 text-sm font-medium text-customGreen dark:text-white"
                                            >
                                                Sign In
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute right-0 hidden h-full min-h-screen md:block lg:w-[49vw] 2xl:w-[44vw]">

                                    <div
                                        className="absolute flex h-full w-full items-end justify-center bg-cover bg-center lg:rounded-bl-[120px] xl:rounded-bl-[200px]"
                                        style={{ backgroundImage: `url(${authImg})` }}
                                    />

                                </div>
                            </div>
                            <Footer />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
};

export default SignUp;






