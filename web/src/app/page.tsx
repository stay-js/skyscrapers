import { Cities } from '~/components/cities';
import { createMetadata } from '~/lib/create-metadata';

export const metadata = createMetadata({
  path: '/',
  title: 'Főoldal',
  description: 'Üdvözöljük a Skyscraper alkalmazásban!',
});

export default async function Page() {
  return (
    <main className="container flex flex-col gap-8 py-12">
      <h1 className="text-2xl font-bold">Városok listája</h1>

      <Cities />
    </main>
  );
}
