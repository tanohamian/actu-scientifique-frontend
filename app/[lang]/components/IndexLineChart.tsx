import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { RechartsDevtools } from '@recharts/devtools';
import { useEffect, useState } from 'react';
import { mockData } from '@/app/constant';

interface IndexLineChartInterface{
  start?: Date | string,
  end?: Date | string,
  data?: {date: string, count: number}[]

}


export default function IndexLineChart({data=mockData, start="01/02/2026", end="28/02/2026"} : IndexLineChartInterface) {
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
