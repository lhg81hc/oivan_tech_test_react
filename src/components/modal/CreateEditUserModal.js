import React, { useEffect, useRef, useState } from 'react';
import { ModalContainer } from "./";
import { useDispatch } from "react-redux";
import { hideModal, userAdded } from "@/state-management/slices";
import { useAddUserMutation } from "@/state-management/api_ultils/userApiSlice";

const CreateEditUserModal = () => {
  const emailRef = useRef();
  const errRef = useRef();
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [pwd, setPwd] = useState('');
  const [role, setRole] = useState('customer');

  const [errMsg, setErrMsg] = useState('');

  const [addUser, { isLoading }] = useAddUserMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (emailRef.current) emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [email, firstName, lastName, pwd, role]);

  const handleEmailInput = (e) => setEmail(e.target.value);
  const handleFirstNameInput = (e) => setFirstName(e.target.value);
  const handleLastNameInput = (e) => setLastName(e.target.value);
  const handlePwdInput = (e) => setPwd(e.target.value);
  const handleRoleSelect = (e) => setRole(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const params = {
        user: {
          email: email,
          password: pwd,
          first_name: firstName,
          last_name: lastName,
          role: role,
        }
      }

      const data = await addUser(params).unwrap();

      setEmail('');
      setPwd('');
      setFirstName('');
      setLastName('');
      setRole('customer')
      dispatch(userAdded({ ...data }))
      dispatch(hideModal());
    } catch (err) {
      if (!err?.data) {
        setErrMsg('No Server Response');
      } else {
        setErrMsg(err?.data)
      }

      if (errRef.current) {
        errRef.current.focus();
      }
    }
  }

  return (
    <ModalContainer
      title="New User"
      reactModalProps={{
        shouldCloseOnOverlayClick: false,
        className: 'bg-white rounded-lg shadow dark:bg-gray-700',
      }}
    >
      <div className="p-4 md:p-5 space-y-4d min-w-96">
        <fieldset disabled={isLoading} className="disabled:opacity-75">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="text-gray-700 font-semibold block">
                Email*
              </label>

              <input
                className="form-input border border-gray-400 py-3 px-4 bg-white placeholder-gray-400 text-gray-500 appearance-none w-full block focus:outline-none focus:ring-0 focus:border-gray-600 rounded mt-1"
                type="email"
                name="user[email]"
                id="user-email"
                ref={emailRef}
                value={email}
                onChange={handleEmailInput}
                autoComplete="off"
                required
              />
            </div>

            <div className="form-group mt-3">
              <label className="text-gray-700 font-semibold block">
                First Name*
              </label>

              <input
                className="form-input border border-gray-400 py-3 px-4 bg-white placeholder-gray-400 text-gray-500 appearance-none w-full block focus:outline-none focus:ring-0 focus:border-gray-600 rounded mt-1"
                type="text"
                name="user[first_name]"
                id="user-first-name"
                value={firstName}
                onChange={handleFirstNameInput}
                autoComplete="off"
                required
              />
            </div>

            <div className="form-group mt-3">
              <label className="text-gray-700 font-semibold block">
                Last Name*
              </label>

              <input
                className="form-input border border-gray-400 py-3 px-4 bg-white placeholder-gray-400 text-gray-500 appearance-none w-full block focus:outline-none focus:ring-0 focus:border-gray-600 rounded mt-1"
                type="text"
                name="user[last_name]"
                id="user-last-name"
                value={lastName}
                onChange={handleLastNameInput}
                autoComplete="off"
                required
              />
            </div>

            <div className="form-group mt-3">
              <label className="text-gray-700 font-semibold block">
                Password*
              </label>

              <input
                className="form-input border border-gray-400 py-3 px-4 bg-white placeholder-gray-400 text-gray-500 appearance-none w-full block focus:outline-none focus:ring-0 focus:border-gray-600 rounded mt-1"
                type="password"
                name="user[password]"
                id="user-password"
                value={pwd}
                onChange={handlePwdInput}
                autoComplete="off"
                required
              />
            </div>

            <div className="form-group mt-3">
              <label className="text-gray-700 font-semibold block">
                Role*
              </label>

              <select
                className="form-input border border-gray-400 py-3.5 px-4 bg-white placeholder-gray-400 text-gray-500 w-full block focus:outline-none focus:ring-0 focus:border-gray-600 rounded mt-1"
                value={role}
                onChange={handleRoleSelect}
                required
              >
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className={`bg-red-100 border-t border-b border-red-500 text-red-700 px-4 py-3 mt-3 ${errMsg.length !== 0 ? 'block' : 'hidden'}`} role="alert">
              <p ref={errRef} className="text-sm">{errMsg}</p>
            </div>

            <div className="form-group mt-5 text-right">
              <button
                type="button"
                className="mr-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
                onClick={() => dispatch(hideModal())}
              >
                Cancel
              </button>
              <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                type="submit"
              >
                Create
              </button>
            </div>
          </form>
        </fieldset>

      </div>
    </ModalContainer>
  )
}

export default CreateEditUserModal;
