import { z } from 'zod';

export const RegistrationSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters."),
  lastName: z.string().min(2, "Last name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().min(10, "Please enter a valid phone number."),
  event: z.enum(['tech-conference-2024', 'design-summit-2024', 'product-expo-2024'], {
    errorMap: () => ({ message: "Please select an event." }),
  }),
  ticketType: z.enum(['general', 'vip', 'student'], {
    errorMap: () => ({ message: "Please select a ticket type." }),
  }),
  dietaryNeeds: z.string().optional(),
});

export type RegistrationData = z.infer<typeof RegistrationSchema>;
