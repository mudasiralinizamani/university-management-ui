import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import signout from "../../core/helpers/signout";
import "../../assets/scss/blocks/Sidebar.scss";

// Material Icons - Mudasir Nizamani
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";

function Sidebar() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();

  const closeSidebar = () => {
    let sidebar = document.getElementById("js-sidebar4");
    let html = document.getElementById("dom_html");
    let body = document.getElementById("dom_body");
    let bg = document.getElementById("js-header-bg");

    sidebar?.classList.remove("visible");
    bg?.classList.remove("visible");
    html?.classList.remove("no-scroll");
    body?.classList.remove("no-scroll");
  };

  const handleSignout = () => {
    signout();
    enqueueSnackbar("Successfully signed out", { variant: "info" });
    navigate("/", { replace: true });
  };

  return (
    <div className="sidebar5 js-sidebar4" id="js-sidebar4">
      <div className="sidebar5__top">
        <button
          onClick={closeSidebar}
          className="sidebar5__close js-sidebar4-close"
        >
          <svg className="icon icon-close">
            <use xlinkHref="/assets/square/img/sprite.svg#icon-close"></use>
          </svg>
        </button>
        <Link className="sidebar5__logo" to=""></Link>
      </div>
      <div className="sidebar5__wrapper">
        <div className="sidebar5__nav">
          <div className="sidebar2__category">Dashboard</div>
          <Link
            to="/dean"
            className={`sidebar5__item ${
              location.pathname == "/dean" ? "active" : ""
            }`}
          >
            <svg className="icon icon-dashboard">
              <use xlinkHref="/assets/square/img/sprite.svg#icon-dashboard"></use>
            </svg>
            <div className="sidebar__item__text">Dashboard</div>
          </Link>

          <div className="sidebar2__category" style={{ marginTop: "2rem" }}>
            Account
          </div>
          <Link
            to="/dean/profile"
            className={`sidebar5__item ${
              location.pathname == "/dean/profile" ? "active" : ""
            }`}
          >
            <AccountCircleOutlinedIcon className="icon" />
            <div className="sidebar__item__text">Profile</div>
          </Link>
          <Link
            to="/dean/notifications"
            className={`sidebar5__item ${
              location.pathname == "/dean/notifications" ? "active" : ""
            }`}
          >
            <NotificationsActiveOutlinedIcon className="icon" />
            <div className="sidebar__item__text">Notifications</div>
          </Link>
          <Link
            to="/dean/settings"
            className={`sidebar5__item ${
              location.pathname == "/dean/settings" ? "active" : ""
            }`}
          >
            <svg className="icon icon-settings">
              <use xlinkHref="/assets/square/img/sprite.svg#icon-settings"></use>
            </svg>
            <div className="sidebar__item__text">Settings</div>
          </Link>
        </div>
      </div>

      <Link to="/" className="sidebar5__logout" onClick={handleSignout}>
        <svg className="icon icon-logout">
          <use xlinkHref="/assets/square/img/sprite.svg#icon-logout"></use>
        </svg>
        Signout
      </Link>
    </div>
  );
}

export default Sidebar;
