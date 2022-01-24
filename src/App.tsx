import { SnackbarProvider } from "notistack";
import { createRef, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "./assets/scss/App.scss";

// Importing Material Ui Components
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Grow from "@mui/material/Grow";

// Importing Components
import Loading from "./shared/Loading";

// Importing Layouts
import AuthLayout from "./core/layouts/AuthLayout";
import AdminLayout from "./core/layouts/AdminLayout";
import DeanLayout from "./core/layouts/DeanLayout";

// Auth Pages
const AuthSignin = lazy(() => import("./features/auth/pages/Signin"));
const AuthAdmin = lazy(() => import("./features/auth/pages/Admin"));
const AuthDean = lazy(() => import("./features/auth/pages/Dean"));
const AuthHod = lazy(() => import("./features/auth/pages/Hod"));
const AuthTeacher = lazy(() => import("./features/auth/pages/Teacher"));

// Admin Pages
const AdminIndex = lazy(() => import("./dashboards/admin/pages/Admin"));
const AdminSettings = lazy(() => import("./dashboards/admin/pages/Settings"));
const AdminProfile = lazy(() => import("./dashboards/admin/pages/Profile"));
const AdminNotifications = lazy(
  () => import("./dashboards/admin/pages/Notifications")
);
const AdminFaculties = lazy(
  () => import("./dashboards/admin/pages/faculty/Faculties")
);
const AdminFaculty = lazy(
  () => import("./dashboards/admin/pages/faculty/Faculty")
);
const AdminCreateFaculty = lazy(
  () => import("./dashboards/admin/pages/faculty/CreateFaculty")
);
const AdminDepartments = lazy(
  () => import("./dashboards/admin/pages/department/Departments")
);
const AdminDepartment = lazy(
  () => import("./dashboards/admin/pages/department/Department")
);
const AdminCreateDepartment = lazy(
  () => import("./dashboards/admin/pages/department/CreateDepartment")
);
const AdminCreateSubject = lazy(
  () => import("./dashboards/admin/pages/subject/CreateSubject")
);
const AdminSubject = lazy(
  () => import("./dashboards/admin/pages/subject/Subject")
);
const AdminSubjects = lazy(
  () => import("./dashboards/admin/pages/subject/Subjects")
);

// Dean Pages
const DeanIndex = lazy(() => import("./dashboards/dean/pages/Dean"));
const DeanSettings = lazy(() => import("./dashboards/dean/pages/Settings"));
const DeanProfile = lazy(() => import("./dashboards/dean/pages/Profile"));
const DeanNotifications = lazy(
  () => import("./dashboards/dean/pages/Notifications")
);

function App() {
  const toastRef = createRef<any>();

  const closeToast = (key: any) => () => {
    toastRef.current.closeSnackbar(key);
  };
  return (
    <div className="App">
      <Routes>
        {/* Auth Routes */}
        <Route
          path="/"
          element={
            <Suspense fallback={<Loading />}>
              <SnackbarProvider
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                ref={toastRef}
                TransitionComponent={Grow}
                preventDuplicate
                autoHideDuration={5000}
                action={(key: any) => (
                  <IconButton
                    size="small"
                    aria-label="close"
                    color="inherit"
                    onClick={closeToast(key)}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                )}
              >
                <AuthLayout />
              </SnackbarProvider>
            </Suspense>
          }
        >
          <Route index element={<AuthSignin />} />
          <Route path="auth/admin" element={<AuthAdmin />} />
          <Route path="auth/dean" element={<AuthDean />} />
          <Route path="auth/hod" element={<AuthHod />} />
          <Route path="auth/teacher" element={<AuthTeacher />} />
        </Route>

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <Suspense fallback={<Loading />}>
              <SnackbarProvider
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                ref={toastRef}
                TransitionComponent={Grow}
                preventDuplicate
                autoHideDuration={5000}
                action={(key: any) => (
                  <IconButton
                    size="small"
                    aria-label="close"
                    color="inherit"
                    onClick={closeToast(key)}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                )}
              >
                <AdminLayout />
              </SnackbarProvider>
            </Suspense>
          }
        >
          <Route index element={<AdminIndex />} />
          <Route path="profile" element={<AdminProfile />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="notifications" element={<AdminNotifications />} />

          {/* Faculty */}
          <Route path="faculties" element={<AdminFaculties />} />
          <Route path="faculties/:faculty_id" element={<AdminFaculty />} />
          <Route path="faculties/create" element={<AdminCreateFaculty />} />

          {/* Department */}
          <Route path="departments" element={<AdminDepartments />} />
          <Route
            path="departments/:department_id"
            element={<AdminDepartment />}
          />
          <Route
            path="departments/create"
            element={<AdminCreateDepartment />}
          />

          {/* Subject */}
          <Route path="subjects" element={<AdminSubjects />} />
          <Route path="subjects/:subject_id" element={<AdminSubject />} />
          <Route path="subjects/create" element={<AdminCreateSubject />} />
        </Route>

        {/* Dean Routes */}
        <Route
          path="/dean"
          element={
            <Suspense fallback={<Loading />}>
              <SnackbarProvider
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                ref={toastRef}
                TransitionComponent={Grow}
                preventDuplicate
                autoHideDuration={5000}
                action={(key: any) => (
                  <IconButton
                    size="small"
                    aria-label="close"
                    color="inherit"
                    onClick={closeToast(key)}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                )}
              >
                <DeanLayout />
              </SnackbarProvider>
            </Suspense>
          }
        >
          <Route index element={<DeanIndex />} />
          <Route path="profile" element={<DeanProfile />} />
          <Route path="settings" element={<DeanSettings />} />
          <Route path="notifications" element={<DeanNotifications />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
