"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, CheckCircle2 } from 'lucide-react';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

// Webhook URL
const WEBHOOK_URL = 'https://hook.eu1.make.com/1lqg4s177p18s21yxmyd7kts1h34kby1';

// Theme options extracted from tour data
const THEME_OPTIONS = [
    'Beach & Relax',
    'Wildlife & Nature',
    'Honeymoon',
    'Culture & Heritage',
    'Hill Country',
    'Adventure',
];

// Zod Schema
const formSchema = z.object({
    firstName: z.string().min(2, 'First name is required'),
    lastName: z.string().min(2, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(5, 'Phone number is required'),
    country: z.string().min(2, 'Country is required'),
    travelers: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
        message: 'Must be a valid number',
    }),
    duration: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
        message: 'Must be a valid number',
    }),
    themes: z.array(z.string()).refine((value) => value.length > 0, {
        message: 'Please select at least one theme',
    }),
    mealPlan: z.string().optional(),
    healthRequirements: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface QuoteFormProps {
    defaultTheme?: string;
    onSuccess?: () => void;
    className?: string;
}

export default function QuoteForm({ defaultTheme, onSuccess, className }: QuoteFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            country: '',
            travelers: '',
            duration: '',
            themes: defaultTheme ? [defaultTheme] : [],
            mealPlan: '',
            healthRequirements: '',
        },
    });

    const onSubmit = async (data: FormValues) => {
        setIsSubmitting(true);
        try {
            const response = await fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setIsSuccess(true);
                form.reset();
                if (onSuccess) {
                    onSuccess();
                }
            } else {
                console.error('Failed to submit form', await response.text());
                // Handle error (could add toast here)
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10 text-green-600" />
                </div>
                <p className="text-center text-slate-600 max-w-sm">
                    We have received your details. Check your email for a confirmation shortly!
                </p>
                <Button onClick={() => setIsSuccess(false)} className="bg-[#0b3e63]">
                    Submit Another Request
                </Button>
            </div>
        );
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={`space-y-6 pt-4 ${className}`}>
                {/* Personal Details */}
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

                {/* Trip Details */}
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
                                    <Input type="number" min="1" placeholder="2" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Planned Duration (Days)</FormLabel>
                            <FormControl>
                                <Input type="number" min="1" placeholder="7" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Themes */}
                <FormField
                    control={form.control}
                    name="themes"
                    render={() => (
                        <FormItem>
                            <div className="mb-4">
                                <FormLabel className="text-base">Preferred Themes</FormLabel>
                                <p className="text-sm text-slate-500">
                                    Select all that apply to your interests.
                                </p>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                {THEME_OPTIONS.map((item) => (
                                    <FormField
                                        key={item}
                                        control={form.control}
                                        name="themes"
                                        render={({ field }) => {
                                            return (
                                                <FormItem
                                                    key={item}
                                                    className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3"
                                                >
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={field.value?.includes(item)}
                                                            onCheckedChange={(checked) => {
                                                                return checked
                                                                    ? field.onChange([...field.value, item])
                                                                    : field.onChange(
                                                                        field.value?.filter(
                                                                            (value) => value !== item
                                                                        )
                                                                    )
                                                            }}
                                                        />
                                                    </FormControl>
                                                    <FormLabel className="font-normal cursor-pointer">
                                                        {item}
                                                    </FormLabel>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                ))}
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Requirements */}
                <FormField
                    control={form.control}
                    name="mealPlan"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Meal Plan / Preferences</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="e.g. Vegetarian, Halal, or specific meal plan requirements like Half Board..."
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="healthRequirements"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Health / Mobility Requirements</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Any allergies, mobility issues, or medical conditions we should be aware of?"
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-end pt-4">
                    <Button type="submit" className="w-full md:w-auto bg-[#0b3e63] hover:bg-[#0a3554]" disabled={isSubmitting}>
                        {isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Submitting...
                            </>
                        ) : (
                            'Request My Free Quote'
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
