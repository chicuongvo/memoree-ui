import { createBrowserRouter, RouterProvider } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import AppLayout from "./pages/AppLayout";
import Friends from "./pages/Friends";
import Login from "./pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    Component: AppLayout,
    children: [{ path: "/friends", Component: Friends }],
  },
  { path: "/login", Component: Login },
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
