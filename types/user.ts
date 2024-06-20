import { Database } from "@/lib/database.types2"


export interface User {
  id: string
  email: string
  avatar_url: string
  password: string
  primary_currency: string
}

export type ProfileType = Database["public"]["Tables"]["profiles"]["Row"];