export const baseUrl = 'http://localhost:8000/';
export const apiUrl = baseUrl + 'api/';

// APIs START

// projects endpoint
export const projectsEndpoint = apiUrl + 'projects/';

//email subscribers endpoint
export const emailSubscribersEndpoint = apiUrl + 'email-subscribers/';

//email subscribers endpoint
export const usersEndpoint = apiUrl + 'users/';

// auth endpoints
export const loginEndpoint = apiUrl + 'auth/login';
export const logoutEndpoint = apiUrl + 'auth/logout';
export const registerEndpoint = apiUrl + 'auth/register';
export const refreshEndpoint = apiUrl + 'auth/refresh';

// APIs END

// MEDIA START

export const projectsMediaURL = baseUrl + 'storage/images/projects/';

// MEDIA END
