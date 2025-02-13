import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import App from "./App";
import { ThematiqueProvider } from "./context/ThematiqueContext";
import GlobalImpact from "./pages/GlobalImpact";
import ImpactPage from "./pages/ImpactPage";

const thematique = [
  {
    id: 1,
    name: "Example Thematique",
    slug: "example_thematique",
    elements: [{ slug: "example_element", name: "Example Element", ecv: 1.0 }],
  },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <GlobalImpact />,
      },
      {
        path: "/admin",
        element: <ImpactPage />,
      },
    ],
  },
]);

const rootElement = document.getElementById("root");
if (rootElement == null) {
  throw new Error(`Your HTML Document should contain a <div id="root"></div>`);
}

createRoot(rootElement).render(
  <StrictMode>
    <ThematiqueProvider thematique={thematique}>
      <RouterProvider router={router} />
    </ThematiqueProvider>
  </StrictMode>,
);
