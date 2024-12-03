"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";

export default function AdminDashboard() {
  const router = useRouter();

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
                  <Label htmlFor="videoPath">Video Path</Label>
                  <Input
                    id="videoPath"
                    type="text"
                    placeholder="Enter video path"
                    value={videoData.videoPath}
                    onChange={handleInputChange}
                  />
                </div>
                {/* <div className="space-y-2">
                  <Label htmlFor="thumbnailPath">Choose Thumbnail</Label>
                  <Input
                    id="thumbnailPath"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div> */}
                <Button type="submit">Upload Video</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
