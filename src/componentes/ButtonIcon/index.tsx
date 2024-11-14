import './styles.css';

import  ArrowIcon  from './arrow.svg';

const ButtonIcon = () => {
  return (
    <div className="btn-container">
      <button className="btn btn-primary">
        <h6>LOGIN</h6>
      </button>
      <div className="btn-icon-container">
        <img src={ArrowIcon} alt="" />
      </div>
    </div>
  );
};

export default ButtonIcon;
