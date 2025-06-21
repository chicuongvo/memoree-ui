import { getPostByAuthorID } from "@/api/post.api";
import { getProfile } from "@/api/user.api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Pencil } from "lucide-react";
import { useParams } from "react-router";

export default function ProfilePage() {
  const { id } = useParams();
  const { data: profile, isLoadingProfile } = useQuery({
    queryKey: ["profile", id],
    queryFn: () => getProfile(id),
  });

  const { data: posts, isLoadingPosts } = useQuery({
    queryKey: ["profile-posts", id],
    queryFn: () => getPostByAuthorID(id),
  });

  if (isLoadingProfile) return <p>Loading...</p>;

  return (
    <div className="container max-w-md mx-auto p-4">
      <div className="flex flex-col items-center mb-8">
        <Avatar className="h-24 w-24 mb-4">
          <AvatarImage src="/placeholder.svg" alt="Profile" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>

        <h1 className="text-2xl font-bold">
          {profile?.user.name || "Jane Doe"}
        </h1>
        <p className="text-muted-foreground mb-2">
          Capturing life's little moments ✨
        </p>
        <p className="text-sm mb-4">42 friends</p>

        <Button variant="outline" size="sm" className="gap-2">
          <Pencil className="h-4 w-4" />
          Edit Profile
        </Button>
      </div>

      <h2 className="text-xl font-semibold mb-4">Photos</h2>
      <div className="grid grid-cols-3 gap-1">
        {posts?.map(post => (
          <img
            src={post.image_url}
            key={post.id}
            className="aspect-square w-full"
          />
        ))}
      </div>
    </div>
  );
}
