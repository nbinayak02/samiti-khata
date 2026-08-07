import DashboardLayout from '@/components/shared/DashboardLayout'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard')({
  component: DashboardLayout,
  beforeLoad: ({context}) => {
    
  }
})

