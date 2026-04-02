import { useEffect } from "react"
import { FieldError } from "@/components/ui/field"
import ProfileHeader from "@/page/profile/ui/profile-header"
import ProfileContent from "@/page/profile/ui/profile-content"
import useGetProfile from "@/page/profile/useGetProfile"

const ProfilePage = () => {
  const { data, error, fetchUser, loading } = useGetProfile()

  useEffect(() => {
    fetchUser()
  }, [])
  return (
    <div className="@container/main flex flex-1 flex-col gap-2 px-8">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        {!loading && data && (
          <>
            <ProfileHeader userProfile={data} />
            <ProfileContent />
          </>
        )}
        {!loading && error && <FieldError>{error}</FieldError>}
      </div>
    </div>
  )
}

export default ProfilePage

