import React, { createContext, useState } from 'react';

const SurveyContext = createContext();

export const SurveyProvider = (props) => {
    const { children,
        preferences,
        setPreferences,
        activities,
        setActivities,
        loading,
        setLoading,
        currentActivity,
        setCurrentActivity,
        invitedContacts,
        setInvitedContacts,
        registeredContacts,
        setRegisteredContacts,
        users, setUsers
    } = props;

  return (
    <SurveyContext.Provider value={{ 
        activities, 
        setActivities, 
        loading, 
        setLoading, 
        currentActivity,
        setCurrentActivity,
        invitedContacts,
        setInvitedContacts,
        registeredContacts,
        setRegisteredContacts,
        users, 
        setUsers,
        preferences,
        setPreferences,
    }}>
      {children}
    </SurveyContext.Provider>
  );
};

export default SurveyContext;
