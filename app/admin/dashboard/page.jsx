"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import axios from "axios";

export default function Page() {
  const router = useRouter();
  const [videoData, setVideoData] = useState({
    title: "",
    description: "",
    category: "",
    videopath: "",
    thumbnailPath: "",
  });

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("adminLoggedIn");
    if (!isLoggedIn) {
      router.push("/admin/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    router.push("/admin/login");
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setVideoData({ ...videoData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/storeCourseInfo", videoData);

      if (response.status === 200) {
        alert(response.data.message || "Video uploaded successfully!");
        setVideoData({
          title: "",
          description: "",
          category: "",
          videopath: "",
          thumbnailPath: "",
        });
      } else {
        throw new Error(response.data.message || "Unknown error occurred");
      }
    } catch (error) {
      console.error("Error uploading video:", error);
      alert("Failed to upload video. Please try again.");
    }
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
        </TabsList>
        <TabsContent value="upload-video">
          <Card>
            <CardHeader>
              <CardTitle>Upload New Course Video</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Video Title</Label>
                  <Input
                    id="title"
                    type="text"
                    placeholder="Enter video title"
                    value={videoData.title}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Video Description</Label>
                  <textarea
                    id="description"
                    className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                    rows={4}
                    placeholder="Enter video description"
                    value={videoData.description}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Video Category</Label>
                  <Input
                    id="category"
                    type="text"
                    placeholder="Enter video category"
                    value={videoData.category}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="videopath">Video Path</Label>
                  <Input
                    id="videopath"
                    type="text"
                    placeholder="Enter video path"
                    value={videoData.videopath}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="thumbnailPath">
                    Thumbnail Path (Optional)
                  </Label>
                  <Input
                    id="thumbnailPath"
                    type="text"
                    placeholder="Enter thumbnail path"
                    value={videoData.thumbnailPath}
                    onChange={handleInputChange}
                  />
                </div>
                <Button type="submit">Upload Video</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
