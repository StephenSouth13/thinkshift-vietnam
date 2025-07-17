"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  Video,
  Mic,
  MicOff,
  VideoOff,
  Screen,
  MessageCircle,
  Send,
  Crown,
  Star,
  Clock,
  BookOpen,
  Code,
  Coffee,
  Trophy,
  Plus,
  Search,
  Filter,
  Play,
  Pause,
  Volume2,
  VolumeOff,
  Settings,
  Heart,
  Share2,
  UserPlus,
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// Mock data for learning rooms
const learningRooms = [
  {
    id: 1,
    title: "Frontend Fundamentals Study Group",
    description: "Học React.js và TypeScript cùng nhau",
    topic: "Frontend Development",
    level: "Beginner",
    participants: 12,
    maxParticipants: 20,
    host: {
      name: "Minh Tuấn",
      avatar: "/avatars/user1.jpg",
      badge: "Mentor",
    },
    isLive: true,
    duration: "2 giờ",
    startTime: "14:00",
    tags: ["React", "TypeScript", "CSS"],
    language: "Tiếng Việt",
  },
  {
    id: 2,
    title: "AI & Machine Learning Discussion",
    description: "Thảo luận về trending AI technologies",
    topic: "Artificial Intelligence",
    level: "Intermediate",
    participants: 8,
    maxParticipants: 15,
    host: {
      name: "Dr. Sarah Chen",
      avatar: "/avatars/user2.jpg",
      badge: "Expert",
    },
    isLive: true,
    duration: "1.5 giờ",
    startTime: "15:30",
    tags: ["AI", "Machine Learning", "Python"],
    language: "English",
  },
  {
    id: 3,
    title: "Career Transition to Tech",
    description: "Chia sẻ kinh nghiệm chuyển nghề sang IT",
    topic: "Career Development",
    level: "All levels",
    participants: 25,
    maxParticipants: 30,
    host: {
      name: "Văn Hòa",
      avatar: "/avatars/user3.jpg",
      badge: "Senior Developer",
    },
    isLive: false,
    duration: "1 giờ",
    startTime: "19:00",
    tags: ["Career", "Soft Skills", "Networking"],
    language: "Tiếng Việt",
  },
  {
    id: 4,
    title: "Silent Study Session - Pomodoro",
    description: "Học tập tập trung với kỹ thuật Pomodoro",
    topic: "Study Techniques",
    level: "All levels",
    participants: 18,
    maxParticipants: 50,
    host: {
      name: "Study Bot",
      avatar: "/avatars/bot.jpg",
      badge: "AI Assistant",
    },
    isLive: true,
    duration: "3 giờ",
    startTime: "13:00",
    tags: ["Focus", "Productivity", "Study"],
    language: "Mixed",
  },
];

// Mock data for leaderboard
const leaderboard = [
  {
    rank: 1,
    name: "Nguyễn Minh",
    points: 2450,
    hours: 156,
    badge: "🏆 Study Champion",
  },
  {
    rank: 2,
    name: "Trần Linh",
    points: 2380,
    hours: 142,
    badge: "🥈 Knowledge Seeker",
  },
  {
    rank: 3,
    name: "Lê Hùng",
    points: 2210,
    hours: 138,
    badge: "🥉 Learning Master",
  },
  {
    rank: 4,
    name: "Phạm An",
    points: 1980,
    hours: 124,
    badge: "⭐ Rising Star",
  },
  {
    rank: 5,
    name: "Võ Mai",
    points: 1850,
    hours: 118,
    badge: "💎 Consistent Learner",
  },
];

// Mock data for chat messages
const initialMessages = [
  {
    id: 1,
    user: { name: "Minh Tuấn", avatar: "/avatars/user1.jpg", role: "host" },
    message:
      "Chào mừng mọi người đến với session React.js! Hôm nay chúng ta sẽ tìm hiểu về Hooks 🚀",
    timestamp: "14:05",
    type: "text",
  },
  {
    id: 2,
    user: {
      name: "Anna Lê",
      avatar: "/avatars/user4.jpg",
      role: "participant",
    },
    message: "Chào thầy! Em có thể hỏi về useEffect không ạ?",
    timestamp: "14:06",
    type: "text",
  },
  {
    id: 3,
    user: {
      name: "Đức Anh",
      avatar: "/avatars/user5.jpg",
      role: "participant",
    },
    message: "```javascript\nconst [count, setCount] = useState(0)\n```",
    timestamp: "14:07",
    type: "code",
  },
];

export default function CoLearningPage() {
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [isAudioOn, setIsAudioOn] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  const topics = [
    "All",
    "Frontend Development",
    "Backend Development",
    "AI & ML",
    "Career Development",
    "Study Techniques",
  ];
  const levels = ["All", "Beginner", "Intermediate", "Advanced", "All levels"];

  // Filter rooms based on search and filters
  const filteredRooms = learningRooms.filter((room) => {
    const matchesSearch =
      room.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTopic =
      selectedTopic === "All" || room.topic === selectedTopic;
    const matchesLevel =
      selectedLevel === "All" || room.level === selectedLevel;
    return matchesSearch && matchesTopic && matchesLevel;
  });

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        user: {
          name: "Bạn",
          avatar: "/avatars/current-user.jpg",
          role: "participant",
        },
        message: newMessage,
        timestamp: new Date().toLocaleTimeString("vi-VN", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        type: "text" as const,
      };
      setMessages([...messages, message]);
      setNewMessage("");
    }
  };

  if (selectedRoom) {
    const room = learningRooms.find((r) => r.id === selectedRoom);
    if (!room) return null;

    return (
      <div className="min-h-screen bg-background pt-24">
        {/* Room Header */}
        <div className="bg-card border-b border-border">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  onClick={() => setSelectedRoom(null)}
                  className="text-blue-accent hover:text-blue-accent/80"
                >
                  ← Quay lại
                </Button>
                <div>
                  <h1 className="text-xl font-bold text-foreground">
                    {room.title}
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Hosted by {room.host.name} • {room.participants}{" "}
                    participants
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={room.isLive ? "default" : "secondary"}>
                  {room.isLive ? "🔴 LIVE" : "Sắp diễn ra"}
                </Badge>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Chia sẻ
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Room Interface */}
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Video/Screen Share Area */}
            <div className="lg:col-span-3 space-y-6">
              {/* Main Video */}
              <Card className="bg-black/90 border-border">
                <CardContent className="p-0 aspect-video relative">
                  {isScreenSharing ? (
                    <div className="w-full h-full bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
                      <div className="text-center text-white">
                        <Screen className="h-16 w-16 mx-auto mb-4" />
                        <p className="text-lg">Screen Share Active</p>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-navy/20 to-blue-accent/20 flex items-center justify-center">
                      <div className="text-center">
                        <Video className="h-16 w-16 mx-auto mb-4 text-blue-accent" />
                        <p className="text-lg text-foreground">
                          Camera {isVideoOn ? "On" : "Off"}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Controls */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-3">
                    <Button
                      size="sm"
                      variant={isAudioOn ? "default" : "destructive"}
                      onClick={() => setIsAudioOn(!isAudioOn)}
                    >
                      {isAudioOn ? (
                        <Mic className="h-4 w-4" />
                      ) : (
                        <MicOff className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant={isVideoOn ? "default" : "destructive"}
                      onClick={() => setIsVideoOn(!isVideoOn)}
                    >
                      {isVideoOn ? (
                        <Video className="h-4 w-4" />
                      ) : (
                        <VideoOff className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant={isScreenSharing ? "default" : "outline"}
                      onClick={() => setIsScreenSharing(!isScreenSharing)}
                    >
                      <Screen className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Participant Thumbnails */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[1, 2, 3, 4].map((participant) => (
                  <Card key={participant} className="bg-card border-border">
                    <CardContent className="p-2 aspect-video relative">
                      <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50 rounded flex items-center justify-center">
                        <Avatar className="w-12 h-12">
                          <AvatarImage
                            src={`/avatars/user${participant}.jpg`}
                          />
                          <AvatarFallback>U{participant}</AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="absolute bottom-1 left-1 bg-black/70 text-white text-xs px-1 rounded">
                        User {participant}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Chat & Participants Sidebar */}
            <div className="space-y-6">
              <Tabs defaultValue="chat" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="chat">Chat</TabsTrigger>
                  <TabsTrigger value="participants">Người tham gia</TabsTrigger>
                </TabsList>

                <TabsContent value="chat" className="space-y-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Chat Room</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Messages */}
                      <div className="h-80 overflow-y-auto space-y-3 pr-2">
                        {messages.map((msg) => (
                          <div key={msg.id} className="flex gap-2">
                            <Avatar className="w-6 h-6 mt-1">
                              <AvatarImage src={msg.user.avatar} />
                              <AvatarFallback>
                                {msg.user.name[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-medium text-foreground">
                                  {msg.user.name}
                                </span>
                                {msg.user.role === "host" && (
                                  <Crown className="h-3 w-3 text-yellow-500" />
                                )}
                                <span className="text-xs text-muted-foreground">
                                  {msg.timestamp}
                                </span>
                              </div>
                              {msg.type === "code" ? (
                                <pre className="text-xs bg-muted p-2 rounded overflow-x-auto">
                                  <code>{msg.message}</code>
                                </pre>
                              ) : (
                                <p className="text-sm text-foreground break-words">
                                  {msg.message}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Message Input */}
                      <div className="flex gap-2">
                        <Input
                          placeholder="Nhập tin nhắn..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                          className="text-sm"
                        />
                        <Button size="sm" onClick={sendMessage}>
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="participants" className="space-y-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">
                        Người tham gia ({room.participants})
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {/* Host */}
                        <div className="flex items-center gap-3 p-2 rounded bg-blue-accent/10">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={room.host.avatar} />
                            <AvatarFallback>{room.host.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-foreground">
                              {room.host.name}
                            </p>
                            <div className="flex items-center gap-1">
                              <Crown className="h-3 w-3 text-yellow-500" />
                              <span className="text-xs text-muted-foreground">
                                Host
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Other participants */}
                        {[1, 2, 3, 4, 5].map((participant) => (
                          <div
                            key={participant}
                            className="flex items-center gap-3 p-2 rounded hover:bg-muted/50"
                          >
                            <Avatar className="w-8 h-8">
                              <AvatarImage
                                src={`/avatars/user${participant}.jpg`}
                              />
                              <AvatarFallback>U{participant}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-foreground">
                                User {participant}
                              </p>
                              <span className="text-xs text-muted-foreground">
                                Participant
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Co-Learning Space 🤝
          </h1>
          <p className="text-muted-foreground text-lg">
            Học tập cùng nhau, phát triển cùng nhau. Tham gia các phòng học trực
            tuyến và kết nối với cộng đồng.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Tìm kiếm phòng học..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <select
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                  className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
                >
                  {topics.map((topic) => (
                    <option key={topic} value={topic}>
                      {topic}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
                >
                  {levels.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Tạo phòng
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Learning Rooms */}
          <div className="lg:col-span-3 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Phòng học đang hoạt động ({filteredRooms.length})
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredRooms.map((room, index) => (
                  <motion.div
                    key={room.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge
                                variant={room.isLive ? "default" : "secondary"}
                              >
                                {room.isLive ? "🔴 LIVE" : "Sắp diễn ra"}
                              </Badge>
                              <Badge variant="outline">{room.level}</Badge>
                            </div>
                            <CardTitle className="text-lg group-hover:text-blue-accent transition-colors">
                              {room.title}
                            </CardTitle>
                            <CardDescription className="mt-1">
                              {room.description}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        {/* Host Info */}
                        <div className="flex items-center gap-2">
                          <Avatar className="w-6 h-6">
                            <AvatarImage src={room.host.avatar} />
                            <AvatarFallback>{room.host.name[0]}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-muted-foreground">
                            {room.host.name}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {room.host.badge}
                          </Badge>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {room.participants}/{room.maxParticipants}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {room.duration}
                          </div>
                          {room.isLive && (
                            <div className="flex items-center gap-1 text-green-600">
                              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                              Live
                            </div>
                          )}
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1">
                          {room.tags.map((tag, i) => (
                            <Badge
                              key={i}
                              variant="secondary"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        {/* Action Button */}
                        <Button
                          className="w-full"
                          onClick={() => setSelectedRoom(room.id)}
                          variant={room.isLive ? "default" : "outline"}
                        >
                          {room.isLive ? (
                            <>
                              <Video className="h-4 w-4 mr-2" />
                              Tham gia ngay
                            </>
                          ) : (
                            <>
                              <Clock className="h-4 w-4 mr-2" />
                              Đặt lịch nhắc - {room.startTime}
                            </>
                          )}
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Leaderboard */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-yellow-500" />
                    Bảng xếp hạng
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {leaderboard.map((user, index) => (
                    <div
                      key={user.rank}
                      className="flex items-center gap-3 p-2 rounded hover:bg-muted/50"
                    >
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-accent/10 text-blue-accent text-sm font-bold">
                        {user.rank}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">
                          {user.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {user.points} điểm • {user.hours}h
                        </p>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" className="w-full mt-4">
                    Xem toàn bộ
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Thống kê cá nhân</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 rounded bg-blue-accent/10">
                      <div className="text-2xl font-bold text-blue-accent">
                        24
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Sessions
                      </div>
                    </div>
                    <div className="text-center p-3 rounded bg-green-500/10">
                      <div className="text-2xl font-bold text-green-600">
                        48h
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Study Time
                      </div>
                    </div>
                  </div>
                  <div className="text-center p-3 rounded bg-purple-500/10">
                    <div className="text-2xl font-bold text-purple-600">
                      1,280
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Total Points
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                  >
                    <Coffee className="h-4 w-4 mr-2" />
                    Virtual Coffee Chat
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                  >
                    <Code className="h-4 w-4 mr-2" />
                    Code Together
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    Study Buddy
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    asChild
                  >
                    <Link href="/mentoring">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Find Mentor
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
