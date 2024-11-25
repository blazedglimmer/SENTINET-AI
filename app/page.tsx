import { Playground } from '@/components/playground/playground';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-8">
      <Playground />
    </main>
  );
}
