import * as React from "react";
import AuthProtectedView from "./AuthProtectedView";

export default () => (
  <AuthProtectedView>
    {({ status }) => {
      if (status === "password") {
        return <p>Account create</p>;
      }
      if (status === "hash") {
        return <p>Locked</p>;
      }
      return <p>Uninitialized</p>;
    }}
  </AuthProtectedView>
);
