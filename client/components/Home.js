import React from "react";
import { connect } from "react-redux";

/**
 * COMPONENT
 */
export const Home = (props) => {
  const { firstName } = props;

  return (
    <div>
      <h3>Welcome, {firstName}</h3>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    firstName: state.auth.user ? state.auth.user.firstName : "",
  };
};

export default connect(mapState)(Home);
