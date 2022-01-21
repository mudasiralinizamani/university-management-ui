const AuthEndpoints = {
  Signup: "/Auth/Signup",
  Signin: "/Auth/Signin",
};

const UsersEndpoints = {
  GetUsers: "/User/GetUsers",
  GetUser: "/User/GetUser/",
  GetDeans: "/User/GetUsersInRole/Dean",
};

const FacultyEndpoints = {
  GetAll: "/Faculty/GetAll",
  GetById: "/Faculty/GetById/",
  Create: "/Faculty/Create/",
};

export { AuthEndpoints, UsersEndpoints, FacultyEndpoints };
