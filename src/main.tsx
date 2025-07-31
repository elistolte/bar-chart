import React  from "react";
import ReactDOM from 'react-dom/client';
import BarChart from './barChartPretty'
import BarChartFlex from './barChartPrettyFlex'

const testData = [
  { x: 'Jan', y: 11 },
  { x: 'Feb', y: 22 },
  { x: 'Mar', y: 33 },
  { x: 'Apr', y: 44 },
  { x: 'May', y: 55 },
  { x: 'Jan', y: 66 },
  { x: 'Feb', y: 77 },
  { x: 'Mar', y: 45 },
  { x: 'Apr', y: 90 },
  { x: 'May', y: 75 },
  { x: 'Jan', y: 65 },
  { x: 'Feb', y: 80 },
  { x: 'Mar', y: 45 },
  { x: 'Apr', y: 90 },
  { x: 'May', y: 75 }
];

const App = () => {
  const useFlexLayout = true; // Switch between legacy (false) and flexbox (true) layout
  
  const ChartComponent = useFlexLayout ? BarChartFlex : BarChart;

  return (
    <div style={{ padding: '20px' }}>
       <h1 style={{ fontFamily: 'Chillax' }}>My Bar Chart Test {useFlexLayout ? '(Flexbox)' : '(Legacy)'}</h1>
      <ChartComponent data={testData} fontFamily="Chillax"/>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);