'use client';

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts';
import { revenueHistory } from '@/lib/seed';

export function RevenueChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={revenueHistory} margin={{ top: 8, right: 8, bottom: 0, left: -12 }}>
        <defs>
          <linearGradient id="reachRev" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#4f46e5" stopOpacity={0.28} />
            <stop offset="100%" stopColor="#4f46e5" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="#edeef2" strokeDasharray="2 4" vertical={false} />
        <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9199aa' }} axisLine={false} tickLine={false} />
        <YAxis
          tickFormatter={(v: number) => `${Math.round(v / 1000)}k`}
          tick={{ fontSize: 11, fill: '#9199aa' }}
          axisLine={false}
          tickLine={false}
          width={40}
        />
        <Tooltip
          contentStyle={{ background: 'white', border: '1px solid #e6e7ec', borderRadius: 8, fontSize: 12 }}
          formatter={(v: number, k: string) => [`€${v.toLocaleString('en-GB')}`, k === 'revenue' ? 'Revenue' : 'Pipeline']}
        />
        <Area
          type="monotone"
          dataKey="pipeline"
          stroke="#9199aa"
          strokeWidth={1.5}
          strokeDasharray="3 4"
          fill="transparent"
          isAnimationActive
        />
        <Area
          type="monotone"
          dataKey="revenue"
          stroke="#4f46e5"
          strokeWidth={2}
          fill="url(#reachRev)"
          isAnimationActive
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
