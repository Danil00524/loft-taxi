// import {
//     fetchLoginRequest, fetchLoginSuccess, fetchLoginFailure, fetchRegisterRequest,
//     fetchRegisterFailure, fetchRegisterSuccess
// } from './actions';
// import { handlerRequest } from '../../../helpers/handlerRequest';

// export const loginMiddleware = store => next => action => {
//     // Прослойка которая может перехватывать все actions.
//     // И тем самым изменять их.
//     // Имеет доступ к стору до применения и после middleware.
//     // И так же имеет ссылку на следующий Middleware, который нужно не забывать вызывать в методе "next" в конце.

//     if (action.type === fetchLoginRequest.toString()) {
//         handlerRequest('https://loft-taxi.glitch.me/auth', "POST", fetchLoginSuccess, fetchLoginFailure,
//             action.payload, store);
//     }

//     return next(action);

//     //              ------- EXAMPLE --------
//     // console.log(store.getState()) // store до вызова

//     // const result = next(action);

//     // console.log(store.getState()) // store после вызова

//     // return result;
// }

// export const registerMiddleware = store => next => action => {
//     if (action.type === fetchRegisterRequest.toString()) {
//         handlerRequest('https://loft-taxi.glitch.me/register', "POST", fetchRegisterSuccess, fetchRegisterFailure, action.payload, store);
//     }

//     return next(action);
// }
