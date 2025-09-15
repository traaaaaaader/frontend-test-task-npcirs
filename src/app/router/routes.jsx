import { DashboardPage } from "@/pages/dashboard";
import { CitizensPage } from "@/pages/citizens";
import { NotFoundPage } from "@/pages/not-found-page";

export const routes = [
  {
    path: "/",
    element: <DashboardPage />,
  },
  {
    path: "/citizens",
    element: <CitizensPage />,
  },
    {
    path: "*",
    element: <NotFoundPage />,
  },
];