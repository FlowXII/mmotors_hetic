import React, { useState } from 'react';
import {
  Table,
} from '@chakra-ui/react';
import { MoreHorizontal } from 'lucide-react';
import { ProductForm } from '../forms/productForm';
import { CategoryForm } from '../forms/categoryForm';
import { Product } from '@/types/Product';
import {
  MenuRoot,
  MenuTrigger,
  MenuContent,
  MenuItem,
} from '../components/ui/menu';
import {
  DialogRoot,
  DialogTrigger,
  DialogContent,
  DialogCloseTrigger,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
} from '../components/ui/dialog';

const getNumberColumns = (index) => {
  if (index > 2) return { base: 'none', lg: 'table-cell' };
  if (index > 1) return { base: 'none', md: 'table-cell' };
  if (index > 0) return { base: 'none', sm: 'table-cell' };
  return {};
};

const AdminTable = ({ items, columns, editItem, removeItem, selectedTab, onAddClick, onEditClick }) => {
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);
  const [isProductFormOpen, setIsProductFormOpen] = useState(false);
  const [isCategoryFormOpen, setIsCategoryFormOpen] = useState(false);

  const handleEditClick = (item) => {
    setCurrentItem(item);
    selectedTab === 'produits' ? setIsProductFormOpen(true) : setIsCategoryFormOpen(true);
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

      {isProductFormOpen && (
        <ProductForm
          isOpen={isProductFormOpen}
          onClose={() => setIsProductFormOpen(false)}
          onSubmit={onEditClick}
          defaultValues={currentItem || {}}
        />
      )}

      {isCategoryFormOpen && (
        <CategoryForm
          isOpen={isCategoryFormOpen}
          onClose={() => setIsCategoryFormOpen(false)}
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
