import { type NextRequest, NextResponse } from 'next/server';

import { db } from '~/server/db';
import { skyscrapers } from '~/server/db/schema';
import { skyscraperSchema } from '~/lib/zod-schemas';

export async function GET() {
  const skyscrapers = await db.query.skyscrapers.findMany();

  return NextResponse.json(skyscrapers);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const result = skyscraperSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: 'INVALID_REQUEST_BODY', details: result.error },
      { status: 400 },
    );
  }

  await db.insert(skyscrapers).values(result.data);

  return NextResponse.json({ message: 'CREATED' }, { status: 201 });
}
