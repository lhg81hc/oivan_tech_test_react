export { setUrls, urlAdded, urlUpdated, urlDeleted, selectUrls } from './urlSlice'
export { default as urlReducer } from './urlSlice';

export { setUsers, userAdded, userUpdated, userDeleted, selectUsers } from './userSlice'
export { default as userReducer } from './userSlice';

export { showModal, hideModal } from './modalSlice'
export { default as modalReducer } from './modalSlice';

export { setCredentials, logOut } from './authSlice'
export { default as authReducer } from './authSlice';
