import React, { useContext } from "react";
import { AlertContext } from "../../context/alert/alertContext";

import { Alert } from "./Alert";

const ContextAlert = () => {
  const alertContext = useContext(AlertContext);
  return (
    <>
      {alertContext.alerts.length > 0 &&
        alertContext.alerts.map((alert) => (
          <Alert key={alert.id} message={alert.msg} color={alert.type} />
        ))}
    </>
  );
};

export { ContextAlert };
