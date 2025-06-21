import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Search } from "lucide-react";

import { deleteFriendship, getAllFriends } from "@/api/friend.api";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Friend {
  id: number;
  email: string;
  name: string | null;
  friendshipCreatedAt: Date;
}

function FriendList() {
  const [searchQuery, setSearchQuery] = useState("");
  const queryClient = useQueryClient();
  const { data: friends } = useQuery({
    queryKey: ["friends"],
    queryFn: getAllFriends,
  });
  const { mutate, isPending } = useMutation({
    mutationFn: deleteFriendship,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["friends"],
      });
    },
  });

  const handleDeleteFriend = (id: number) => {
    mutate(id);
  };
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
        {friends?.map((friend: Friend) => (
          <Card
            key={friend.id}
            className="rounded-2xl shadow-sm border-0 bg-white"
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage
                      src={friend.name?.at(0) || "/placeholder.svg"}
                    />
                    <AvatarFallback>{friend.name?.at(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-gray-800">{friend.name}</p>
                    <p className="text-sm text-gray-500">Friend</p>
                  </div>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant={"outline"}
                      size="sm"
                      className={`rounded-xl ${""}`}
                    >
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This will delete <span>{friend.name}</span> from friends
                        list and cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDeleteFriend(friend.id)}
                        disabled={isPending}
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}

export default FriendList;
