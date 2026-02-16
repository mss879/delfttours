'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from './ui/button';

interface SuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    message?: string;
}

export default function SuccessModal({
    isOpen,
    onClose,
    title = "Message Sent!",
    message = "Thank you for reaching out. We will get back to you shortly."
}: SuccessModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", duration: 0.5 }}
                        className="relative w-full max-w-sm overflow-hidden rounded-3xl bg-white text-center shadow-2xl"
                    >
                        <div className="p-8">
                            {/* Animated Checkmark */}
                            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                                <motion.svg
                                    className="h-10 w-10 text-green-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={3}
                                >
                                    <motion.path
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: 1 }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 13l4 4L19 7"
                                    />
                                </motion.svg>
                            </div>

                            <h3 className="mb-2 text-2xl font-bold text-slate-900">{title}</h3>
                            <p className="mb-8 text-slate-600">{message}</p>

                            <Button
                                onClick={onClose}
                                className="w-full rounded-full bg-slate-900 py-6 text-lg font-bold hover:bg-slate-800"
                            >
                                Close
                            </Button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
