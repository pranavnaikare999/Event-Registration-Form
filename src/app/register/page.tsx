import { MultiStepForm } from '@/components/registration/MultiStepForm';
import { Ticket } from 'lucide-react';

export default function RegisterPage() {
  return (
    <div className="w-full max-w-3xl">
      <div className="flex flex-col items-center text-center mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Ticket className="w-12 h-12 text-primary" />
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">
            Event Registration
          </h1>
        </div>
        <p className="text-lg text-muted-foreground">
          Complete the steps below to secure your spot at our next event.
        </p>
      </div>
      <MultiStepForm />
    </div>
  );
}
