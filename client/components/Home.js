import React from "react";
import { connect, useSelector } from "react-redux";
import Items from "../features/Items";

/**
 * COMPONENT
 */
export const Home = () => {
  const firstName = useSelector((state) => state.auth.user.firstName);
  return (
    <div>
      <div className="banner">
        <h2>Welcome back, {firstName}!</h2>
      </div>
      <Items />
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    firstName: state.auth.user.firstName,
  };
};

export default connect(mapState)(Home);
