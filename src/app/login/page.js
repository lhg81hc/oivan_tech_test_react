'use client';

import { useRef, useState, useEffect } from "react";
import {useAppDispatch, useAppSelector} from "@/state_management/hooks";
import { setCredentials } from "@/state_management/slices/authSlice";
import { useLoginMutation } from "@/state_management/slices/authApiSlice";
import { useRouter, redirect } from "next/navigation";
import { store } from "@/state_management/store";
import { useDispatch } from "react-redux";

const Login = () => {
  const emailRef = useRef();
  const errRef = useRef();
  const [email, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const router = useRouter();
  const auth = store.getState().auth.user;

  useEffect(() => {
    if (auth) {
      router.push('/welcome');
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
      setUser('');
      setPwd('');
      router.push('/welcome');
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

  const handleUserInput = (e) => setUser(e.target.value);;

  const handlePwdInput = (e) => setPwd(e.target.value);

  const content = isLoading ? <h1>Loading...</h1> : (
    <section className="login">
      <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'}>{errMsg}</p>
      <h1>Employee Login</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="user[email]">Email:</label>
        <input
          style={{ color: 'black' }}
          type="email"
          id="user[email]"
          ref={emailRef}
          value={email}
          onChange={handleUserInput}
          autoComplete="off"
          required
        />

        <label htmlFor="user[password]">Password:</label>
        <input
          style={{ color: 'black' }}
          type="password"
          id="user[password]"
          onChange={handlePwdInput}
          value={pwd}
          required
        />

        <button>Sign In</button>
      </form>
    </section>
  );

  return content;
}

export default Login;
