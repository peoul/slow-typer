import "../styles/State.css";
import type { StatsProps } from "../types";

function Stats({ wrongCounter, textLength, time }: StatsProps) {
  const accuracy = ((textLength - wrongCounter) / textLength) * 100;
  const formattedAccuracy = Number(accuracy.toFixed(0)); 

  const timeInMinutes = time / 60;

  const WPM = Math.round(textLength / 5 / timeInMinutes);
  
  return (
    <div className="stat_box">
      <h1>Your Stats</h1>
      <div className="stat_container">
        <StatItem name="Mistakes" value={wrongCounter} />
        <StatItem name="WPM" value={WPM} />
        <StatItem name="Accuracy (%)" value={formattedAccuracy} />
      </div>
    </div>
  );
}

const StatItem = ({ name, value }: { name: string; value: number }) => {
  return (
    <div className="stat_item">
      <p>{value}</p>
      <h3>{name}</h3>
    </div>
  );
};
export default Stats;
