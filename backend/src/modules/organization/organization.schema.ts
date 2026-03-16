import z from "zod";

const organizationSchema = z.object({
  name: z.string().min(1, "Organization name is required"),
  email: z.email("Invalid email address").min(1, "Email is required"),
  address: z.string().min(1, "Address is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
});

export default organizationSchema;
