import axiosInstance from "@/lib/apiClient"
import type { TBillIssuer } from "../user/user.types"
import type { TCreateBillIssuer } from "./billIssuer.schema"

const billIssuerRepository = {
  getBillIssuersByOrganization: async (): Promise<TBillIssuer[]> => {
    const response = await axiosInstance.get("/billIssuer/organization")
    return response.data.data
  },

  create: async (data:TCreateBillIssuer): Promise<TBillIssuer> => {
    const response = await axiosInstance.post("/billIssuer", data)
    return response.data.data
  },
}

export default billIssuerRepository
