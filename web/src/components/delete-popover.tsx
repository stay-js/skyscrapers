import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover';
import { Button } from '~/components/ui/button';

export function DeletePopover({ type, onDelete }: { type: string; onDelete: () => void }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="destructive" type="button">
          Törlés
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-6" align="start">
        <div className="flex flex-col gap-1.5">
          <p className="leading-none font-medium">{type} törlése</p>
          <p className="text-sm text-balance text-neutral-400">
            Biztosan törölni szeretnéd? Ez a művelet <b>végleges és visszafordíthatatlan</b>.
          </p>
        </div>

        <Button variant="destructive" type="button" onClick={onDelete}>
          {type} törlése
        </Button>
      </PopoverContent>
    </Popover>
  );
}
