import { BarChart3 } from "lucide-react"

interface PlaceholderChartProps {
  title: string
  description: string
}

export default function PlaceholderChart({ title, description }: PlaceholderChartProps) {
  return (
    <div className="h-48 flex flex-col items-center justify-center text-center p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
      <BarChart3 className="w-12 h-12 text-gray-400 mb-3" />
      <h3 className="font-semibold text-gray-700 mb-2">{title}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  )
}
