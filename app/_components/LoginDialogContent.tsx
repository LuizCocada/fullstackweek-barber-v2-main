import { signIn } from "next-auth/react";
import { Button } from "./ui/button";
import { DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import Image from "next/image"

const DialogContentLogin = () => {
    const handleLoginWithGoogle = () => signIn("google")
    return (
        <>
            <DialogHeader>
                <DialogTitle>Faça seu login na plataforma</DialogTitle>
                <DialogDescription>Conecte-se usando sua conta Google</DialogDescription>
            </DialogHeader>
            {/* PARA USAR ONCLICK 'OU QUALQUER INTERACAO JAVASCRIPT' O COMPONENTE PRECISA SER DO LADO DO CLIENT. OU SEJA, ADICIONAR 'use client' */}
            <Button className="flex gap-1 rounded-xl" variant={"outline"} onClick={handleLoginWithGoogle}>
                <Image src={"/googleIcon.svg"} width={16} height={16} alt="icon Google" />
                <p className="font-bold">Google</p>
            </Button>
        </>

    );
}

export default DialogContentLogin;