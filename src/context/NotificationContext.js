import React, { createContext, useEffect, useState } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = (props) => {
    const { children, alertMessage, setAlertMessage, showAlert, setShowAlert, notifications } = props;
    
  return (
    <NotificationContext.Provider value={{ alertMessage, setAlertMessage, showAlert, setShowAlert, notifications }}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
