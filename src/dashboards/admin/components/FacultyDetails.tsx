import { Link } from "react-router-dom";

interface properties {
  id: string;
  name: string;
  deanName: string;
  deanId: string;
  createdAt: string;
  updatedAt: string;
}

function FacultyDetails(props: properties) {
  return (
    <div className="card1">
      <div className="card1__head">
        <div className="card1__category">Faculty Details</div>
      </div>
      <div className="card1__body">
        <div className="card1__list faculty_details_card">
          <p>Name: </p>
          <Link className="card1__item" to={`/admin/faculties/${props?.id}`}>
            {props?.name}
          </Link>
        </div>
        <div className="card1__list faculty_details_card">
          <p>Dean: </p>
          <Link className="card1__item" to={`/admin/users/${props?.deanId}`}>
            {props?.deanName}
          </Link>
        </div>
        <div className="card1__list faculty_details_card">
          <p>Created: </p>
          <Link className="card1__item" to="">
            {props?.createdAt?.slice(0, 10)}
          </Link>
        </div>
        <div className="card1__list faculty_details_card">
          <p>Updated: </p>
          <Link className="card1__item" to="">
            {props?.updatedAt?.slice(0, 10)}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FacultyDetails;
