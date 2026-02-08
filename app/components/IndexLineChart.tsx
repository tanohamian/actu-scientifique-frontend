import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { RechartsDevtools } from '@recharts/devtools';
import { useEffect, useState } from 'react';

interface IndexLineChartInterface{
  start?: Date | string,
  end?: Date | string,
  data?: {date: string, count: number}[]
}

const mockData = [
  { date: "01/02/2026", count: 185 }, { date: "02/02/2026", count: 192 },
  { date: "03/02/2026", count: 168 }, { date: "04/02/2026", count: 174 },
  { date: "05/02/2026", count: 150 }, { date: "06/02/2026", count: 98 },
  { date: "07/02/2026", count: 74 },  { date: "08/02/2026", count: 62 },
  { date: "09/02/2026", count: 89 },  { date: "10/02/2026", count: 110 },
  { date: "11/02/2026", count: 95 },  { date: "12/02/2026", count: 82 },
  { date: "13/02/2026", count: 105 }, { date: "14/02/2026", count: 70 },
  { date: "15/02/2026", count: 55 },  { date: "16/02/2026", count: 88 },
  { date: "17/02/2026", count: 112 }, { date: "18/02/2026", count: 94 },
  { date: "19/02/2026", count: 101 }, { date: "20/02/2026", count: 125 },
  { date: "21/02/2026", count: 118 }, { date: "22/02/2026", count: 130 },
  { date: "23/02/2026", count: 452 }, 
  { date: "24/02/2026", count: 140 }, { date: "25/02/2026", count: 115 },
  { date: "26/02/2026", count: 98 },  { date: "27/02/2026", count: 102 },
  { date: "28/02/2026", count: 107 }
];


export default function IndexLineChart({data=mockData, start="03/02/2026", end="10/02/2026"} : IndexLineChartInterface) {
  const parseDate = (dateStr: string) => {
    const [day, month, year] = dateStr.split('/').map(Number);
    return new Date(year, month - 1, day).getTime();
  };

  const startTime = parseDate(start as string);
  const endTime = parseDate(end as string);

  
  const [filteredData, setFilteredData] = useState<{ date:string, count:number}[]>()
  useEffect(() => {
    const refresh = ()=>{
      const filtered = data.filter(item => {
      const itemTime = parseDate(item.date);
      return itemTime >= startTime && itemTime <= endTime;
      });
      setFilteredData(filtered);
    }
    refresh()
    }, [data, endTime, startTime]
  )
  
  return (
    <LineChart
      style={{ width: '100%', aspectRatio: 1.9, maxWidth: 1200, marginLeft: 'auto', marginRight: 'auto' }}
      responsive
      data={filteredData}
      margin={{
        top: 20,
        right: 20,
        bottom: 5,
        left: 0,
      }}
    >
      <CartesianGrid stroke="#aaa" strokeDasharray="5 5" />
      <Line type="monotone" dataKey="count" stroke="#EF7B96" strokeWidth={2} name="Visites par jour" />
      <XAxis 
        dataKey="date" 
        stroke='white' 
        label={{ value: 'Jours', position: 'bottom', angle: 0, stroke: 'white'}}
        tickFormatter={(value: string) => value.substring(0, value.lastIndexOf('/'))}
      />
      <YAxis 
        width="auto" 
        stroke='white' 
        label={{ value: 'Visites', position: 'insideLeft', angle: -90, stroke: 'white'}} />
      <Legend align="right" />
      <Tooltip 
        contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }}
        itemStyle={{ color: '#EF7B96' }}
        labelStyle={{ color: '#aaa', marginBottom: '4px' }}
        labelFormatter={(value) => `Date : ${value}`} 
      />
      <RechartsDevtools />
    </LineChart>
  );
}
