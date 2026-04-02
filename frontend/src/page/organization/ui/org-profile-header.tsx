import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Camera, Mail, MapPin, Phone } from "lucide-react"
import { useAppSelector } from "@/hooks/typeSafeReduxHooks"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function OrgProfileHeader() {
  const organization = useAppSelector((state) => state.organization.data[0])
  return (
    <Card>
      <CardContent>
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
          <div className="relative">
            <Avatar className="h-24 w-24">
              {/* <AvatarImage
                src="https://cloudcommercepro.com/wp-content/uploads/2022/06/dummy-customer.jpg"
                alt="Profile"
              /> */}
              <AvatarFallback className="text-2xl">SK</AvatarFallback>
            </Avatar>
            <Button
              size="icon"
              variant="outline"
              className="absolute -right-2 -bottom-2 h-8 w-8 rounded-full"
            >
              <Camera />
            </Button>
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex flex-col gap-2 md:flex-row md:items-center">
              <h1 className="text-2xl font-bold">{organization?.name}</h1>

              {/* <Badge variant="secondary">Pro</Badge> */}
            </div>
            <p className="text-muted-foreground">
              {"No description provided."}
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Mail className="size-4" />
                {organization?.email}
              </div>
              <div className="flex items-center gap-1">
                <Phone className="size-4" />
                {organization?.phoneNumber}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="size-4" />
                {organization?.address}
              </div>
            </div>
          </div>
          <Button variant="default">Edit Profile</Button>
        </div>
      </CardContent>
    </Card>
  )
}
