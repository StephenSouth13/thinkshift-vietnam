"use client";

import { useState } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  Star,
  MapPin,
  Calendar,
  Clock,
  MessageCircle,
  Video,
  DollarSign,
  Award,
  BookOpen,
  Code,
  Briefcase,
  GraduationCap,
  Search,
  Filter,
  Heart,
  Share2,
  Phone,
  Mail,
  Globe,
  Github,
  Linkedin,
  CheckCircle,
  TrendingUp,
  Target,
  Lightbulb,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

// Mock data for mentors
const mentors = [
  {
    id: 1,
    name: "Nguyễn Minh Tuấn",
    title: "Senior Full-stack Developer",
    company: "Google Vietnam",
    avatar: "/avatars/mentor1.jpg",
    location: "Ho Chi Minh City",
    experience: "8+ years",
    rating: 4.9,
    reviews: 127,
    students: 450,
    responseTime: "Trong vòng 2 giờ",
    languages: ["Tiếng Việt", "English"],
    specialties: ["React.js", "Node.js", "System Design", "Career Guidance"],
    price: "500,000 VNĐ/session",
    bio: "Passionate full-stack developer với 8+ năm kinh nghiệm tại các công ty công nghệ hàng đầu. Chuyên hướng dẫn junior developers và career transition.",
    achievements: ["Google Certified", "AWS Solutions Architect", "Tech Lead"],
    isOnline: true,
    isVerified: true,
    sessionTypes: ["1-on-1 Call", "Code Review", "Career Consultation"],
    availableSlots: ["9:00 AM", "2:00 PM", "7:00 PM"],
  },
  {
    id: 2,
    name: "Dr. Sarah Chen",
    title: "AI Research Scientist",
    company: "VinAI Research",
    avatar: "/avatars/mentor2.jpg",
    location: "Hanoi",
    experience: "12+ years",
    rating: 4.8,
    reviews: 89,
    students: 320,
    responseTime: "Trong vòng 4 giờ",
    languages: ["English", "Mandarin"],
    specialties: [
      "Machine Learning",
      "Deep Learning",
      "AI Research",
      "PhD Guidance",
    ],
    price: "800,000 VNĐ/session",
    bio: "AI Research Scientist với PhD from Stanford. Specializing in computer vision and natural language processing. Published 50+ papers.",
    achievements: ["PhD Stanford", "50+ Publications", "AI Conference Speaker"],
    isOnline: false,
    isVerified: true,
    sessionTypes: ["Research Guidance", "PhD Consultation", "Technical Review"],
    availableSlots: ["10:00 AM", "3:00 PM"],
  },
  {
    id: 3,
    name: "Trần Văn Hòa",
    title: "Product Manager",
    company: "Shopee Vietnam",
    avatar: "/avatars/mentor3.jpg",
    location: "Ho Chi Minh City",
    experience: "6+ years",
    rating: 4.7,
    reviews: 156,
    students: 280,
    responseTime: "Trong vòng 1 giờ",
    languages: ["Tiếng Việt", "English"],
    specialties: [
      "Product Management",
      "Strategy",
      "User Research",
      "Leadership",
    ],
    price: "400,000 VNĐ/session",
    bio: "Experienced Product Manager leading consumer products at Shopee. Expert in product strategy, user research, and team leadership.",
    achievements: [
      "MBA Graduate",
      "Product Excellence Award",
      "Agile Certified",
    ],
    isOnline: true,
    isVerified: true,
    sessionTypes: [
      "Product Strategy",
      "Career Transition",
      "Leadership Coaching",
    ],
    availableSlots: ["11:00 AM", "4:00 PM", "8:00 PM"],
  },
  {
    id: 4,
    name: "Lê Thị Mai",
    title: "UX Design Lead",
    company: "Grab Vietnam",
    avatar: "/avatars/mentor4.jpg",
    location: "Ho Chi Minh City",
    experience: "7+ years",
    rating: 4.9,
    reviews: 203,
    students: 380,
    responseTime: "Trong vòng 30 phút",
    languages: ["Tiếng Việt", "English"],
    specialties: [
      "UX Design",
      "Design Systems",
      "User Research",
      "Portfolio Review",
    ],
    price: "350,000 VNĐ/session",
    bio: "Lead UX Designer at Grab with expertise in mobile app design and design systems. Passionate about mentoring new designers.",
    achievements: [
      "Design Excellence Award",
      "Google UX Certificate",
      "Speaker at DesignOps",
    ],
    isOnline: true,
    isVerified: true,
    sessionTypes: ["Portfolio Review", "Design Feedback", "Career Guidance"],
    availableSlots: ["9:00 AM", "1:00 PM", "6:00 PM"],
  },
];

// Mock data for user profile
const userProfile = {
  name: "Nguyễn Văn An",
  title: "Aspiring Full-stack Developer",
  avatar: "/avatars/current-user.jpg",
  location: "Ho Chi Minh City",
  bio: "Computer Science student passionate about web development. Looking to transition into tech industry.",
  skills: ["JavaScript", "React", "Node.js", "Python"],
  goals: [
    "Land first developer job",
    "Build strong portfolio",
    "Learn system design",
  ],
  experience: "1 year",
  education: "Computer Science - HCMUS",
  mentoringSessions: 8,
  totalPoints: 1280,
  achievements: ["Fast Learner", "Consistent Student", "Active Participant"],
  socialLinks: {
    github: "github.com/vanan",
    linkedin: "linkedin.com/in/vanan",
    portfolio: "vanan.dev",
  },
};

export default function MentoringPage() {
  const [selectedMentor, setSelectedMentor] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [priceRange, setPriceRange] = useState("All");

  const specialties = [
    "All",
    "Full-stack Development",
    "AI/ML",
    "Product Management",
    "UX Design",
    "Career Guidance",
  ];
  const locations = ["All", "Ho Chi Minh City", "Hanoi", "Da Nang", "Remote"];
  const priceRanges = ["All", "Under 500k", "500k-800k", "800k+"];

  // Filter mentors
  const filteredMentors = mentors.filter((mentor) => {
    const matchesSearch =
      mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.specialties.some((spec) =>
        spec.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    const matchesSpecialty =
      selectedSpecialty === "All" ||
      mentor.specialties.some((spec) =>
        spec.includes(
          selectedSpecialty.replace("Full-stack Development", "React.js"),
        ),
      );
    const matchesLocation =
      selectedLocation === "All" || mentor.location === selectedLocation;

    let matchesPrice = true;
    if (priceRange !== "All") {
      const price = parseInt(mentor.price.replace(/[^0-9]/g, ""));
      if (priceRange === "Under 500k") matchesPrice = price < 500000;
      else if (priceRange === "500k-800k")
        matchesPrice = price >= 500000 && price <= 800000;
      else if (priceRange === "800k+") matchesPrice = price > 800000;
    }

    return matchesSearch && matchesSpecialty && matchesLocation && matchesPrice;
  });

  if (selectedMentor) {
    const mentor = mentors.find((m) => m.id === selectedMentor);
    if (!mentor) return null;

    return (
      <div className="min-h-screen bg-background pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => setSelectedMentor(null)}
            className="mb-6 text-blue-accent hover:text-blue-accent/80"
          >
            ← Quay lại danh sách mentor
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Mentor Profile */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="relative">
                      <Avatar className="w-24 h-24">
                        <AvatarImage src={mentor.avatar} />
                        <AvatarFallback>{mentor.name[0]}</AvatarFallback>
                      </Avatar>
                      {mentor.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-2 border-background rounded-full"></div>
                      )}
                      {mentor.isVerified && (
                        <CheckCircle className="absolute -top-1 -right-1 w-6 h-6 text-blue-accent" />
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h1 className="text-3xl font-bold text-foreground">
                            {mentor.name}
                          </h1>
                          <p className="text-lg text-blue-accent font-medium">
                            {mentor.title}
                          </p>
                          <p className="text-muted-foreground">
                            @ {mentor.company}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 mb-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-bold">{mentor.rating}</span>
                            <span className="text-muted-foreground">
                              ({mentor.reviews} reviews)
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {mentor.students} students mentored
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {mentor.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Briefcase className="h-4 w-4" />
                          {mentor.experience}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          Phản hồi {mentor.responseTime}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {mentor.languages.map((lang, i) => (
                          <Badge key={i} variant="outline">
                            {lang}
                          </Badge>
                        ))}
                      </div>

                      <p className="text-foreground leading-relaxed">
                        {mentor.bio}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Specialties & Achievements */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-blue-accent" />
                      Chuyên môn
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {mentor.specialties.map((specialty, i) => (
                        <Badge key={i} variant="secondary">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-blue-accent" />
                      Thành tựu
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {mentor.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Session Types */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-blue-accent" />
                    Loại hình mentoring
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {mentor.sessionTypes.map((type, i) => (
                      <div
                        key={i}
                        className="p-4 border border-border rounded-lg hover:border-blue-accent/50 transition-colors"
                      >
                        <h4 className="font-medium text-foreground mb-2">
                          {type}
                        </h4>
                        <p className="text-sm text-muted-foreground">60 phút</p>
                        <p className="text-lg font-bold text-blue-accent mt-2">
                          {mentor.price}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Booking Sidebar */}
            <div className="space-y-6">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="text-xl">Đặt lịch mentoring</CardTitle>
                  <CardDescription>
                    Chọn thời gian phù hợp để bắt đầu hành trình học tập
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Chọn loại session
                    </label>
                    <select className="w-full p-2 border border-border rounded-md bg-background text-foreground">
                      {mentor.sessionTypes.map((type, i) => (
                        <option key={i} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Thời gian có sẵn
                    </label>
                    <div className="grid grid-cols-1 gap-2">
                      {mentor.availableSlots.map((slot, i) => (
                        <Button
                          key={i}
                          variant="outline"
                          size="sm"
                          className="justify-start"
                        >
                          <Calendar className="h-4 w-4 mr-2" />
                          Hôm nay, {slot}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm text-muted-foreground">
                        Giá session:
                      </span>
                      <span className="text-lg font-bold text-foreground">
                        {mentor.price}
                      </span>
                    </div>
                    <Button className="w-full" size="lg">
                      <Video className="h-4 w-4 mr-2" />
                      Đặt lịch ngay
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <Button variant="outline" size="sm">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Nhắn tin
                    </Button>
                    <Button variant="outline" size="sm">
                      <Heart className="h-4 w-4 mr-2" />
                      Yêu thích
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* User Profile Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Profile của bạn</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={userProfile.avatar} />
                      <AvatarFallback>{userProfile.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-foreground">
                        {userProfile.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {userProfile.title}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Sessions completed:
                      </span>
                      <span className="font-medium">
                        {userProfile.mentoringSessions}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Total points:
                      </span>
                      <span className="font-medium">
                        {userProfile.totalPoints}
                      </span>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    asChild
                  >
                    <Link href="/profile">Xem profile đầy đủ</Link>
                  </Button>
                </CardContent>
              </Card>
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
            Kết nối với Mentor 🎯
          </h1>
          <p className="text-muted-foreground text-lg">
            Tìm mentor phù hợp để hướng dẫn và phát triển sự nghiệp của bạn
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
                      placeholder="Tìm mentor theo tên, chuyên môn..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <select
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
                >
                  {specialties.map((specialty) => (
                    <option key={specialty} value={specialty}>
                      {specialty}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
                >
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
                >
                  {priceRanges.map((range) => (
                    <option key={range} value={range}>
                      {range}
                    </option>
                  ))}
                </select>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Mentor List */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6"
            >
              <h2 className="text-2xl font-bold text-foreground">
                {filteredMentors.length} mentors phù hợp
              </h2>
            </motion.div>

            <div className="space-y-6">
              {filteredMentors.map((mentor, index) => (
                <motion.div
                  key={mentor.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="relative">
                          <Avatar className="w-20 h-20">
                            <AvatarImage src={mentor.avatar} />
                            <AvatarFallback>{mentor.name[0]}</AvatarFallback>
                          </Avatar>
                          {mentor.isOnline && (
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-background rounded-full"></div>
                          )}
                          {mentor.isVerified && (
                            <CheckCircle className="absolute -top-1 -right-1 w-5 h-5 text-blue-accent" />
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="text-xl font-bold text-foreground group-hover:text-blue-accent transition-colors">
                                {mentor.name}
                              </h3>
                              <p className="text-blue-accent font-medium">
                                {mentor.title}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                @ {mentor.company}
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center gap-1 mb-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span className="font-bold">
                                  {mentor.rating}
                                </span>
                                <span className="text-sm text-muted-foreground">
                                  ({mentor.reviews})
                                </span>
                              </div>
                              <p className="text-lg font-bold text-foreground">
                                {mentor.price}
                              </p>
                            </div>
                          </div>

                          <p className="text-muted-foreground mb-4 line-clamp-2">
                            {mentor.bio}
                          </p>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {mentor.specialties
                              .slice(0, 4)
                              .map((specialty, i) => (
                                <Badge key={i} variant="secondary">
                                  {specialty}
                                </Badge>
                              ))}
                            {mentor.specialties.length > 4 && (
                              <Badge variant="outline">
                                +{mentor.specialties.length - 4} more
                              </Badge>
                            )}
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {mentor.location}
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                {mentor.students} students
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {mentor.responseTime}
                              </div>
                            </div>

                            <Button
                              onClick={() => setSelectedMentor(mentor.id)}
                            >
                              Xem profile
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* User Profile Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Profile của bạn</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={userProfile.avatar} />
                      <AvatarFallback>{userProfile.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-foreground">
                        {userProfile.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {userProfile.title}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-foreground">
                      Current Skills:
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {userProfile.skills.map((skill, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-foreground">
                      Goals:
                    </h4>
                    <ul className="space-y-1">
                      {userProfile.goals.slice(0, 2).map((goal, i) => (
                        <li
                          key={i}
                          className="text-xs text-muted-foreground flex items-center gap-1"
                        >
                          <Target className="h-3 w-3" />
                          {goal}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    asChild
                  >
                    <Link href="/profile">Complete Your Profile</Link>
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
                  <CardTitle className="text-lg">Your Progress</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-3 rounded bg-blue-accent/10">
                      <div className="text-xl font-bold text-blue-accent">
                        {userProfile.mentoringSessions}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Sessions
                      </div>
                    </div>
                    <div className="text-center p-3 rounded bg-green-500/10">
                      <div className="text-xl font-bold text-green-600">
                        {userProfile.totalPoints}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Points
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-foreground">
                      Achievements:
                    </h4>
                    {userProfile.achievements.map((achievement, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs">
                        <Award className="h-3 w-3 text-yellow-500" />
                        <span className="text-muted-foreground">
                          {achievement}
                        </span>
                      </div>
                    ))}
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
                    <Lightbulb className="h-4 w-4 mr-2" />
                    Get AI Recommendations
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    asChild
                  >
                    <Link href="/co-learning">
                      <Users className="h-4 w-4 mr-2" />
                      Join Study Groups
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    asChild
                  >
                    <Link href="/assessment">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Take Assessment
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
