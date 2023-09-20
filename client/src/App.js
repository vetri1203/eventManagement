import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const mail = location.state.email;
  return <div className="App">{mail}</div>;
}

export default App;
