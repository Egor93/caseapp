import './App.css';
import {ConfigProvider} from "antd";
import {MainComponent} from "./MainComponent";
function App() {
  const theme={
    token: {
      // Seed Token
      colorPrimary: '#0b1f65',
      borderRadius: 2,
      fontFamily: "Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif",
      // Alias Token
      colorBgContainer: '#f7f7f8',
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
