import { type NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

import { db } from '~/server/db';
import { cities } from '~/server/db/schema';
import { citySchema } from '~/lib/zod-schemas';

export async function GET() {
  const cities = await db.query.cities.findMany();

  return NextResponse.json(cities);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const result = citySchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: 'INVALID_REQUEST_BODY', details: result.error },
      { status: 400 },
    );
  }

  await db.insert(cities).values(result.data);

  return NextResponse.json({ message: 'CREATED' }, { status: 201 });
}
