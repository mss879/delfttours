'use client';

import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import QuoteForm from './QuoteForm';

interface QuoteDialogProps {
    children?: React.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    defaultTheme?: string;
}

export default function QuoteDialog({ children, open, onOpenChange, defaultTheme }: QuoteDialogProps) {
    const [internalOpen, setInternalOpen] = useState(false);

    // Handle controlled vs uncontrolled state
    const isControlled = open !== undefined && onOpenChange !== undefined;
    const isOpen = isControlled ? open : internalOpen;
    const setIsOpen = isControlled ? onOpenChange : setInternalOpen;

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            {children && <DialogTrigger asChild>{children}</DialogTrigger>}
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto sm:max-h-[85vh]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-[#0b3e63]">
                        Plan Your Dream Trip
                    </DialogTitle>
                    <DialogDescription>
                        Tell us about your perfect holiday, and we will craft a custom itinerary just for you.
                    </DialogDescription>
                </DialogHeader>

                <QuoteForm
                    defaultTheme={defaultTheme}
                    onSuccess={() => {
                        // Close dialog after 3 seconds if success
                        setTimeout(() => {
                            setIsOpen(false);
                        }, 3000);
                    }}
                />
            </DialogContent>
        </Dialog>
    );
}
