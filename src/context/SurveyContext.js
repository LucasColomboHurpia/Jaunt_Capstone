import React, { createContext, useState } from 'react';

const SurveyContext = createContext();

export const SurveyProvider = (props) => {
    const { children,
        surveyData,
        setSurveyData,
        preferences,
        setPreferences,
        activities,
        setActivities,
        loading,
        setLoading,
        currentActivityId,
        setCurrentActivityId,
        invitedContacts,
        setInvitedContacts,
        registeredContacts,
        setRegisteredContacts,
        users, setUsers
    } = props;

  return (
    <SurveyContext.Provider value={{ 
        surveyData, 
        setSurveyData, 
        activities, 
        setActivities, 
        loading, 
        setLoading, 
        currentActivityId,
        setCurrentActivityId,
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
