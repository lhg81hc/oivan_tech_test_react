'use client';

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "@/state-management/slices/modalSlice";
import { useGetUsersQuery } from "@/state-management/api_ultils/userApiSlice";
import { selectUsers, setUsers } from "@/state-management/slices/userSlice";
import UserList from "@/app/users/components/UserList";

const Users = () => {
  const dispatch = useDispatch();
  const userList = useSelector(selectUsers);
  const { currentData, isFetching, isError } = useGetUsersQuery();

  useEffect(() => {
    dispatch(setUsers(currentData))
  }, [currentData]);

  return (
    <div className="h-screen w-full">
      <div className="p-6 h-full">
        <div className="grid lg:grid-cols-2">
          <div className="">
            <h1 className="text-3xl block font-semibold">Users</h1>
            <h3 className="block mt-2">All the users in our system</h3>
          </div>
          <div className="lg:text-right">
            <button
              className="inline-block px-5 py-2 rounded-lg shadow-lg bg-green-600 text-white uppercase tracking-wider font-semibold text-sm sm:text-base mt-5"
              onClick={() => dispatch(showModal({ modalType: 'CREATE_EDIT_USER', modalProps: {} }))}
            >
              CREATE
            </button>
          </div>
        </div>

        <hr className="mt-3"/>

        <UserList currentData={userList} isFetching={isFetching} isError={isError} dispatch={dispatch} />
      </div>
    </div>
  );
}

export default Users;
