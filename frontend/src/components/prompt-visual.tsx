'use client'

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export type PromptTable = {
  caption?: string
  headers: string[]
  rows: (string | number)[][]
}

export type PromptChart = {
  title: string
  yLabel?: string
  /** First key of each row is the x-axis category, remaining keys are series */
  data: Record<string, string | number>[]
  xKey: string
  series: string[]
}

export type PromptVisual = {
  chart?: PromptChart
  table?: PromptTable
  /** Reading passage / lecture etc. shown as text blocks */
  texts?: { heading: string; body: string }[]
}

const COLORS = ['#2563eb', '#16a34a', '#f59e0b', '#db2777', '#7c3aed']

export function DataTable({ table }: { table: PromptTable }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border border-slate-200 rounded-md">
        {table.caption && (
          <caption className="text-left text-xs text-muted-foreground pb-2">{table.caption}</caption>
        )}
        <thead className="bg-slate-100">
          <tr>
            {table.headers.map((h, i) => (
              <th key={i} className="border border-slate-200 px-3 py-2 text-left font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, r) => (
            <tr key={r} className={r % 2 ? 'bg-slate-50' : 'bg-white'}>
              {row.map((cell, c) => (
                <td key={c} className="border border-slate-200 px-3 py-2">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function DataChart({ chart }: { chart: PromptChart }) {
  return (
    <figure className="space-y-2">
      <figcaption className="text-sm font-semibold text-slate-700 text-center">{chart.title}</figcaption>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chart.data} margin={{ top: 8, right: 16, left: 8, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={chart.xKey} />
            <YAxis
              label={
                chart.yLabel
                  ? { value: chart.yLabel, angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }
                  : undefined
              }
            />
            <Tooltip />
            <Legend />
            {chart.series.map((s, i) => (
              <Bar key={s} dataKey={s} fill={COLORS[i % COLORS.length]} />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </figure>
  )
}

/** Renders the supporting material (chart, table, passages) for a question. */
export function PromptVisualCard({ visual }: { visual: PromptVisual }) {
  return (
    <Card className="border-slate-200">
      <CardHeader className="pb-4">
        <CardTitle className="text-sm uppercase text-muted-foreground tracking-wider">
          Source Material
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {visual.chart && <DataChart chart={visual.chart} />}
        {visual.table && <DataTable table={visual.table} />}
        {visual.texts?.map((t) => (
          <div key={t.heading} className="space-y-2">
            <h4 className="font-semibold text-slate-800">{t.heading}</h4>
            {t.body.split(/\n\s*\n/).map((p, i) => (
              <p key={i} className="text-sm text-slate-700 leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

/** Plain-text version of the visual so the AI grader can see the same data. */
export function describeVisual(visual?: PromptVisual): string {
  if (!visual) return ''
  const parts: string[] = []
  if (visual.chart) {
    const c = visual.chart
    parts.push(
      `CHART: ${c.title}\n` +
        c.data.map((d) => `${d[c.xKey]}: ` + c.series.map((s) => `${s}=${d[s]}`).join(', ')).join('\n')
    )
  }
  if (visual.table) {
    parts.push(
      `TABLE:\n${visual.table.headers.join(' | ')}\n` +
        visual.table.rows.map((r) => r.join(' | ')).join('\n')
    )
  }
  visual.texts?.forEach((t) => parts.push(`${t.heading.toUpperCase()}:\n${t.body}`))
  return parts.join('\n\n')
}
