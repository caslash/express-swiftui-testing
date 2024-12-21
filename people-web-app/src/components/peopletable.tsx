'use client';

import {
  getKeyValue,
  Button,
  Table,
  TableBody,
  TableColumn,
  TableCell,
  TableHeader,
  TableRow,
  Tooltip,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/react';
import { PlusIcon } from '@/icons/plus';
import { VerticalDotsIcon } from '@/icons/verticaldots';

import React from 'react';
import Person from '@/models/person';

const columns: { key: string; label: string }[] = [
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
  {
    key: 'actions',
    label: 'Actions',
  },
];

export default function PeopleTable({
  people,
  addPerson,
  deletePerson,
}: Readonly<{ people: Person[]; addPerson: () => void; deletePerson: (id: string) => void }>) {
  const bottomContent = React.useMemo(() => {
    return (
      <div>
        <Button
          onClick={addPerson}
          variant="flat"
          color="primary"
          radius="full"
          endContent={<PlusIcon />}
        >
          Add Person
        </Button>
      </div>
    );
  }, []);

  const renderCell = React.useCallback((person: Person, columnKey: React.Key) => {
    const cellValue = person[columnKey as keyof Person];
    switch (columnKey) {
      case 'actions':
        return (
          //   <div className="relative flex items-center">
          //     <Tooltip color="danger" content="Delete Person">
          //       <span className="text-lg text-danger cursor-pointer">
          //         <DeleteIcon onClick={() => deletePerson(person.id)} />
          //       </span>
          //     </Tooltip>
          //   </div>
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <VerticalDotsIcon className="text-default-300" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem key="edit">Edit</DropdownItem>
                <DropdownItem key="delete" onPress={() => deletePerson(person.id)}>
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table
      aria-label="People"
      isStriped
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
    >
      <TableHeader>
        {columns.map((column) => (
          <TableColumn key={column.key}>{column.label}</TableColumn>
        ))}
      </TableHeader>
      <TableBody emptyContent={'No People to display'}>
        {people.map((person: Person) => (
          <TableRow key={person.id}>
            {(columnKey) => <TableCell>{renderCell(person, columnKey)}</TableCell>}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
