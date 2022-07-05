import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

// LOCAL_STORAGE_KEY0 = "UserapiKey";

export default function RequireApiClient(props) {
  //   useEffect(() => {
  //     localStorage.setItem(LOCAL_STORAGE_KEY0, JSON.stringify(apiKey));
  //   }, []);

  if (!props.apiKey) {
    return <Navigate to="/" />;
  }
  return props.children;
}
