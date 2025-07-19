"use client"

const data = [
  { name: "Positive", value: 68, color: "#10B981" },
  { name: "Neutral", value: 22, color: "#6B7280" },
  { name: "Negative", value: 10, color: "#EF4444" },
]

export default function SentimentChart() {
  // Calculate angles for pie chart
  const total = data.reduce((sum, item) => sum + item.value, 0)
  let cumulativePercentage = 0

  const pieSlices = data.map((item, index) => {
    const percentage = (item.value / total) * 100
    const startAngle = (cumulativePercentage / 100) * 360
    const endAngle = ((cumulativePercentage + percentage) / 100) * 360

    cumulativePercentage += percentage

    // Calculate path for SVG arc
    const startAngleRad = (startAngle * Math.PI) / 180
    const endAngleRad = (endAngle * Math.PI) / 180

    const largeArcFlag = percentage > 50 ? 1 : 0
    const x1 = 50 + 40 * Math.cos(startAngleRad)
    const y1 = 50 + 40 * Math.sin(startAngleRad)
    const x2 = 50 + 40 * Math.cos(endAngleRad)
    const y2 = 50 + 40 * Math.sin(endAngleRad)

    const pathData = [`M 50 50`, `L ${x1} ${y1}`, `A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2}`, `Z`].join(" ")

    return {
      ...item,
      pathData,
      percentage,
    }
  })

  return (
    <div className="h-64 flex items-center justify-center">
      <div className="flex items-center gap-8">
        {/* Pie Chart SVG */}
        <div className="relative">
          <svg width="200" height="200" viewBox="0 0 100 100" className="transform -rotate-90">
            {pieSlices.map((slice, index) => (
              <path
                key={index}
                d={slice.pathData}
                fill={slice.color}
                stroke="white"
                strokeWidth="0.5"
                className="hover:opacity-80 transition-opacity cursor-pointer"
              />
            ))}
          </svg>

          {/* Center label */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">100%</div>
              <div className="text-sm text-gray-600">Total</div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="space-y-3">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }} />
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-900">{item.name}</span>
                <span className="text-gray-600">({item.value}%)</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
