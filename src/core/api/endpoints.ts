const AuthEndpoints = {
  Signup: "/Auth/Signup",
  Signin: "/Auth/Signin",
};

const UsersEndpoints = {
  GetUsers: "/User/GetUsers",
  GetUser: "/User/GetUser/",
  GetDeans: "/User/GetUsersInRole/Dean",
  GetHods: "/User/GetUsersInRole/Hod",
  GetTeachers: "/User/GetUsersInRole/Teacher",
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

const SubjectEndpoints = {
  GetAll: "/Subject/GetAll",
  GetById: "/Subject/GetById/",
  Create: "/Subject/Create/",
};

export {
  AuthEndpoints,
  UsersEndpoints,
  FacultyEndpoints,
  DepartmentEndpoints,
  SubjectEndpoints,
};
