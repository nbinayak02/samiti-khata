import { Toaster } from "@/components/ui/sonner"
import { Outlet } from "react-router-dom"

const RootLayout = () => {
  return (
    <main>
      <Outlet />
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            fontSize: "16px",
          },
        }}
      />
    </main>
  )
}

export default RootLayout
