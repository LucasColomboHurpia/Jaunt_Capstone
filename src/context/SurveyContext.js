import React, { createContext, useState } from 'react';

const SurveyContext = createContext();

export const SurveyProvider = ({ children }) => {
  const [surveyData, setSurveyData] = useState({});
  const [activityParameters, setActivityParameters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentActivityId, setCurrentActivityId] = useState(null); 

  return (
    <SurveyContext.Provider value={{ surveyData, setSurveyData, activityParameters, setActivityParameters, loading, setLoading, currentActivityId, setCurrentActivityId }}>
      {children}
    </SurveyContext.Provider>
  );
};

export default SurveyContext;
