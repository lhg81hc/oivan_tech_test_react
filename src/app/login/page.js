'use client';

import { useRef, useState, useEffect } from "react";
import { setCredentials } from "@/state_management/slices/authSlice";
import { useLoginMutation } from "@/app/api/slices/authApiSlice";
import { useRouter } from "next/navigation";
import { store } from "@/state_management/store";
import { useDispatch } from "react-redux";

const Login = () => {
  const emailRef = useRef();
  const errRef = useRef();
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const router = useRouter();
  const auth = store.getState().auth.user;

  useEffect(() => {
    if (auth) {
      router.push('/urls');
    }
  }, [])

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [email, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await login({ user: { email: email, password: pwd }}).unwrap()
      dispatch(setCredentials({ ...userData }))
      setEmail('');
      setPwd('');
      router.push('/urls');
    } catch (err) {
      if (!err?.data) {
        setErrMsg('No Server Response');
      } else {
        setErrMsg(err?.data?.errors[0])
      }

      if (errRef.current) {
        errRef.current.focus();
      }
    }
  }

  const handleUserInput = (e) => setEmail(e.target.value);;

  const handlePwdInput = (e) => setPwd(e.target.value);

  const content = (
    <section className="flex justify-center items-center h-screen">

      <div className="w-96 p-6 shadow-lg bg-white rounded">
        <h1 className="text-3xl block text-center text-gray-600 font-semibold">LOGIN</h1>

        <hr className="mt-3"/>

        <fieldset disabled={isLoading} className="disabled:opacity-75">
          <form onSubmit={handleSubmit}>
            <div className="form-group mt-3">
              <label className="relative text-gray-400 focus-within:text-gray-600 block">
                <svg className="pointer-events-none w-6 h-6 absolute top-1/2 transform -translate-y-1/2 left-3" viewBox="0 0 512 512" fill="currentColor">
                  <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/>
                </svg>
                <input
                  className="form-input border border-gray-400 py-3 px-4 bg-white placeholder-gray-400 text-gray-500 appearance-none w-full block pl-14 focus:outline-none focus:ring-0 focus:border-gray-600 rounded"
                  type="email"
                  id="user[email]"
                  ref={emailRef}
                  value={email}
                  onChange={handleUserInput}
                  autoComplete="off"
                  placeholder="Email"
                  required
                />
              </label>
            </div>

            <div className="form-group mt-3">
              <label className="relative text-gray-400 focus-within:text-gray-600 block">
                <svg className="pointer-events-none w-6 h-6 absolute top-1/2 transform -translate-y-1/2 left-3" viewBox="0 0 448 512" fill="currentColor">
                  <path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z"/>
                </svg>
                <input
                  className="form-input border border-gray-400 py-3 px-4 bg-white placeholder-gray-400 text-gray-500 appearance-none w-full block pl-14 focus:outline-none focus:ring-0 focus:border-gray-600 rounded"
                  type="password"
                  id="user[password]"
                  onChange={handlePwdInput}
                  value={pwd}
                  placeholder="Password"
                  required
                />
              </label>
            </div>

            <div className={`bg-red-100 border-t border-b border-red-500 text-red-700 px-4 py-3 mt-3 ${errMsg.length !== 0 ? 'block' : 'hidden'}`} role="alert">
              {/*<p className="font-bold">Informational message</p>*/}
              <p ref={errRef} className="text-sm">{errMsg}</p>
            </div>

            <div className="form-group mt-5">
              <button
                className="border-2 border-indigo-700 bg-indigo-700 text-white py-3 w-full rounded-md hover:bg-transparent hover:text-indigo-700 font-semibold"
                type="submit"
              >
                Sign In
              </button>
            </div>
          </form>
        </fieldset>

      </div>

    </section>
  );

  return content;
}

export default Login;
