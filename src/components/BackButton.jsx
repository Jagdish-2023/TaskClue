import { useNavigate } from "react-router-dom";

const Backbutton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (window.history.state && window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/"); //fallback
    }
  };
  return (
    <button
      className="btn btn-sm btn-primary"
      onClick={handleClick}
    >{`< Back`}</button>
  );
};

export default Backbutton;
