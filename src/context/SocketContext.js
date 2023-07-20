import React, { createContext, useEffect, useState } from 'react';

const SocketContext = createContext();

export const SocketProvider = (props) => {
    const { children, socket, setSocket } = props;
    
  return (
    <SocketContext.Provider value={{ socket, setSocket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;
