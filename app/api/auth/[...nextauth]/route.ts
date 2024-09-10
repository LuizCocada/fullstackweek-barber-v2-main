import NextAuth from "next-auth"
import { authOptions } from "../../../_lib/authOptions"

const handler = NextAuth(authOptions)

//deixamos a config de nextAuth separada para lá em create booking, podermos verificar se há usuario logado para evitar acesso ao banco por protocolo http.

export { handler as GET, handler as POST }
