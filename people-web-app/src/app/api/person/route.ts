import { NextRequest, NextResponse } from 'next/server';
import Person from '@/db/models/person';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { name, age } = await req.json();

    if (!name || !age) {
      return NextResponse.json({}, { status: 400 });
    }

    const result = await Person.create({ name, age });

    console.log('[INFO]', `Created ${result.dataValues.name}`);

    return NextResponse.json({ id: result.dataValues.id }, { status: 201 });
  } catch (err) {
    return NextResponse.json({}, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const people = await Person.findAll();

    console.log('[INFO]', `Found ${people.length} people`);

    return NextResponse.json(people, { status: 200 });
  } catch (err) {
    return NextResponse.json({}, { status: 500 });
  }
}
