"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [courses, setCourses] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("adminLoggedIn");
    if (!isLoggedIn) {
      router.push("/admin/login");
    }
    // In a real application, you'd fetch the courses from an API here
    setCourses([
      { id: 1, title: "Introduction to React" },
      { id: 2, title: "Advanced JavaScript" },
      { id: 3, title: "Node.js Fundamentals" },
    ]);
  }, [router]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you'd implement the search functionality here
    console.log("Searching for:", searchTerm);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    router.push("/admin/login");
  };

  return (
    <div className="container mx-auto">
      <header className="flex justify-between items-center py-4 border-b px-8 bg-gray-500 text-white">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <Button onClick={handleLogout}>Logout</Button>
      </header>
      <Tabs defaultValue="upload-video" className="space-y-4 px-8 my-5">
        <TabsList className="flex w-[400px] mx-auto">
          <TabsTrigger value="upload-video">Upload Video</TabsTrigger>
          <TabsTrigger value="upload-playlist">Upload Playlist</TabsTrigger>
          <TabsTrigger value="search-courses">Search Courses</TabsTrigger>
        </TabsList>
        <TabsContent value="upload-video">
          <Card>
            <CardHeader>
              <CardTitle>Upload New Course Video</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="video-title">Video Title</Label>
                  <Input
                    id="video-title"
                    type="text"
                    placeholder="Enter video title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="playlist-description">
                    Playlist Description
                  </Label>
                  <textarea
                    id="playlist-description"
                    className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                    rows={4}
                    placeholder="Enter playlist description"
                  ></textarea>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="video-title">Video Cartegory</Label>
                  <Input
                    id="video-title"
                    type="text"
                    placeholder="Enter video title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="video-file">Video Path</Label>
                  <Input
                    id="thumbnail-path"
                    type="text"
                    placeholder="Enter thumbnail image path"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="thumbnail-path">Chose Thumbnail</Label>
                  <Input id="video-file" type="file" accept="image/*" />
                </div>
                <Button type="submit">Upload Video</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="upload-playlist">
          <Card>
            <CardHeader>
              <CardTitle>Upload New Playlist</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="playlist-title">Playlist Title</Label>
                  <Input
                    id="playlist-title"
                    type="text"
                    placeholder="Enter playlist title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="playlist-image">Playlist Image</Label>
                  <Input id="playlist-image" type="file" accept="image/*" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="playlist-description">
                    Playlist Description
                  </Label>
                  <textarea
                    id="playlist-description"
                    className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                    rows={4}
                    placeholder="Enter playlist description"
                  ></textarea>
                </div>
                <Button type="submit">Create Playlist</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="search-courses">
          <Card>
            <CardHeader>
              <CardTitle>Search Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSearch} className="space-y-4">
                <Input
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button type="submit">Search</Button>
              </form>
              <ul className="mt-4 space-y-2">
                {courses.map((course: any) => (
                  <li key={course.id}>{course.title}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
