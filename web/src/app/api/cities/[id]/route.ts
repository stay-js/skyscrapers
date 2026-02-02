import { type NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';

import { db } from '~/server/db';
import { cities } from '~/server/db/schema';
import { citySchema, idParamSchema } from '~/lib/zod-schemas';

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const result = idParamSchema.safeParse(await params);

  if (!result.success) {
    return NextResponse.json({ error: 'INVALID_CITY_ID', details: result.error }, { status: 400 });
  }

  const { id } = result.data;

  const city = await db.query.cities.findFirst({ where: eq(cities.id, id) });

  if (!city) {
    return new NextResponse(null, { status: 404 });
  }

  return NextResponse.json(city);
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const result = idParamSchema.safeParse(await params);

  if (!result.success) {
    return NextResponse.json({ error: 'INVALID_CITY_ID', details: result.error }, { status: 400 });
  }

  const { id } = result.data;

  const exists = await db.query.cities.findFirst({ where: eq(cities.id, id) });

  if (!exists) {
    return new NextResponse(null, { status: 404 });
  }

  await db.delete(cities).where(eq(cities.id, id));

  return new NextResponse(null, { status: 204 });
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const paramResult = idParamSchema.safeParse(await params);

  if (!paramResult.success) {
    return NextResponse.json(
      { error: 'INVALID_CITY_ID', details: paramResult.error },
      { status: 400 },
    );
  }

  const { id } = paramResult.data;

  const body = await request.json();
  const bodyResult = citySchema.safeParse(body);

  if (!bodyResult.success) {
    return NextResponse.json(
      { error: 'INVALID_REQUEST_BODY', details: bodyResult.error },
      { status: 400 },
    );
  }

  const exists = await db.query.cities.findFirst({ where: eq(cities.id, id) });

  if (!exists) {
    return new NextResponse(null, { status: 404 });
  }

  await db.update(cities).set(bodyResult.data).where(eq(cities.id, id));

  return NextResponse.json({ message: 'UPDATED' }, { status: 200 });
}
