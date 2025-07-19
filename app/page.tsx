"use client"

import { useState } from "react"
import { Search, Loader2, TrendingUp, Users, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import SentimentChart from "./components/sentiment-chart"
import PlatformCard from "./components/platform-card"
import PlaceholderChart from "./components/placeholder-chart"

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [hasResults, setHasResults] = useState(false)

  const handleAnalyze = async () => {
    if (!inputValue.trim()) return

    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
    setHasResults(true)
  }

  const redditComments = [
    "This is actually a game-changer for content creators",
    "Finally, someone built something useful with AI",
    "The real-time aspect is what makes this special",
  ]

  const twitterComments = [
    "🔥 This tool is incredible for tracking brand sentiment",
    "Just tried ReactionRadar - mind blown by the accuracy",
    "Perfect timing for this launch, market needs this",
  ]

  const hackerNewsComments = [
    "Interesting approach to sentiment analysis at scale",
    "The technical implementation seems solid",
    "Would love to see the architecture behind this",
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">ReactionRadar</h1>
              <p className="text-gray-600 mt-1">Know What the Internet Thinks in Real-Time</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Input Form Section */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Enter a topic or news URL to analyze..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="h-12 text-lg"
                />
              </div>
              <Button
                onClick={handleAnalyze}
                disabled={isLoading || !inputValue.trim()}
                className="h-12 px-8 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 mr-2" />
                    Analyze Reactions
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Dashboard */}
        {hasResults && (
          <div className="space-y-8">
            {/* Summary and Sentiment Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Public Opinion Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <h3 className="font-semibold text-green-800">Overall Sentiment: Positive</h3>
                      <p className="text-green-700 mt-1">
                        The public reaction is overwhelmingly positive with 68% positive sentiment across all platforms.
                      </p>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-green-600">68%</div>
                        <div className="text-sm text-gray-600">Positive</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-gray-600">22%</div>
                        <div className="text-sm text-gray-600">Neutral</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-red-600">10%</div>
                        <div className="text-sm text-gray-600">Negative</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>Sentiment Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <SentimentChart />
                </CardContent>
              </Card>
            </div>

            {/* Platform Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <PlatformCard
                platform="Reddit"
                color="bg-orange-500"
                comments={redditComments}
                stats={{ posts: 1247, engagement: "High" }}
              />
              <PlatformCard
                platform="Twitter/X"
                color="bg-black"
                comments={twitterComments}
                stats={{ posts: 3891, engagement: "Very High" }}
              />
              <PlatformCard
                platform="Hacker News"
                color="bg-orange-600"
                comments={hackerNewsComments}
                stats={{ posts: 156, engagement: "Medium" }}
              />
            </div>

            {/* Placeholder Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>Emotion Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <PlaceholderChart
                    title="Emotion Analysis"
                    description="Joy: 45%, Trust: 23%, Anticipation: 18%, Others: 14%"
                  />
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>Trend Over Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <PlaceholderChart
                    title="24-Hour Sentiment Trend"
                    description="Sentiment has been steadily positive with peaks during peak hours"
                  />
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Top Influencers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                        TI
                      </div>
                      <div>
                        <div className="font-semibold">@techinfluencer</div>
                        <div className="text-sm text-gray-600">2.3M followers</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold">
                        AI
                      </div>
                      <div>
                        <div className="font-semibold">@aiexpert</div>
                        <div className="text-sm text-gray-600">1.8M followers</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                        DG
                      </div>
                      <div>
                        <div className="font-semibold">@digitalguru</div>
                        <div className="text-sm text-gray-600">1.2M followers</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!hasResults && !isLoading && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to Analyze</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Enter a topic or URL above to start analyzing real-time reactions from across the internet.
            </p>
          </div>
        )}
      </main>
    </div>
  )
}
