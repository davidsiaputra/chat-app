import "./homepage.styles.scss";

import { withRouter } from "react-router-dom";

import CustomButton from "../../components/custom-button/custom-button.component";

function Homepage({ history, match }) {
  return (
    <div className="homepage">
      <div className="info-texts">
        <p className="title">
          A <strong>Chat App</strong> built using the MERN stack from scratch
        </p>
        <p className="subtitle">
          <strong>Sign Up</strong> or <strong>login</strong> below to start
          using it
        </p>
      </div>
      <div className="buttons">
        <CustomButton onClick={() => history.push(`/signup`)}>
          Sign Up
        </CustomButton>
        <CustomButton onClick={() => history.push(`/signin`)} secondary={true}>
          Sign In
        </CustomButton>
      </div>
    </div>
  );
}

export default withRouter(Homepage);
