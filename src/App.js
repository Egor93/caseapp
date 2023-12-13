import './App.css';
import {ConfigProvider} from "antd";
import {MainComponent} from "./MainComponent";
function App() {
  const theme={
    token: {
      // Seed Token
      colorPrimary: '#5064bb',
      borderRadius: 6,
      fontFamily: "Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif",
      // Alias Token
      colorBgContainer: '#fff',
        minHeight:"100vh"
    },
  }
  return (
      <div>
        <ConfigProvider theme={theme}>
          <MainComponent/>
        </ConfigProvider>
      </div>
  );
}


export default App;
