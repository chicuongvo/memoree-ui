import { getNewsFeed } from "@/api/post.api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { timeSince } from "@/utils/time";
import { useQuery } from "@tanstack/react-query";
import { Camera, Heart, MessageCircle } from "lucide-react";
import { useState } from "react";

function NewsFeed() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: newsFeed, isLoading } = useQuery({
    queryKey: ["news-feed"],
    queryFn: getNewsFeed,
  });

  if (isLoading && !(newsFeed as unknown as [])?.length) return <p>Loading</p>;
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Content */}
      <div className="pb-20 px-4 pt-4">
        <div className="max-w-md mx-auto space-y-4">
          <div className="text-center py-4">
            <h2 className="text-2xl font-bold text-gray-800">Feed</h2>
          </div>
          {newsFeed?.map(post => (
            <Card
              key={post.id}
              className="rounded-2xl shadow-sm border-0 bg-white cursor-pointer hover:shadow-md transition-shadow"
            >
              <CardContent className="py-4">
                <div className="flex items-center space-x-3 px-4 mb-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={post.link || "/placeholder.svg"} />
                    <AvatarFallback>
                      {post.author.name[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">
                      {post.author.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {timeSince(post.createdAt)}
                    </p>
                  </div>
                </div>
                <img
                  src={post.image_url}
                  alt="Post"
                  className="w-full h-auto object-cover mb-3 aspect-square"
                />
                <div className="flex items-center mb-2 px-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-0 h-auto hover:bg-transparent "
                  >
                    <Heart className="size-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-0 h-auto text-xl  hover:bg-transparent"
                  >
                    <MessageCircle className="size-5" />
                  </Button>
                </div>
                {/* <p className="text-sm text-gray-600 mb-1">
                  {post?.likes} likes
                </p> */}
                <p className="text-md font-medium text-gray-800 px-4 ml-2">
                  {post?.title}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Button
        className="fixed bottom-20 md:bottom-6 right-6 rounded-full h-14 w-14 shadow-lg"
        onClick={() => setIsModalOpen(true)}
      >
        <Camera className="h-6 w-6" />
      </Button>
    </div>
  );
}

export default NewsFeed;
