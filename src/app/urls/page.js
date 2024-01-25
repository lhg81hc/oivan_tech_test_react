'use client';

import {useEffect, useState} from "react";
import UrlList from "@/app/urls/components/UrlList";
import { useDispatch, useSelector } from "react-redux";
import {hideModal, showModal} from "@/state_management/slices/modalSlice";
import {useAddUrlMutation, useDeleteUrlMutation, useGetUrlsQuery} from "@/app/api/slices/urlApiSlice";
import { selectCurrentUser } from "@/state_management/slices/authSlice";
import {selectUrls, setUrls, urlDeleted, urlUpdated} from "@/state_management/slices/urlSlice";

const Urls = () => {
  const dispatch = useDispatch();
  const urlList = useSelector(selectUrls);
  const { currentData, isFetching, isError } = useGetUrlsQuery();
  const [deleteUrl, { isLoading }] = useDeleteUrlMutation();

  useEffect(() => {
    dispatch(setUrls(currentData))
  }, [currentData]);

  const removeUrl = async (url) => {
    if (window.confirm('Delete the item?')){
      try {
        const data = await deleteUrl(url.id).unwrap();
        dispatch(urlDeleted({ ...url }))
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <div className="h-screen w-full">
      <div className="p-6 h-full">
        <div className="grid lg:grid-cols-2">
          <div className="">
            <h1 className="text-3xl block font-semibold">Your URLs</h1>
            <h3 className="block mt-2">All the URLs that you have created</h3>
          </div>
          <div className="lg:text-right">
            <button
              className="inline-block px-5 py-2 rounded-lg shadow-lg bg-green-600 text-white uppercase tracking-wider font-semibold text-sm sm:text-base mt-5"
              onClick={() => dispatch(showModal({ modalType: 'CREATE_EDIT_URL', modalProps: {} }))}
            >
              CREATE
            </button>
          </div>
        </div>

        <hr className="mt-3"/>

        <UrlList currentData={urlList} isFetching={isFetching} isError={isError} dispatch={dispatch} removeUrl={removeUrl}/>
      </div>
    </div>
  );
}

export default Urls;
