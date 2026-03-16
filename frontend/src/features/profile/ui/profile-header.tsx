import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera, Mail, MapPin, Phone } from "lucide-react"
import type { UserProfileHeader } from "../model/schema"

export default function ProfileHeader({
  userProfile,
}: {
  userProfile: UserProfileHeader
}) {
  return (
    <Card>
      <CardContent>
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
          <div className="relative">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src="https://bundui-images.netlify.app/avatars/08.png"
                alt="Profile"
              />
              <AvatarFallback className="text-2xl">JD</AvatarFallback>
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
              <h1 className="text-2xl font-bold">{userProfile.fullName}</h1>
              {userProfile?.role && (
                <Badge variant="secondary">{userProfile?.role}</Badge>
              )}
            </div>
            {/* <p className="text-muted-foreground">Senior Product Designer</p> */}
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Mail className="size-4" />
                {userProfile.email}
              </div>
              <div className="flex items-center gap-1">
                <Phone className="size-4" />
                {userProfile.phoneNumber}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="size-4" />
                {userProfile.address}
              </div>
            </div>
          </div>
          <Button variant="default">Edit Profile</Button>
        </div>
      </CardContent>
    </Card>
  )
}
