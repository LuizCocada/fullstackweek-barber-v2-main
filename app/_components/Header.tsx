import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { CalendarIcon, HomeIcon, Icon, LogOutIcon, MenuIcon } from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { quickSearchOptions } from "../_constants/search";
import { Avatar } from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import Link from "next/link";

const Header = () => {


    return (
        <Card>
            <CardContent className="p-5 items-center flex flex-row justify-between">
                <Image src="/LogoBarber.png" height={18} width={120} alt={"logo barbearia"} />
                <Sheet>
                    <SheetTrigger>
                        <MenuIcon />
                    </SheetTrigger>

                    <SheetContent className="overflow-y-auto">
                        <SheetHeader>
                            <SheetTitle className="text-left">Menu</SheetTitle>
                        </SheetHeader>

                        <div className="flex gap-2 p-5 mt-5">
                            <Avatar className="items-center border border-purple-600">
                                <AvatarImage src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?q=80&w=1856&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                            </Avatar>

                            <div className="text-sm">
                                <h2 className="font-semibold">Ramon da Silva</h2>
                                <p>ramonSilva@gmail.com</p>
                            </div>
                        </div>


                        <div className="p-5 flex flex-col gap-5 border-b border-solid">
                            {/* asChild é usado para nao dar error de 'hidratation' co o Link ou tag 'a'*/}
                            <SheetClose asChild>
                                <Button className="rounded-xl justify-start border-none gap-2" asChild>∫
                                    <Link href={"/"}>
                                        <HomeIcon size={18} />
                                        Ínicio
                                    </Link>
                                </Button>
                            </SheetClose>
                            <Button className="rounded-xl justify-start border-none gap-2" variant="sheet">
                                <CalendarIcon size={18} />
                                Agendamentos
                            </Button>
                        </div>

                        <div className="p-5 flex flex-col gap-5 border-b border-solid">
                            {quickSearchOptions.map((option) => (
                                <Button className="rounded-xl justify-start border-none gap-2" variant="sheet">
                                    <Image src={option.imageUrl} alt={option.title} width={18} height={18} />
                                    {option.title}
                                </Button>
                            ))}
                        </div>

                        <div className="p-5">
                            <Button className="rounded-xl flex gap-2 border-none" variant="sheet">
                                <LogOutIcon />
                                Sair da conta
                            </Button>
                        </div>
                    </SheetContent>
                </Sheet>
            </CardContent>
        </Card>
    );
}

export default Header;
