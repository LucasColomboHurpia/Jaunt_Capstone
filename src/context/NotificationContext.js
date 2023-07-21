import React, { createContext, useEffect, useState } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = (props) => {
    const { children, alertMessage, setAlertMessage, showAlert, setShowAlert, notifications, setNotifications } = props;
    
  return (
    <NotificationContext.Provider value={{ alertMessage, setAlertMessage, showAlert, setShowAlert, notifications, setNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
