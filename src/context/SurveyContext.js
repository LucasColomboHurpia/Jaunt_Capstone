import React, { createContext, useState } from 'react';

const SurveyContext = createContext();

export const SurveyProvider = ({ children }) => {
  const [surveyData, setSurveyData] = useState({});
  const [activityParameters, setActivityParameters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentActivityId, setCurrentActivityId] = useState(null);
  const [invitedContacts, setInvitedContacts] = useState([]);
  const [registeredContacts, setRegisteredContacts] = useState([]);
  const [users, setUsers] = useState([]);

  return (
    <SurveyContext.Provider value={{ 
        surveyData, 
        setSurveyData, 
        activityParameters, 
        setActivityParameters, 
        loading, 
        setLoading, 
        currentActivityId,
        setCurrentActivityId,
        invitedContacts,
        setInvitedContacts,
        registeredContacts,
        setRegisteredContacts,
        users, 
        setUsers
    }}>
      {children}
    </SurveyContext.Provider>
  );
};

export default SurveyContext;
