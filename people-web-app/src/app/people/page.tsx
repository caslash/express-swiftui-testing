import { revalidatePath } from 'next/cache';

import Person from '@/models/person';

import PeopleTable from '@/components/peopletable';

const addPerson = async () => {
  'use server';
  await fetch('http://localhost:3001/api/person', {
    method: 'POST',
    body: JSON.stringify({
      name: 'Marcus',
      age: 27,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  revalidatePath('/people');
};

const deletePerson = async (id: string) => {
  'use server';
  await fetch(`http://localhost:3001/api/person/${id}`, {
    method: 'DELETE',
  });
  revalidatePath('/people');
};

export default async function People() {
  const data = await fetch('http://localhost:3001/api/person', { method: 'GET' });
  const people: Person[] = await data.json();

  if (!people) return <div>Loading...</div>;

  return (
    <div>
      <PeopleTable people={people} addPerson={addPerson} deletePerson={deletePerson} />
    </div>
  );
}
