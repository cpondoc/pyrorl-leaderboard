import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const mockLeaderboardData = [
  { rank: 1, name: "Alice", score: 1000, environment: "CartPole-v1" },
  { rank: 2, name: "Bob", score: 950, environment: "MountainCar-v0" },
  { rank: 3, name: "Charlie", score: 900, environment: "Acrobot-v1" },
  { rank: 4, name: "David", score: 850, environment: "LunarLander-v2" },
  { rank: 5, name: "Eve", score: 800, environment: "Pendulum-v1" },
]

export function Leaderboard() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Leaderboard</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Rank</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Score</TableHead>
            <TableHead className="text-right">Environment</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockLeaderboardData.map((entry) => (
            <TableRow key={entry.rank}>
              <TableCell className="font-medium">{entry.rank}</TableCell>
              <TableCell>{entry.name}</TableCell>
              <TableCell>{entry.score}</TableCell>
              <TableCell className="text-right">{entry.environment}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

