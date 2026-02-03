import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight, Ticket } from 'lucide-react';

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-event');

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4 md:p-8">
      <div className="max-w-6xl w-full">
        <Card className="overflow-hidden shadow-2xl shadow-primary/10">
          <div className="grid md:grid-cols-2">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <Ticket className="w-10 h-10 text-primary" />
                <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">
                  EventZenith
                </h1>
              </div>
              <p className="text-lg md:text-xl text-muted-foreground mt-2 mb-8">
                Your Gateway to Seamless Event Experiences. Register in seconds and get ready for your next adventure.
              </p>
              <div className="flex gap-4">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Link href="/register">
                    Register Now <ArrowRight className="ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative min-h-[300px] md:min-h-0">
              {heroImage && (
                <Image
                  src={heroImage.imageUrl}
                  alt={heroImage.description}
                  fill
                  className="object-cover"
                  data-ai-hint={heroImage.imageHint}
                />
              )}
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}
