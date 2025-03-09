import type React from "react"

export const BarChart = ({ children, data }: { children: React.ReactNode; data: any[] }) => {
  return <div>{children}</div>
}

export const Bar = ({ dataKey, fill, radius }: { dataKey: string; fill: string; radius: number[] }) => {
  return <div />
}

export const XAxis = ({ dataKey, fontSize }: { dataKey: string; fontSize: number }) => {
  return <div />
}

export const YAxis = ({ fontSize }: { fontSize: number }) => {
  return <div />
}

export const CartesianGrid = ({ strokeDasharray }: { strokeDasharray: string }) => {
  return <div />
}

export const Tooltip = () => {
  return <div />
}

export const ResponsiveContainer = ({
  children,
  width,
  height,
}: { children: React.ReactNode; width: string | number; height: string | number }) => {
  return <div>{children}</div>
}

