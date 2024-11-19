import "./App.css";
import Grid from "./components/grid/Grid";
import { useAppContext } from "./context/AppContext";
import style from "./style.module.css";

function App() {
  const { grid, isGameStart } = useAppContext();
  return (
    <div className={style.container}>
      {/* <h2>Score : {score}</h2>
      <h3>Timer : {Math.floor(milliSecondsToSeconds(timeElapsed))} Seconds</h3> */}
      <Grid grid={grid} />
      {isGameStart === null && <p>Press any key to start</p>}
      {isGameStart === false && <h1>You just lost the game</h1>}
    </div>
  );
}

export default App;
