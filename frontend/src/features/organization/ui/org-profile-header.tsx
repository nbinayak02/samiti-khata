import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Camera, Mail, MapPin, Phone } from "lucide-react"

export default function OrgProfileHeader() {
  return (
    <Card>
      <CardContent>
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
          <div className="relative">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src="https://cloudcommercepro.com/wp-content/uploads/2022/06/dummy-customer.jpg"
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
              <h1 className="text-2xl font-bold">
                {"Shree Ranganatha Mandir"}
              </h1>

              <Badge variant="secondary">Pro</Badge>
            </div>
            <p className="text-muted-foreground">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
              illum repellat nam, error illo assumenda veritatis tempora facilis
              ea quo, modi sequi nostrum fugiat quas. Explicabo error, minus
              eaque ea aspernatur magnam enim accusantium unde eveniet nisi id
              sequi soluta.
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Mail className="size-4" />
                ranganatha@gmail.com
              </div>
              <div className="flex items-center gap-1">
                <Phone className="size-4" />
                023-47012345
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="size-4" />
                Shivasataksi-08, Shree Rangam Divya Kshetra, Shree Rangam Chowk,
                Jhapa, Nepal
              </div>
            </div>
          </div>
          <Button variant="default">Edit Profile</Button>
        </div>
      </CardContent>
    </Card>
  )
}
