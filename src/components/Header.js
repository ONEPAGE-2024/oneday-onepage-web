import "./Header.css";

const Header = ({ title }) => {
  return (
    <div className="header">
      <div className="monthContainer">
        <button className="button">{"<"}</button>
        <div className="month">{title}</div>
        <button className="button">{">"}</button>
      </div>
    </div>
  );
};

export default Header;
