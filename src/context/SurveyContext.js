import React, { createContext, useState } from 'react';

const SurveyContext = createContext();

export const SurveyProvider = ({ children }) => {
  const [surveyData, setSurveyData] = useState({});
  const [activityParameters, setActivityParameters] = useState({});

  return (
    <SurveyContext.Provider value={{ surveyData, setSurveyData, activityParameters, setActivityParameters }}>
      {children}
    </SurveyContext.Provider>
  );
};

export default SurveyContext;
