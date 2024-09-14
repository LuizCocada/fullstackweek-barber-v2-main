"use client" //é usado o client quando precisa de interação, ou seja javascript, neste caso vamos clicar em um botao para copiar

import { SmartphoneIcon } from "lucide-react"
import { Button } from "./ui/button"
import { toast } from "sonner"

interface PhoneItemPros {
    phone: string
}


const PhoneItem = ({ phone }: PhoneItemPros) => {

    const handleCopyPhoneClick = (phone: string) => { //funcao que copia
        navigator.clipboard.writeText(phone)
        toast.success("telefone copiado com sucesso!")//para funcionar precisa da TAG <Toast/> em layout.tsx
    }

    return (
        <div className="flex justify-between items-center" key={phone}>
            <div>
                <div className="flex items-center gap-2">
                    <SmartphoneIcon />
                    <p className="text-sm">{phone}</p>
                </div>
            </div>
            <div>
                <Button onClick={() => handleCopyPhoneClick(phone)} variant="outline" size="sm" className="rounded-xl">
                    Copiar
                </Button>
            </div>
        </div>
    )
}


export default PhoneItem