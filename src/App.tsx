import { createBrowserRouter, RouterProvider } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import AppLayout from "./pages/AppLayout";
import Friends from "./pages/Friends";
import Login from "./pages/Login";
import NewsFeed from "./pages/NewsFeed";
import Profile from "./pages/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    Component: AppLayout,
    children: [
      { index: true, Component: NewsFeed },
      { path: "/friends", Component: Friends },
      {
        path: "/news-feed",
        Component: NewsFeed,
      },
    ],
  },
  { path: "/login", Component: Login },
  { path: "/profile/:id", Component: Profile },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}></RouterProvider>
    </QueryClientProvider>
  );
}

export default App;
