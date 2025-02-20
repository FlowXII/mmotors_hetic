import React, { FC } from "react";
import { Card, CardHeader, CardBody, CardFooter, Heading, Skeleton, Box } from "@chakra-ui/react";
import AdminTable from "./AdminTable";
import { AdminCardProps } from "../types/AdminCardProps";
import TablePlaceholder from "./TablePlaceHolder";

const AdminCard: FC<AdminCardProps> = ({
  selectedTab,
  items,
  loading,
  error,
  addItem,
  editItem,
  removeItem,
}) => {
  const columns = items.length > 0 ? Object.keys(items[0]) : [];
  
  return (
    <Card>
      <CardHeader>
        <Heading as="h3" size="md">
          {selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1)}
        </Heading>
      </CardHeader>
      <CardBody>
        {loading ? (
          <TablePlaceholder />
        ) : error ? (
          <Box>Error: {error.message}</Box>
        ) : (
          <AdminTable
            items={items}
            columns={columns}
            selectedTab={selectedTab}
            onAddClick={addItem}
            onEditClick={(data) => editItem(data.id?.toString() || "", data)}
            editItem={(id) => editItem(id, {})}
            removeItem={removeItem}
          />
        )}
      </CardBody>
      <CardFooter>
        <Box fontSize="xs">
          {loading ? (
            <Skeleton width="16" height="3" />
          ) : (
            <>
              Affiche <strong>{items.length}</strong> {selectedTab}
            </>
          )}
        </Box>
      </CardFooter>
    </Card>
  );
};

export default AdminCard;