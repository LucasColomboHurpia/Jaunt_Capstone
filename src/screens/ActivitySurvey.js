const ActivitySurvey = ({ navigation }) => {
    const { surveyData, setSurveyData } = useContext(SurveyContext);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [isSurveyComplete, setSurveyComplete] = useState(false);
  
    const handleAnswerOptionClick = (answer) => {
      setAnswers({ ...answers, [`answer${currentQuestion + 1}`]: answer });
  
      if (currentQuestion === questionsComponents.length - 1) {
        // Last question, submit survey
        const newSurveyData = {
          ...surveyData,
          ...answers,
          [`answer${currentQuestion + 1}`]: answer,
        };
        setSurveyData(newSurveyData);
        console.log(newSurveyData);
        setSurveyComplete(true);
      } else {
        // Move to next question
        setCurrentQuestion(currentQuestion + 1);
      }
    };
  
    const handlePreviousQuestion = () => {
      if (currentQuestion > 0) {
        setCurrentQuestion(currentQuestion - 1);
      }
    };
  
    if (isSurveyComplete) {
      return (
        <SafeAreaView style={styles.container}>
          <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
          <Text>Activity survey done!</Text>
          <Button title="Back to Home" color="gray" onPress={() => navigation.navigate('HomePage')} />
        </SafeAreaView>
      );
    }
  
    const CurrentQuestionComponent = questionsComponents[currentQuestion];
  
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
        <Text>{`${currentQuestion + 1} of ${questionsComponents.length}`}</Text>
        <CurrentQuestionComponent onAnswer={handleAnswerOptionClick} onGoBack={handlePreviousQuestion} />
      </SafeAreaView>
    );
  };
  