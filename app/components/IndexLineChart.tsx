import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { RechartsDevtools } from '@recharts/devtools';

const data = [
  {
    name: 'Lundi',
    uv: 400,
    pv: 240,
    amt: 2400,
  },
  {
    name: 'Mardi',
    uv: 300,
    pv: 456,
    amt: 2400,
  },
  {
    name: 'Mercredi',
    uv: 300,
    pv: 139,
    amt: 2400,
  },
  {
    name: 'Jeudi',
    uv: 200,
    pv: 980,
    amt: 2400,
  },
  {
    name: 'Vendredi',
    uv: 278,
    pv: 390,
    amt: 2400,
  },
  {
    name: 'Samedi',
    uv: 189,
    pv: 480,
    amt: 2400,
  },
  {
    name: 'Dimanche',
    uv: 655,
    pv: 241,
    amt: 2400,
  },
];


export default function IndexLineChart() {
  return (
    <LineChart
      style={{ width: '100%', aspectRatio: 1.9, maxWidth: 1200, marginLeft: 'auto', marginRight: 'auto' }}
      responsive
      data={data}
      margin={{
        top: 20,
        right: 20,
        bottom: 5,
        left: 0,
      }}
    >
      <CartesianGrid stroke="#aaa" strokeDasharray="5 5" />
      <Line type="monotone" dataKey="uv" stroke="#EF7B96" strokeWidth={2} name="Visites par jour" />
      <XAxis dataKey="name" stroke='white' />
      <YAxis width="auto" stroke='white' label={{ value: 'UV', position: 'insideLeft', angle: -90 }} />
      <Legend align="right" />
      <Tooltip />
      <RechartsDevtools />
    </LineChart>
  );
}