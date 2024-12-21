import {
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';
import Person from '@/models/person';

const people: Person[] = [];

const columns = [
  {
    key: 'id',
    label: 'ID',
  },
  {
    key: 'name',
    label: 'NAME',
  },
  {
    key: 'age',
    label: 'AGE',
  },
];

export default function People() {
  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     setIsClient(true);
  //     fetch('http://localhost:3001/api/person', {
  //       method: 'GET',
  //     })
  //       .then((response) => response.json())
  //       .then((data) => setPeople(data));
  //   }
  // }, []);

  return (
    <p>Hello</p>
    // <Table removeWrapper aria-label="People">
    //   <TableHeader columns={columns}>
    //     {/* {columns.map((column) => (
    //       <TableColumn key={column.key}>{column.label}</TableColumn>
    //     ))} */}
    //     {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
    //   </TableHeader>
    //   <TableBody items={people} emptyContent={'No People to display'}>
    //     {(person) => (
    //       <TableRow key={person.id}>
    //         {(columnKey) => <TableCell>{getKeyValue(person, columnKey)}</TableCell>}
    //       </TableRow>
    //     )}
    //     {/* {people.map((person) => (
    //       <TableRow key={person.id}>
    //         {columns.map((column) => (
    //           <TableCell key={column.key}>{getKeyValue(person, column.key)}</TableCell>
    //         ))}
    //       </TableRow>
    //     ))} */}
    //   </TableBody>
    // </Table>
  );
}
