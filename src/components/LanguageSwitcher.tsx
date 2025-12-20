"use client";

import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";
import { useLanguage } from "./language-provider";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

export function LanguageSwitcher() {
    const { language, changeLanguage } = useLanguage();

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                    <Languages className="h-[1.2rem] w-[1.2rem]" />
                    <span className="sr-only">Change language</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-40 p-2" align="end">
                <div className="flex flex-col gap-1">
                    <Button
                        variant={language === 'en' ? 'default' : 'ghost'}
                        className="w-full justify-start"
                        onClick={() => changeLanguage('en')}
                    >
                        English
                    </Button>
                    <Button
                        variant={language === 'ar' ? 'default' : 'ghost'}
                        className="w-full justify-start"
                        onClick={() => changeLanguage('ar')}
                    >
                        العربية
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
}
