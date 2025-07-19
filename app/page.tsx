import { useState } from "react";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";

const PLATFORM_COLORS = {
  reddit: "#FF4500",
  twitter: "#1DA1F2",
  hackernews: "#FF6600",
};

const MOCK_DATA = {
  summary:
    "Public opinion on this topic is mixed, with a slight positive tilt. Most Reddit users are optimistic, while Twitter shows more neutral reactions.",
  sentiment: [
    { name: "Positive", value: 45, color: "#4CAF50" },
    { name: "Neutral", value: 35, color: "#FFC107" },
    { name: "Negative", value: 20, color: "#F44336" },
  ],
  comments: {
    reddit: [
      "I think this is a great development!",
      "Interesting perspective from the OP.",
      "Not sure this will work long term.",
    ],
    twitter: [
      "Waiting to see more data on this.",
      "Could be a game changer!",
      "Sounds like hype to me.",
    ],
    hackernews: [
      "Technically this is a solid approach.",
      "Performance implications need testing.",
      "Will watch this project closely.",
    ],
  },
};

export default function Home() {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<typeof MOCK_DATA | null>(null);

  const handleAnalyze = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setResult(null);

    // Simulate API call
    setTimeout(() => {
      setResult(MOCK_DATA);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      {/* Header */}
      <header className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">ReactionRadar.ai</h1>
        <p className="text-gray-600 italic">Know What the Internet Thinks in Real-Time</p>
      </header>

      {/* Input Form */}
      <div className="mb-10 max-w-3xl mx-auto">
        <input
          type="text"
          placeholder="Enter topic or news URL..."
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        />
        <button
          onClick={handleAnalyze}
          disabled={loading || !topic.trim()}
          className="mt-4 w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 disabled:bg-blue-300"
        >
          {loading ? "Analyzing..." : "Analyze Reactions"}
        </button>
      </div>

      {/* Results */}
      {result && (
        <main className="max-w-6xl mx-auto space-y-10">
          {/* Summary Card */}
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-3">Public Opinion Summary</h2>
            <p className="text-gray-700">{result.summary}</p>
          </section>

          {/* Sentiment Pie Chart */}
          <section className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
            <h2 className="text-xl font-semibold mb-3 text-center">Sentiment Distribution</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={result.sentiment}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {result.sentiment.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </section>

          {/* Platform Comments Grid */}
          <section className="grid md:grid-cols-3 gap-8">
            {(["reddit", "twitter", "hackernews"] as const).map((platform) => (
              <div
                key={platform}
                className="bg-white p-5 rounded-lg shadow-md flex flex-col"
              >
                <h3
                  className="text-lg font-semibold mb-4 flex items-center gap-2"
                  style={{ color: PLATFORM_COLORS[platform] }}
                >
                  {platform.charAt(0).toUpperCase() + platform.slice(1)}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke={PLATFORM_COLORS[platform]}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8h2a2 2 0 012 2v8a2 2 0 01-2 2h-2M7 8H5a2 2 0 00-2 2v8a2 2 0 002 2h2m10-12V6a4 4 0 00-8 0v2m8 0H7"
                    />
                  </svg>
                </h3>
                <ul className="flex-grow space-y-2 overflow-auto max-h-48">
                  {result.comments[platform].map((comment, idx) => (
                    <li
                      key={idx}
                      className="text-gray-700 text-sm border-b border-gray-200 pb-2"
                    >
                      {comment}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        </main>
      )}
    </div>
  );
}
