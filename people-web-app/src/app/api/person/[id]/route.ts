import type { NextApiRequest, NextApiResponse } from 'next';
import Person from '@/db/models/person';
import { validate, version } from 'uuid';
import { NextResponse } from 'next/server';

export async function GET(req: NextApiRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = (await params).id;
    if (!validate(id) || version(id) !== 4)
      return NextResponse.json({}, { status: 400, statusText: `${id} id not a valid uuid4` });

    const result = await Person.findOne({ where: { id } });

    if (result) {
      const { id, name, age } = result.dataValues;

      console.log('[INFO]', `Found ${name}`);

      return NextResponse.json({ id, name, age }, { status: 200 });
    }

    return NextResponse.json(
      {},
      { status: 404, statusText: `Person with id ${id} could not be found` },
    );
  } catch (err) {
    return NextResponse.json({}, { status: 500 });
  }
}

export async function PUT(req: NextApiRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = (await params).id;
    if (!validate(id) || version(id) !== 4)
      return NextResponse.json({}, { status: 400, statusText: `${id} id not a valid uuid4` });

    const { name, age } = req.body;

    await Person.update({ name, age }, { where: { id } });

    console.log('[INFO]', `Updated ${name}`);

    return NextResponse.json({}, { status: 200 });
  } catch (err) {
    return NextResponse.json({}, { status: 500 });
  }
}

export async function DELETE(req: NextApiRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = (await params).id;
    if (!validate(id) || version(id) !== 4)
      return NextResponse.json({}, { status: 400, statusText: `${id} id not a valid uuid4` });

    const count = await Person.destroy({ where: { id } });

    if (count > 0) {
      console.log('[INFO]', `Removed ${id}`);
      return NextResponse.json({}, { status: 204 });
    }

    return NextResponse.json(
      {},
      { status: 404, statusText: `Person with id ${id} could not be found` },
    );
  } catch (err) {
    return NextResponse.json({}, { status: 500 });
  }
}
