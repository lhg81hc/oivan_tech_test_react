import React, {useEffect, useRef, useState} from 'react';
import ModalContainer from "@/components/modal/ModalContainer";
import { useDispatch } from "react-redux";
import { hideModal } from "@/state_management/slices/modalSlice";
import { useAddUrlMutation, useUpdateUrlMutation } from "@/app/api/slices/urlApiSlice";
import { urlAdded, urlUpdated } from "@/state_management/slices/urlSlice";

const CreateEditUrlModal = ({ url }) => {
  const originalUrlRef = useRef();
  const errRef = useRef();
  const [originalUrl, setOriginalUrl] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const editing = url;

  const [addUrl, { isLoading }] = useAddUrlMutation();
  const [updateUrl, { isLoading: isUpdateLoading }] = useUpdateUrlMutation();

  const dispatch = useDispatch();

  useEffect(() => {
    if (originalUrlRef.current) originalUrlRef.current.focus();
    if (editing) setOriginalUrl(url.original);
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [originalUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editing) {
      try {
        const data = await updateUrl({ id: url.id, url: { original: originalUrl }}).unwrap();

        setOriginalUrl('');
        dispatch(urlUpdated({ ...data }))
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
    } else {
      try {
        const data = await addUrl({ url: { original: originalUrl }}).unwrap();

        setOriginalUrl('');
        dispatch(urlAdded({ ...data }))
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
  }

  const handleOriginalUrlInput = (e) => setOriginalUrl(e.target.value);

  return (
    <ModalContainer
      title={editing ? 'Edit Shorten URL' : 'New Shorten URL'}
      reactModalProps={{
        shouldCloseOnOverlayClick: false,
        className: 'relative bg-white rounded-lg shadow dark:bg-gray-700',
      }}
    >
      <div className="p-4 md:p-5 space-y-4d">
        <fieldset disabled={isLoading} className="disabled:opacity-75">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="text-gray-700 font-semibold block">
                Original URL
              </label>

              <input
                className="form-input border border-gray-400 py-3 px-4 bg-white placeholder-gray-400 text-gray-500 appearance-none w-full block focus:outline-none focus:ring-0 focus:border-gray-600 rounded mt-1"
                type="text"
                name="url[original]"
                id="original-url"
                ref={originalUrlRef}
                value={originalUrl}
                onChange={handleOriginalUrlInput}
                autoComplete="off"
                required
              />
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
                {editing ? 'Edit' : 'Create'}
              </button>
            </div>
          </form>
        </fieldset>

      </div>
    </ModalContainer>
  )
}

export default CreateEditUrlModal;
