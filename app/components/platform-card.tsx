import { MessageCircle, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PlatformCardProps {
  platform: string
  color: string
  comments: string[]
  stats: {
    posts: number
    engagement: string
  }
}

export default function PlatformCard({ platform, color, comments, stats }: PlatformCardProps) {
  const getIcon = () => {
    switch (platform) {
      case "Reddit":
        return (
          <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
            R
          </div>
        )
      case "Twitter/X":
        return (
          <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center text-white text-xs font-bold">
            X
          </div>
        )
      case "Hacker News":
        return (
          <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
            Y
          </div>
        )
      default:
        return <MessageCircle className="w-6 h-6" />
    }
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          {getIcon()}
          {platform}
        </CardTitle>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span>{stats.posts.toLocaleString()} posts</span>
          <span className="flex items-center gap-1">
            <TrendingUp className="w-4 h-4" />
            {stats.engagement}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <h4 className="font-semibold text-sm text-gray-700">Top Comments:</h4>
          <ul className="space-y-2">
            {comments.map((comment, index) => (
              <li
                key={index}
                className="text-sm p-3 bg-gray-50 rounded-lg border-l-4 border-gray-300 hover:border-blue-400 transition-colors"
              >
                {comment}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
