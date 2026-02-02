import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';

import { db } from '~/server/db';
import { skyscrapers } from '~/server/db/schema';
import { idParamSchema, skyscraperSchema } from '~/lib/zod-schemas';

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const result = idParamSchema.safeParse(await params);

  if (!result.success) {
    return NextResponse.json(
      { error: 'INVALID_SKYSCRAPER_ID', details: result.error },
      { status: 400 },
    );
  }

  const { id } = result.data;

  const skyscraper = await db.select().from(skyscrapers).where(eq(skyscrapers.id, id)).limit(1);

  if (!skyscraper?.[0]) {
    return new NextResponse(null, { status: 404 });
  }

  return NextResponse.json(skyscraper[0]);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const result = idParamSchema.safeParse(await params);

  if (!result.success) {
    return NextResponse.json(
      { error: 'INVALID_SKYSCRAPER_ID', details: result.error },
      { status: 400 },
    );
  }

  const { id } = result.data;

  const exists = await db.select().from(skyscrapers).where(eq(skyscrapers.id, id)).limit(1);

  if (!exists) {
    return new NextResponse(null, { status: 404 });
  }

  await db.delete(skyscrapers).where(eq(skyscrapers.id, id));

  return new NextResponse(null, { status: 204 });
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const paramResult = idParamSchema.safeParse(await params);

  if (!paramResult.success) {
    return NextResponse.json(
      { error: 'INVALID_SKYSCRAPER_ID', details: paramResult.error },
      { status: 400 },
    );
  }

  const { id } = paramResult.data;

  const body = await request.json();
  const bodyResult = skyscraperSchema.safeParse(body);

  if (!bodyResult.success) {
    return NextResponse.json(
      { error: 'INVALID_REQUEST_BODY', details: bodyResult.error },
      { status: 400 },
    );
  }

  const exists = await db.select().from(skyscrapers).where(eq(skyscrapers.id, id)).limit(1);

  if (!exists) {
    return new NextResponse(null, { status: 404 });
  }

  await db.update(skyscrapers).set(bodyResult.data).where(eq(skyscrapers.id, id));

  return NextResponse.json({ message: 'UPDATED' }, { status: 200 });
}
