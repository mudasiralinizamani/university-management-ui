import { AxiosError } from "axios";
import { useSnackbar } from "notistack";
import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../blocks/dean/Sidebar";
import Topbar from "../../shared/Topbar";
import axios from "../api/axios";
import { UsersEndpoints } from "../api/endpoints";
import { IUser } from "../models/IUser.interface";

function DeanLayout() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [user, setUser] = useState<IUser | null>();

  useEffect(() => {
    if (
      (localStorage.getItem("id") !== null &&
        localStorage.getItem("role") !== "Dean") ||
      (localStorage.getItem("id") === null &&
        localStorage.getItem("role") === null) ||
      (localStorage.getItem("id") === null &&
        localStorage.getItem("role") !== "Dean")
    ) {
      enqueueSnackbar("Not Authorized", { variant: "warning" });
      return navigate("/", { replace: true });
    }

    const getUser = async () => {
      await axios
        .get(`${UsersEndpoints.GetUser}${localStorage.getItem("id")}`)
        .then((res) => setUser(res.data))
        .catch((err: AxiosError) => {
          if (err.response?.data.code === "UserNotFound") {
            enqueueSnackbar("Plz signin again", { variant: "info" });
            navigate("/", { replace: true });
          }
        });
    };
    getUser();
    return () => setUser(null);
  }, []);
  return (
    <div className="out">
      <div className="page5 js-page4">
        <Topbar profilePic={user?.profilePic} />
        <div className="page5__wrapper">
          <Sidebar />
          <div className="page5__container">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeanLayout;
