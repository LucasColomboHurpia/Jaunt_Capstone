import { loadAsync } from 'expo-font';

const useFonts = async () => {
    await loadAsync({
        NeuzeitGrotesk: require(`../../assets/fonts/Neuzeit Grotesk W01 Regular.otf`)
    });
};
  
export default useFonts;