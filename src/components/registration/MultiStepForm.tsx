'use client';

import { useState } from 'react';
import type { FieldName } from 'react-hook-form';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Loader2,
  PartyPopper,
  User,
  Ticket,
  Utensils,
  Home,
} from 'lucide-react';

import { registerUser } from '@/app/register/actions';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { RegistrationSchema } from '@/lib/types';
import type { RegistrationData } from '@/lib/types';
import Link from 'next/link';

const steps = [
  {
    id: '01',
    name: 'Personal Details',
    fields: ['firstName', 'lastName', 'email', 'phone'],
  },
  {
    id: '02',
    name: 'Event Choices',
    fields: ['event', 'ticketType', 'dietaryNeeds'],
  },
  { id: '03', name: 'Review & Submit' },
];

export function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState('');
  const { toast } = useToast();

  const form = useForm<RegistrationData>({
    resolver: zodResolver(RegistrationSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      event: undefined,
      ticketType: undefined,
      dietaryNeeds: '',
    },
  });

  const {
    handleSubmit,
    trigger,
    getValues,
  } = form;

  const next = async () => {
    const fields = steps[currentStep].fields;
    const output = await trigger(fields as FieldName<RegistrationData>[], {
      shouldFocus: true,
    });

    if (!output) return;

    if (currentStep < steps.length - 1) {
      setCurrentStep(step => step + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setCurrentStep(step => step - 1);
    }
  };

  const processForm = async (data: RegistrationData) => {
    setIsSubmitting(true);
    const result = await registerUser(data);
    setIsSubmitting(false);

    if (result.success) {
      setSubmissionSuccess(true);
      setSubmissionMessage(result.message);
      form.reset();
    } else {
      toast({
        title: 'Submission Failed',
        description: result.message || 'An unexpected error occurred.',
        variant: 'destructive',
      });
    }
  };
  
  const allValues = getValues();

  if (submissionSuccess) {
    return (
      <Card className="w-full">
        <CardHeader>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <PartyPopper className="h-6 w-6 text-green-600" />
          </div>
          <CardTitle className="text-center">Registration Successful!</CardTitle>
          <CardDescription className="text-center">{submissionMessage}</CardDescription>
        </CardHeader>
        <CardContent>
           <div className="text-center">
             <p>We're excited to see you at the event.</p>
           </div>
        </CardContent>
        <CardFooter className="justify-center">
            <Button asChild>
                <Link href="/"><Home className="mr-2 h-4 w-4" /> Go to Homepage</Link>
            </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <nav aria-label="Progress">
          <ol role="list" className="space-y-4 md:flex md:space-x-8 md:space-y-0">
            {steps.map((step, index) => (
              <li key={step.name} className="md:flex-1">
                {currentStep > index ? (
                  <div className="group flex w-full flex-col border-l-4 border-accent py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                    <span className="text-sm font-medium text-accent transition-colors ">
                      {step.id}
                    </span>
                    <span className="text-sm font-medium">{step.name}</span>
                  </div>
                ) : currentStep === index ? (
                  <div
                    className="flex w-full flex-col border-l-4 border-primary py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
                    aria-current="step"
                  >
                    <span className="text-sm font-medium text-primary">
                      {step.id}
                    </span>
                    <span className="text-sm font-medium">{step.name}</span>
                  </div>
                ) : (
                  <div className="group flex w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                    <span className="text-sm font-medium text-gray-500 transition-colors">
                      {step.id}
                    </span>
                    <span className="text-sm font-medium">{step.name}</span>
                  </div>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </CardHeader>

      <FormProvider {...form}>
        <form onSubmit={handleSubmit(processForm)}>
          <CardContent>
            {currentStep === 0 && (
              <div className="space-y-4">
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
                 <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="john.doe@example.com" {...field} />
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
                        <Input placeholder="(123) 456-7890" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
            {currentStep === 1 && (
              <div className="space-y-4">
                 <FormField
                  control={form.control}
                  name="event"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Event</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose an event" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="tech-conference-2024">Tech Conference 2024</SelectItem>
                          <SelectItem value="design-summit-2024">Design Summit 2024</SelectItem>
                          <SelectItem value="product-expo-2024">Product Expo 2024</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ticketType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ticket Type</FormLabel>
                       <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your ticket" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="general">General Admission</SelectItem>
                          <SelectItem value="vip">VIP Access</SelectItem>
                          <SelectItem value="student">Student</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dietaryNeeds"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dietary Needs (Optional)</FormLabel>
                      <FormControl>
                        <Textarea placeholder="e.g., Vegetarian, Gluten-Free" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
             {currentStep === 2 && (
              <div>
                <h3 className="text-lg font-medium mb-4">Review Your Information</h3>
                <div className="space-y-3 rounded-lg border border-border p-4">
                    <div className="flex justify-between"><span className="text-muted-foreground">Full Name:</span> <strong>{allValues.firstName} {allValues.lastName}</strong></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Email:</span> <strong>{allValues.email}</strong></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Phone:</span> <strong>{allValues.phone}</strong></div>
                    <div className="flex justify-between capitalize"><span className="text-muted-foreground">Event:</span> <strong>{allValues.event?.replace(/-/g, ' ')}</strong></div>
                    <div className="flex justify-between capitalize"><span className="text-muted-foreground">Ticket Type:</span> <strong>{allValues.ticketType}</strong></div>
                    {allValues.dietaryNeeds && <div className="flex justify-between"><span className="text-muted-foreground">Dietary Needs:</span> <strong>{allValues.dietaryNeeds}</strong></div>}
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <div className="flex justify-between w-full">
              <Button type="button" variant="outline" onClick={prev} disabled={currentStep === 0}>
                <ChevronLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
              {currentStep < steps.length - 1 && (
                <Button type="button" onClick={next}>
                  Next <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              )}
              {currentStep === steps.length - 1 && (
                <Button type="submit" disabled={isSubmitting} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  {isSubmitting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Check className="mr-2 h-4 w-4" />
                  )}
                  Submit Registration
                </Button>
              )}
            </div>
          </CardFooter>
        </form>
      </FormProvider>
    </Card>
  );
}
