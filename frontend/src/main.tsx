import "./index.css"
import { StrictMode } from "react"
import router from "./routes/routes.tsx"
import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import { AuthProvider } from "./context/authContext.tsx"
import { TooltipProvider } from "./components/ui/tooltip.tsx"
import { ThemeProvider } from "@/components/common/theme-provider.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <TooltipProvider>
          <RouterProvider router={router} />
        </TooltipProvider>
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>
)
