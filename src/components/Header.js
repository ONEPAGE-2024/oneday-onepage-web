import { useNavigate } from "react-router-dom";
import "./Header.css";

const Header = ({ title }) => {
  const navigate = useNavigate();
  return (
    <div className="header">
      <div className="monthContainer">
        <button className="button" onClick={() => navigate(-1)}>
          {"<"}
        </button>
        <div className="month">{title}</div>
        <button className="button" onClick={() => navigate(+1)}>
          {">"}
        </button>
      </div>
    </div>
  );
};

export default Header;
