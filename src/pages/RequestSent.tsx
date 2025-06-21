import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { useState } from "react";

import { getAllRequestSent, deleteFriendship } from "@/api/friend.api";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { timeSince } from "@/utils/time";

interface FriendRequest {
  addressee_id: number;
  addressee: {
    email: string;
    name: string;
  };
  createdAt: string;
}

function RequestSent() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: friends, isLoading } = useQuery({
    queryKey: ["requests-sent"],
    queryFn: getAllRequestSent,
  });
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: deleteFriendship,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["requests-sent"],
      });
    },
  });

  const handleDeleteFriend = (id: number) => {
    mutate(id);
  };

  if (isLoading) return <p className="animate-spin">Loading</p>;

  return (
    <>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Search friends..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="pl-10 rounded-xl border-gray-200 focus:border-pink-300 focus:ring-pink-200"
        />
      </div>
      <div className="space-y-3">
        {friends?.map((friend: FriendRequest) => (
          <Card
            key={friend?.addressee_id}
            className="rounded-2xl shadow-sm border-0 bg-white"
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage
                      src={friend?.addressee?.name?.at(0) || "/placeholder.svg"}
                    />
                    <AvatarFallback>
                      {friend?.addressee?.name?.at(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-gray-800">
                      {friend?.addressee?.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {timeSince(friend.createdAt)}
                    </p>
                  </div>
                </div>
                <Button
                  variant={"outline"}
                  size="sm"
                  className={`rounded-xl ${"border-gray-200 text-gray-700 hover:bg-gray-50"}`}
                  onClick={() => handleDeleteFriend(friend.addressee_id)}
                  disabled={isPending}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}

export default RequestSent;
