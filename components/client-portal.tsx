"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  BookOpen,
  Gift,
  TrendingUp,
  Target,
  CheckCircle,
  Clock,
  Star,
  Wallet,
  Share2,
  Play,
  Award,
  Zap,
  DollarSign,
  Calendar,
  Trophy,
} from "lucide-react"

export function ClientPortal() {
  const [userStats] = useState({
    totalEarned: 2847.5,
    pendingEarnings: 156.2,
    completedTasks: 23,
    currentLevel: "Silver HEXican",
    nextLevelProgress: 67,
    referrals: 8,
    streakDays: 12,
  })

  const [availableTasks] = useState([
    {
      id: 1,
      title: "Complete HEX Basics Course",
      description: "Learn the fundamentals of HEX cryptocurrency and staking",
      reward: 50,
      timeEstimate: "30 minutes",
      difficulty: "Beginner",
      category: "Education",
      completed: false,
      icon: BookOpen,
    },
    {
      id: 2,
      title: "Watch PulseChain Introduction Video",
      description: "Understand the benefits of PulseChain over Ethereum",
      reward: 25,
      timeEstimate: "15 minutes",
      difficulty: "Beginner",
      category: "Education",
      completed: false,
      icon: Play,
    },
    {
      id: 3,
      title: "Refer a Friend to HEX Education",
      description: "Share HEX knowledge with someone new",
      reward: 100,
      timeEstimate: "Variable",
      difficulty: "Easy",
      category: "Referral",
      completed: false,
      icon: Share2,
    },
    {
      id: 4,
      title: "Complete Weekly Quiz",
      description: "Test your knowledge with this week's HEX quiz",
      reward: 30,
      timeEstimate: "10 minutes",
      difficulty: "Intermediate",
      category: "Quiz",
      completed: false,
      icon: Target,
    },
    {
      id: 5,
      title: "Daily Check-in Streak",
      description: "Maintain your daily learning streak",
      reward: 5,
      timeEstimate: "1 minute",
      difficulty: "Easy",
      category: "Daily",
      completed: true,
      icon: Calendar,
    },
  ])

  const [completedTasks] = useState([
    {
      id: 101,
      title: "HEX Whitepaper Summary",
      reward: 75,
      completedDate: "2024-01-15",
      category: "Education",
    },
    {
      id: 102,
      title: "Staking Mechanics Quiz",
      reward: 40,
      completedDate: "2024-01-14",
      category: "Quiz",
    },
    {
      id: 103,
      title: "Community Participation",
      reward: 20,
      completedDate: "2024-01-13",
      category: "Community",
    },
  ])

  const [achievements] = useState([
    {
      id: 1,
      title: "First Steps",
      description: "Completed your first educational task",
      icon: "🎯",
      unlocked: true,
      unlockedDate: "2024-01-10",
    },
    {
      id: 2,
      title: "Knowledge Seeker",
      description: "Completed 10 educational modules",
      icon: "📚",
      unlocked: true,
      unlockedDate: "2024-01-12",
    },
    {
      id: 3,
      title: "Quiz Master",
      description: "Scored 100% on 5 quizzes",
      icon: "🧠",
      unlocked: true,
      unlockedDate: "2024-01-14",
    },
    {
      id: 4,
      title: "Community Builder",
      description: "Referred 5 friends to HEX education",
      icon: "🤝",
      unlocked: false,
      progress: 3,
      target: 5,
    },
    {
      id: 5,
      title: "Streak Champion",
      description: "Maintained 30-day learning streak",
      icon: "🔥",
      unlocked: false,
      progress: 12,
      target: 30,
    },
  ])

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-500"
      case "Intermediate":
        return "bg-yellow-500"
      case "Advanced":
        return "bg-red-500"
      default:
        return "bg-blue-500"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Education":
        return "bg-blue-500"
      case "Quiz":
        return "bg-purple-500"
      case "Referral":
        return "bg-green-500"
      case "Daily":
        return "bg-orange-500"
      case "Community":
        return "bg-pink-500"
      default:
        return "bg-slate-500"
    }
  }

  return (
    <div className="space-y-6">
      {/* User Dashboard Header */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-2 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="w-6 h-6" />
              Your HEX Earnings
            </CardTitle>
            <CardDescription className="text-white/80">
              Educational rewards earned through learning activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-lg">Total Earned:</span>
                <span className="text-3xl font-bold">{userStats.totalEarned.toLocaleString()} HEX</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Pending Earnings:</span>
                <span className="text-lg font-semibold">{userStats.pendingEarnings} HEX</span>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <div className="flex justify-between text-sm mb-2">
                  <span>Next Payout:</span>
                  <span>7 days</span>
                </div>
                <Progress value={70} className="h-2" />
                <p className="text-xs mt-1 text-white/80">Minimum 100 HEX required for payout</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              Level Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-3">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-yellow-600">{userStats.currentLevel}</h3>
                <p className="text-sm text-slate-600">Level 3</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress to Gold:</span>
                  <span>{userStats.nextLevelProgress}%</span>
                </div>
                <Progress value={userStats.nextLevelProgress} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Quick Stats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Tasks Completed:</span>
                <span className="font-bold">{userStats.completedTasks}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Referrals:</span>
                <span className="font-bold">{userStats.referrals}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Learning Streak:</span>
                <span className="font-bold flex items-center gap-1">
                  {userStats.streakDays} <span className="text-orange-500">🔥</span>
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="earn" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="earn">Earn HEX</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="referrals">Referrals</TabsTrigger>
          <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
        </TabsList>

        <TabsContent value="earn" className="space-y-6">
          {/* Featured Opportunities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                Featured Earning Opportunities
              </CardTitle>
              <CardDescription>High-value tasks and limited-time bonuses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Gift className="w-5 h-5 text-yellow-600" />
                      <span className="font-medium">Weekend Bonus</span>
                    </div>
                    <Badge className="bg-yellow-500">2x Rewards</Badge>
                  </div>
                  <p className="text-sm text-slate-600 mb-3">
                    Complete any 3 educational tasks this weekend for double HEX rewards!
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-yellow-700">Ends in 2 days</span>
                    <Button size="sm" className="bg-yellow-500 hover:bg-yellow-600">
                      Start Now
                    </Button>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-purple-600" />
                      <span className="font-medium">Referral Bonus</span>
                    </div>
                    <Badge className="bg-purple-500">+50 HEX</Badge>
                  </div>
                  <p className="text-sm text-slate-600 mb-3">
                    Invite friends to join HEX education and earn bonus rewards for each successful referral.
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-purple-700">Unlimited</span>
                    <Button size="sm" className="bg-purple-500 hover:bg-purple-600">
                      Invite Friends
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Available Tasks */}
          <Card>
            <CardHeader>
              <CardTitle>Available Tasks</CardTitle>
              <CardDescription>Complete educational activities to earn HEX rewards</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {availableTasks.map((task) => (
                  <div
                    key={task.id}
                    className={`p-4 border rounded-lg ${
                      task.completed ? "bg-green-50 border-green-200" : "bg-white border-slate-200"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            task.completed ? "bg-green-500" : "bg-blue-500"
                          }`}
                        >
                          {task.completed ? (
                            <CheckCircle className="w-5 h-5 text-white" />
                          ) : (
                            <task.icon className="w-5 h-5 text-white" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium">{task.title}</h4>
                            <Badge className={getCategoryColor(task.category)} size="sm">
                              {task.category}
                            </Badge>
                            <Badge className={getDifficultyColor(task.difficulty)} size="sm">
                              {task.difficulty}
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-600 mb-2">{task.description}</p>
                          <div className="flex items-center gap-4 text-xs text-slate-500">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {task.timeEstimate}
                            </span>
                            <span className="flex items-center gap-1">
                              <DollarSign className="w-3 h-3" />
                              {task.reward} HEX
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="ml-4">
                        {task.completed ? (
                          <Badge className="bg-green-500">Completed</Badge>
                        ) : (
                          <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-500">
                            Start Task
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Earning History</CardTitle>
              <CardDescription>Your completed tasks and earned rewards</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {completedTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium">{task.title}</h4>
                        <p className="text-sm text-slate-600">Completed on {task.completedDate}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">+{task.reward} HEX</div>
                      <Badge className={getCategoryColor(task.category)} size="sm">
                        {task.category}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
              <CardDescription>Unlock badges and earn bonus rewards for milestones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`p-4 border rounded-lg ${
                      achievement.unlocked ? "bg-yellow-50 border-yellow-200" : "bg-slate-50 border-slate-200"
                    }`}
                  >
                    <div className="text-center space-y-3">
                      <div className="text-4xl">{achievement.icon}</div>
                      <div>
                        <h4 className={`font-medium ${achievement.unlocked ? "text-yellow-700" : "text-slate-500"}`}>
                          {achievement.title}
                        </h4>
                        <p className="text-sm text-slate-600">{achievement.description}</p>
                      </div>
                      {achievement.unlocked ? (
                        <div>
                          <Badge className="bg-yellow-500">Unlocked</Badge>
                          <p className="text-xs text-slate-500 mt-1">Earned on {achievement.unlockedDate}</p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress:</span>
                            <span>
                              {achievement.progress}/{achievement.target}
                            </span>
                          </div>
                          <Progress value={(achievement.progress! / achievement.target!) * 100} className="h-2" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="referrals" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Share2 className="w-5 h-5" />
                Referral Program
              </CardTitle>
              <CardDescription>Earn HEX by sharing educational content with friends</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">8</div>
                  <div className="text-sm text-slate-600">Total Referrals</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">800</div>
                  <div className="text-sm text-slate-600">HEX Earned</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">5</div>
                  <div className="text-sm text-slate-600">Active Learners</div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-800 mb-2">Your Referral Link:</h4>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value="https://hexeducation.com/ref/your-unique-code"
                    readOnly
                    className="flex-1 p-2 border rounded text-sm bg-white"
                  />
                  <Button size="sm">Copy Link</Button>
                </div>
                <p className="text-sm text-blue-700 mt-2">
                  Earn 100 HEX for each friend who completes their first educational module!
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Recent Referrals:</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div>
                      <p className="font-medium">Sarah Johnson</p>
                      <p className="text-sm text-slate-600">Completed HEX Basics • 2 days ago</p>
                    </div>
                    <Badge className="bg-green-500">+100 HEX</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div>
                      <p className="font-medium">Mike C.</p>
                      <p className="text-sm text-slate-600">Completed PulseChain Intro • 5 days ago</p>
                    </div>
                    <Badge className="bg-green-500">+100 HEX</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="withdraw" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="w-5 h-5" />
                Withdraw Earnings
              </CardTitle>
              <CardDescription>Transfer your earned HEX to your PulseChain wallet</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h4 className="font-medium text-blue-800 mb-2">Available for Withdrawal:</h4>
                    <div className="text-2xl font-bold text-blue-600">{userStats.totalEarned.toLocaleString()} HEX</div>
                    <p className="text-sm text-blue-700 mt-1">≈ ${(userStats.totalEarned * 0.1).toFixed(2)} USD</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">PulseChain Wallet Address:</label>
                    <input
                      type="text"
                      placeholder="0x742d35Cc6634C0532925a3b8D4C9db96590c6C87"
                      className="w-full p-3 border rounded-lg font-mono text-sm"
                    />
                    <p className="text-xs text-slate-500">Enter your PulseChain wallet address to receive HEX</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Withdrawal Amount:</label>
                    <input
                      type="number"
                      placeholder="100"
                      min="100"
                      max={userStats.totalEarned}
                      className="w-full p-3 border rounded-lg text-right"
                    />
                    <p className="text-xs text-slate-500">Minimum withdrawal: 100 HEX</p>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
                    <Zap className="w-4 h-4 mr-2" />
                    Withdraw HEX
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <h4 className="font-medium text-yellow-800 mb-2">Withdrawal Information:</h4>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• Minimum withdrawal: 100 HEX</li>
                      <li>• Processing time: 24-48 hours</li>
                      <li>• Network fees: ~$0.001 (PulseChain)</li>
                      <li>• Withdrawals processed daily at 12:00 UTC</li>
                    </ul>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <h4 className="font-medium text-green-800 mb-2">Recent Withdrawals:</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>500 HEX</span>
                        <span className="text-green-600">Completed</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Jan 10, 2024</span>
                        <span className="text-slate-500">0x742d...6C87</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <h4 className="font-medium text-red-800 mb-2">⚠️ Important Notice:</h4>
                    <p className="text-sm text-red-700">
                      Earned HEX tokens may have tax implications. Consult with a tax professional regarding your
                      obligations. You are responsible for all applicable taxes.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
