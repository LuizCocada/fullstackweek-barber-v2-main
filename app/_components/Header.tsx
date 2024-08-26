import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { CalendarIcon, HomeIcon, Icon, LogOutIcon, MenuIcon } from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { quickSearchOptions } from "../_constants/search";
import { Avatar } from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import Link from "next/link";
import Menu from "./MenuContent";
import MenuContent from "./MenuContent";

const Header = () => {
    return (
        <Card>
            <CardContent className="p-5 items-center flex flex-row justify-between">
                <Image src="/LogoBarber.png" height={18} width={120} alt={"logo barbearia"} />
                <Sheet>
                    <SheetTrigger>
                        <MenuIcon />
                    </SheetTrigger>

                    <MenuContent />
                </Sheet>
            </CardContent>
        </Card>
    );
}

export default Header;

