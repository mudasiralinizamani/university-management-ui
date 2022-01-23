const AuthEndpoints = {
  Signup: "/Auth/Signup",
  Signin: "/Auth/Signin",
};

const UsersEndpoints = {
  GetUsers: "/User/GetUsers",
  GetUser: "/User/GetUser/",
  GetDeans: "/User/GetUsersInRole/Dean",
  GetHods: "/User/GetUsersInRole/Hod",
};

const FacultyEndpoints = {
  GetAll: "/Faculty/GetAll",
  GetById: "/Faculty/GetById/",
  Create: "/Faculty/Create/",
};

const DepartmentEndpoints = {
  GetAll: "/Department/GetAll",
  GetById: "/Department/GetById/",
  Create: "/Department/Create/",
};

export { AuthEndpoints, UsersEndpoints, FacultyEndpoints, DepartmentEndpoints };
