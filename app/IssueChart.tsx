'use client';

import { Box, Card } from '@radix-ui/themes';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueChart = ({ open, inProgress, closed }: Props) => {
  const data = [
    { label: 'جدید', value: open },
    { label: 'در دست اقدام', value: inProgress },
    { label: 'به اتمام رسیده', value: closed }
  ];
  return (
    <Box>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="label" />
          <Tooltip />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Bar dataKey="value" barSize={30} style={{ fill: 'var(--accent-9)' }} />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default IssueChart;
