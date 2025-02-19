import React from 'react';
import { Skeleton } from '@chakra-ui/react';
import { Table } from '@chakra-ui/react';
import { getNumberColumns } from '../utils/utils'; 

const TablePlaceholder: React.FC = () => {
  const placeholderRows = Array.from({ length: 3 });
  const placeholderColumns = Array.from({ length: 4 });

  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          {placeholderColumns.map((_, index) => (
            <Table.ColumnHeader className={getNumberColumns(index)} key={index}>
              <Skeleton height="20px" />
            </Table.ColumnHeader>
          ))}
          <Table.ColumnHeader>
            <span className="sr-only">Actions</span>
          </Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {placeholderRows.map((_, rowIndex) => (
          <Table.Row key={rowIndex}>
            {placeholderColumns.map((_, colIndex) => (
              <Table.Cell key={colIndex} className={getNumberColumns(colIndex)}>
                <Skeleton height="20px" />
              </Table.Cell>
            ))}
            <Table.Cell>
              <Skeleton height="20px" width="33%" />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
      <Table.Footer>
        <Table.Row>
          <Table.Cell>
            <Skeleton height="20px" />
          </Table.Cell>
        </Table.Row>
      </Table.Footer>
    </Table.Root>
  );
};

export default TablePlaceholder;