import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FriendList from "./FriendList";
import RequestSent from "./RequestSent";
import RequestReceived from "./RequestReceived";

function Friends() {
  return (
    <div className="max-w-md mx-auto space-y-4">
      <div className="text-center py-4">
        <h2 className="text-2xl font-bold text-gray-800">Friends</h2>
      </div>
      <Tabs defaultValue="friends">
        <TabsList className="w-full">
          <TabsTrigger value="friends">Friends</TabsTrigger>
          <TabsTrigger value="req-received">Requests Received</TabsTrigger>
          <TabsTrigger value="req-sent">Requests Sent</TabsTrigger>
        </TabsList>

        <TabsContent value="friends">
          <FriendList />
        </TabsContent>
        <TabsContent value="req-received">
          <RequestReceived />
        </TabsContent>
        <TabsContent value="req-sent">
          <RequestSent />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Friends;
