import React, { useState } from 'react';
import {
  Table,
} from '@chakra-ui/react';


import { MoreHorizontal } from 'lucide-react';
import { VehicleForm } from '../forms/VehicleForm';
import { DossierForm } from '../forms/DossierForm';

import {
  MenuRoot,
  MenuTrigger,
  MenuContent,
  MenuItem,
} from './ui/menu';

import {
  DialogRoot,
  DialogTrigger,
  DialogContent,
  DialogCloseTrigger,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
} from './ui/dialog';

const getNumberColumns = (index) => {
  if (index > 2) return { base: 'none', lg: 'table-cell' };
  if (index > 1) return { base: 'none', md: 'table-cell' };
  if (index > 0) return { base: 'none', sm: 'table-cell' };
  return {};
};

const AdminTable = ({ items, columns, editItem, removeItem, selectedTab, onAddClick, onEditClick }) => {
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);
  const [isVehicleFormOpen, setisVehicleFormOpen] = useState(false);
  const [isDossierOpenForm, setisDossierOpenForm] = useState(false);

  const handleEditClick = (item) => {
    setCurrentItem(item);
    selectedTab === 'produits' ? setisVehicleFormOpen(true) : setisDossierOpenForm(true);
  };

  const handleDelete = (id) => {
    setSelectedItemId(id);
  };

  return (
    <>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            {columns.map((col, index) => (
              <Table.ColumnHeader key={index} display={getNumberColumns(index)}>
                {col.charAt(0).toUpperCase() + col.slice(1)}
              </Table.ColumnHeader>
            ))}
            <Table.ColumnHeader>
              <span className="sr-only">Actions</span>
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {items.map((item, index) => (
            <Table.Row key={index}>
              {columns.map((col, i) => (
                <Table.Cell key={i} display={getNumberColumns(i)}>
                  {item[col]}
                </Table.Cell>
              ))}
              <Table.Cell>
                <MenuRoot>
                  <MenuTrigger asChild>
                    <button>
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </MenuTrigger>
                  <MenuContent>
                    <MenuItem onClick={() => handleEditClick(item)}>
                      Modifier {selectedTab === 'produits' ? 'Produit' : 'Catégorie'}
                    </MenuItem>
                    <MenuItem onClick={() => handleDelete(item.id)}>Supprimer</MenuItem>
                  </MenuContent>
                </MenuRoot>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      {isVehicleFormOpen && (
        <VehicleForm
          isOpen={isVehicleFormOpen}
          onClose={() => setisVehicleFormOpen(false)}
          onSubmit={onEditClick}
          defaultValues={currentItem || {}}
        />
      )}

      {isDossierOpenForm && (
        <DossierForm
          isOpen={isDossierOpenForm}
          onClose={() => setisDossierOpenForm(false)}
          onSubmit={onEditClick}
          defaultValues={currentItem || {}}
        />
      )}

      <DialogRoot isOpen={selectedItemId !== null} onClose={() => setSelectedItemId(null)}>
        <DialogTrigger />
        <DialogContent>
          <DialogCloseTrigger />
          <DialogHeader>
            <DialogTitle>Confirmer la suppression</DialogTitle>
          </DialogHeader>
          <DialogBody>
            Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est irréversible.
          </DialogBody>
          <DialogFooter>
            <button onClick={() => setSelectedItemId(null)}>Annuler</button>
            <button className="text-red-500" onClick={() => removeItem(selectedItemId)}>
              Supprimer
            </button>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
    </>
  );
};

export default AdminTable;
