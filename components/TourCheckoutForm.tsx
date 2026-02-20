"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, CheckCircle2, CreditCard, Building, ArrowRight, ArrowLeft } from 'lucide-react';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';

// Webhook URL (reusing existing one for now, or could be a new one)
const WEBHOOK_URL = 'https://hook.eu1.make.com/1lqg4s177p18s21yxmyd7kts1h34kby1';

const checkoutSchema = z.object({
    // Step 1: Traveler Details
    firstName: z.string().min(2, 'First name is required'),
    lastName: z.string().min(2, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(5, 'Phone number is required'),
    country: z.string().min(2, 'Country is required'),
    travelers: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
        message: 'Must be a valid number',
    }),
    travelDate: z.string().min(1, 'Travel date is required'),
    specialRequests: z.string().optional(),

    // Step 2: Payment
    paymentMethod: z.enum(['bank_transfer'], {
        required_error: "Please select a payment method",
    }),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

interface TourCheckoutFormProps {
    tourId: string;
    tourTitle: string;
    tourPrice?: string;
    className?: string;
}

export default function TourCheckoutForm({ tourId, tourTitle, tourPrice, className }: TourCheckoutFormProps) {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const form = useForm<CheckoutFormValues>({
        resolver: zodResolver(checkoutSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            country: '',
            travelers: '2',
            travelDate: '',
            specialRequests: '',
            paymentMethod: 'bank_transfer',
        },
    });

    const onSubmit = async (data: CheckoutFormValues) => {
        setIsSubmitting(true);
        try {
            // Include tour details in the payload
            const payload = {
                ...data,
                tourId,
                tourTitle,
                tourPrice,
                submissionDate: new Date().toISOString(),
            };

            const response = await fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                setIsSuccess(true);
                window.scrollTo(0, 0);
            } else {
                console.error('Failed to submit form', await response.text());
                // Handle error
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Validate step 1 before moving to step 2
    const nextStep = async () => {
        const step1Fields = ['firstName', 'lastName', 'email', 'phone', 'country', 'travelers', 'travelDate'] as const;
        const isValid = await form.trigger(step1Fields);
        if (isValid) {
            setStep(2);
            window.scrollTo(0, 0);
        }
    };

    if (isSuccess) {
        return (
            <div className="flex flex-col items-center justify-center py-12 space-y-6 bg-white rounded-2xl shadow-sm p-8 border border-slate-100">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center animate-in zoom-in duration-300">
                    <CheckCircle2 className="w-12 h-12 text-green-600" />
                </div>
                <div className="text-center space-y-2">
                    <h2 className="text-2xl font-bold text-[#0b3e63]">Booking Request Received!</h2>
                    <p className="text-slate-600 max-w-md mx-auto">
                        Thank you for booking <strong>{tourTitle}</strong>. We have sent the bank transfer details to your email address: <strong>{form.getValues('email')}</strong>
                    </p>
                </div>

                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 w-full max-w-md">
                    <h3 className="font-semibold text-[#0b3e63] mb-4 flex items-center">
                        <Building className="w-5 h-5 mr-2" />
                        Bank Transfer Details
                    </h3>
                    <div className="space-y-3 text-sm text-slate-700">
                        <div className="flex justify-between border-b border-slate-200 pb-2">
                            <span className="text-slate-500">Bank Name</span>
                            <span className="font-medium">Bank of Ceylon</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-200 pb-2">
                            <span className="text-slate-500">Account Name</span>
                            <span className="font-medium">Delft Tours (Pvt) Ltd</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-200 pb-2">
                            <span className="text-slate-500">Account Number</span>
                            <span className="font-medium">1234 5678 9000</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-200 pb-2">
                            <span className="text-slate-500">Branch</span>
                            <span className="font-medium">Colombo City</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-500">Swift Code</span>
                            <span className="font-medium">BCEYLKLX</span>
                        </div>
                    </div>
                </div>

                <p className="text-xs text-slate-500 text-center max-w-sm">
                    Please upload your payment proof using the link sent to your email within 24 hours to confirm your booking.
                </p>

                <Button onClick={() => window.location.href = '/'} className="bg-[#0b3e63] mt-4">
                    Return to Home
                </Button>
            </div>
        );
    }

    return (
        <div className={`bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden ${className}`}>
            {/* Progress Bar */}
            <div className="bg-slate-50 border-b border-slate-100 p-4">
                <div className="flex items-center justify-center space-x-4">
                    <div className={`flex items-center ${step >= 1 ? 'text-[#0b3e63]' : 'text-slate-400'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-2 ${step >= 1 ? 'bg-[#0b3e63] text-white' : 'bg-slate-200'}`}>1</div>
                        <span className="text-sm font-medium hidden sm:inline">Your Details</span>
                    </div>
                    <div className="w-12 h-px bg-slate-300"></div>
                    <div className={`flex items-center ${step >= 2 ? 'text-[#0b3e63]' : 'text-slate-400'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-2 ${step >= 2 ? 'bg-[#0b3e63] text-white' : 'bg-slate-200'}`}>2</div>
                        <span className="text-sm font-medium hidden sm:inline">Payment</span>
                    </div>
                </div>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8 space-y-6">
                    {step === 1 && (
                        <div className="space-y-6 animate-in slide-in-from-left-4 duration-300">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="firstName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>First Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="John" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="lastName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Last Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Doe" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="john@example.com" type="email" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Phone Number</FormLabel>
                                            <FormControl>
                                                <Input placeholder="+1 234 567 890" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="country"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Country of Residence</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g. United Kingdom" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="travelers"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>No. of Travelers</FormLabel>
                                            <FormControl>
                                                <Input type="number" min="1" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name="travelDate"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Preferred Travel Date</FormLabel>
                                        <FormControl>
                                            <Input type="date" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="specialRequests"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Special Requests / Notes (Optional)</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Any dietary requirements, flight details, or specific interests?"
                                                className="resize-none"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex justify-end pt-4">
                                <Button type="button" onClick={nextStep} className="bg-[#0b3e63] hover:bg-[#0a3554] w-full md:w-auto">
                                    Next: Payment <ArrowRight className="ml-2 w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                            {/* Order Summary */}
                            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mb-6">
                                <h3 className="font-semibold text-slate-800 mb-2">Booking Summary</h3>
                                <div className="space-y-1 text-sm text-slate-600">
                                    <div className="flex justify-between">
                                        <span>Package:</span>
                                        <span className="font-medium text-slate-900">{tourTitle}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Travelers:</span>
                                        <span className="font-medium text-slate-900">{form.getValues('travelers')}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Date:</span>
                                        <span className="font-medium text-slate-900">{form.getValues('travelDate')}</span>
                                    </div>
                                </div>
                            </div>

                            <FormField
                                control={form.control}
                                name="paymentMethod"
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormLabel className="text-base">Select Payment Method</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className="grid gap-4"
                                            >
                                                <FormItem>
                                                    <FormControl>
                                                        <div className="relative">
                                                            <RadioGroupItem value="bank_transfer" id="bank_transfer" className="peer sr-only" />
                                                            <label
                                                                htmlFor="bank_transfer"
                                                                className="flex items-start justify-between p-4 rounded-xl border-2 border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 peer-data-[state=checked]:border-[#0b3e63] peer-data-[state=checked]:bg-blue-50/30 cursor-pointer transition-all"
                                                            >
                                                                <div className="flex items-center space-x-3">
                                                                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-[#0b3e63]">
                                                                        <Building className="w-5 h-5" />
                                                                    </div>
                                                                    <div>
                                                                        <div className="font-semibold text-slate-900">Bank Transfer</div>
                                                                        <div className="text-xs text-slate-500">Pay directly to our bank account</div>
                                                                    </div>
                                                                </div>
                                                                <div className="h-5 w-5 rounded-full border border-slate-300 peer-data-[state=checked]:border-[#0b3e63] peer-data-[state=checked]:bg-[#0b3e63] flex items-center justify-center mt-2.5">
                                                                    <div className="h-2 w-2 rounded-full bg-white" />
                                                                </div>
                                                            </label>
                                                        </div>
                                                    </FormControl>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 text-sm text-yellow-800">
                                <p>
                                    After submitting your booking, you will receive our bank details via email. Your booking isn't confirmed until we receive proof of payment.
                                </p>
                            </div>

                            <div className="flex flex-col-reverse md:flex-row justify-between pt-4 gap-4">
                                <Button type="button" variant="outline" onClick={() => setStep(1)} className="w-full md:w-auto">
                                    <ArrowLeft className="mr-2 w-4 h-4" /> Back to Details
                                </Button>
                                <Button type="submit" className="bg-[#0b3e63] hover:bg-[#0a3554] w-full md:w-auto" disabled={isSubmitting}>
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Submitting...
                                        </>
                                    ) : (
                                        <>
                                            Complete Booking <CheckCircle2 className="ml-2 w-4 h-4" />
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    )}
                </form>
            </Form>
        </div>
    );
}
