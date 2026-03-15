import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

const LandingPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold">Welcome to Samiti Khata</h1>
        <p className="text-lg text-muted-foreground">
          Manage your samiti finances with ease.
        </p>
        <div className="space-x-4">
          <Button asChild>
            <Link to="/login">Login</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/signup">Sign Up</Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link to="/dashboard">Dashboard</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default LandingPage