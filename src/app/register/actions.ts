'use server';

import type { RegistrationData } from '@/lib/types';
import { RegistrationSchema } from '@/lib/types';

export async function registerUser(data: RegistrationData) {
  const parsedData = RegistrationSchema.safeParse(data);

  if (!parsedData.success) {
    return {
      success: false,
      message: 'Invalid data provided.',
      errors: parsedData.error.flatten().fieldErrors,
    };
  }

  // Here you would typically save the data to a database (e.g., SQLite, PostgreSQL, Firestore).
  // For this example, we'll just log it to the console to simulate a successful backend operation.
  console.log('New Registration Submitted:');
  console.log(parsedData.data);

  // Simulate a potential delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Simulate a potential error
  // if (Math.random() > 0.5) {
  //   return {
  //     success: false,
  //     message: "Failed to save registration due to a server error. Please try again."
  //   }
  // }

  return {
    success: true,
    message: `Thank you for registering, ${parsedData.data.firstName}! A confirmation has been sent to your email.`,
  };
}
