import React from 'react';
import { Skeleton } from '../ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getNumberColumns } from '@/lib/utils';

const TablePlaceholder: React.FC = () => {
  const placeholderRows = Array.from({ length: 3 });
  const placeholderColumns = Array.from({ length: 4 });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {placeholderColumns.map((_, index) => (
            <TableHead className={getNumberColumns(index)} key={index}>
              <Skeleton className="h-4 w-full" />
            </TableHead>
          ))}
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {placeholderRows.map((_, rowIndex) => (
          <TableRow key={rowIndex}>
            {placeholderColumns.map((_, colIndex) => (
              <TableCell key={colIndex} className={getNumberColumns(colIndex)}>
                <Skeleton className="h-4 w-full" />
              </TableCell>
            ))}
            <TableCell>
              <Skeleton className="h-4 w-1/3" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TablePlaceholder;