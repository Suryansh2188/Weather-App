import WeatherApp from "./components/WeatherApp/WeatherApp";
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          success: {
            theme: {
              primary: '#4aed88',
            },
          },
        }}
      ></Toaster>
      <WeatherApp />
    </>
  );
}

export default App;
