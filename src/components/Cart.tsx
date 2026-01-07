"use client";

import { useCart } from "@/components/cart-provider";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ShoppingCart, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";

// Simple ScrollArea implementation if it's not in UI
const SimpleScrollArea = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <div className={`overflow-y-auto max-h-[300px] ${className}`}>
        {children}
    </div>
);

export function Cart() {
    const { items, removeItem, totalItems, totalPrice, clearCart } = useCart();
    const { t } = useTranslation('cart');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative h-9 w-9">
                    <ShoppingCart className="h-[1.2rem] w-[1.2rem]" />
                    {totalItems > 0 && (
                        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                            {totalItems}
                        </span>
                    )}
                    <span className="sr-only">Toggle cart</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-80 p-0 bg-card border-border shadow-xl">
                <div className="flex items-center justify-between p-4 border-b">
                    <h4 className="font-semibold text-lg">My Cart ({totalItems})</h4>
                    {totalItems > 0 && (
                        <Button variant="ghost" size="sm" onClick={clearCart} className="text-xs text-muted-foreground hover:text-destructive">
                            Clear All
                        </Button>
                    )}
                </div>

                <SimpleScrollArea className="p-2">
                    {!Array.isArray(items) || items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-8 text-center">
                            <ShoppingCart className="h-12 w-12 text-muted-foreground/30 mb-2" />
                            <p className="text-sm text-muted-foreground">Your cart is empty</p>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {items.map((item) => (
                                <div key={item.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-accent transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded bg-primary/10 flex items-center justify-center">
                                            <ShoppingCart className="h-5 w-5 text-primary" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium line-clamp-1">{item.title}</span>
                                            <span className="text-xs text-muted-foreground">{item.price}</span>
                                        </div>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                        onClick={() => removeItem(item.id)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    )}
                </SimpleScrollArea>

                {items.length > 0 && (
                    <div className="p-4 border-t bg-muted/30">
                        <div className="flex items-center justify-between mb-4">
                            <span className="font-semibold">Subtotal</span>
                            <span className="font-bold text-lg text-primary">${totalPrice}</span>
                        </div>
                        <Button className="w-full shadow-lg shadow-primary/20">
                            Checkout
                        </Button>
                    </div>
                )}
            </PopoverContent>
        </Popover>
    );
}
