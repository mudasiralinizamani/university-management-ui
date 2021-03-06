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
  UpdateDean: "/Faculty/UpdateDean",
  Delete: "/Faculty/Delete/",
};

const DepartmentEndpoints = {
  GetAll: "/Department/GetAll",
  GetById: "/Department/GetById/",
  Create: "/Department/Create/",
  GetByFacultyId: "/Department/GetByFacultyId/",
};

const SubjectEndpoints = {
  GetAll: "/Subject/GetAll",
  GetById: "/Subject/GetById/",
  Create: "/Subject/Create/",
  GetByDepartmentId: "/Subject/GetByDepartmentId/",
};

export {
  AuthEndpoints,
  UsersEndpoints,
  FacultyEndpoints,
  DepartmentEndpoints,
  SubjectEndpoints,
};
