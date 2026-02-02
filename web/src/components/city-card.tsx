import Link from 'next/link';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { Card, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { DeletePopover } from '~/components/delete-popover';
import type { City } from '~/lib/zod-schemas';
import { DELETE } from '~/lib/api-utils';

export function CityCard({ city }: { city: City }) {
  const utils = useQueryClient();

  const { mutateAsync: deleteCity } = useMutation({
    mutationFn: (cityId: number) => DELETE(`/api/cities/${cityId}`),
    onSuccess: () => utils.invalidateQueries({ queryKey: ['cities'] }),
    onError: () => toast.error('Hiba történt a város törlése során.'),
  });

  return (
    <Card className="flex flex-col gap-4">
      <CardHeader className="flex items-center gap-2">
        <CardTitle className="text-lg leading-none">{city.name}</CardTitle>

        <Badge variant="secondary" className="w-fit">
          {city.countryCode}
        </Badge>
      </CardHeader>

      <CardFooter className="gap-2">
        <Button asChild>
          <Link href={`/cities/${city.id}`}>Részletek</Link>
        </Button>

        <DeletePopover type="Város" onDelete={() => deleteCity(city.id)} />
      </CardFooter>
    </Card>
  );
}
