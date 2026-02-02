'use client';

import { useQuery } from '@tanstack/react-query';

import { citiesSchema } from '~/lib/zod-schemas';
import { GET } from '~/lib/api-utils';
import { CityCard } from './city-card';

export function Cities() {
  const { data: cities, isLoading } = useQuery({
    queryKey: ['cities'],
    queryFn: () => GET('/api/cities', citiesSchema),
  });

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {isLoading && <p>Városok betöltése...</p>}

      {cities?.map((city) => (
        <CityCard key={city.id} city={city} />
      ))}
    </div>
  );
}
