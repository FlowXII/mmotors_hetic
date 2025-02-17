import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MoreHorizontal } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { ProductForm } from '../forms/productForm';
import { CategoryForm } from '../forms/categoryForm';
import { Product } from '@/types/Product';
import { Category } from '@/types/Category';
import { useToast } from "@/hooks/use-toast"

const getNumberColumns = (index: number) => {
  if (index > 2) return 'hidden lg:table-cell';
  if (index > 1) return 'hidden md:table-cell';
  if (index > 0) return 'hidden sm:table-cell';
  return '';
};

interface AdminTableProps {
  items: any[];
  columns: string[];
  editItem: (item: any) => void;
  removeItem: (id: string) => void;
  selectedTab: string;
  onAddClick: (data: Product | Category) => void;
  onEditClick: (data: Product | Category) => void;
}

const AdminTable: React.FC<AdminTableProps> = ({ items, columns, editItem, removeItem, selectedTab, onAddClick, onEditClick }) => {
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [currentItem, setCurrentItem] = useState<any>(null);
  const [isProductFormOpen, setIsProductFormOpen] = useState(false);
  const [isCategoryFormOpen, setIsCategoryFormOpen] = useState(false);
  const { toast } = useToast();

  const handleEditClick = (item: any) => {
    setCurrentItem(item); // sélectionne l'élément à modif
    if (selectedTab === 'produits') {
      setIsProductFormOpen(true);  //ouvre ProductForm
    } else if (selectedTab === 'categories') {
      setIsCategoryFormOpen(true);  // ouvre CategoryForm
    }
  };

  const handleDelete = (id: string) => {
    setSelectedItemId(id); 
  };

  const confirmDelete = async () => {
    if (selectedItemId) {
      try {
        await removeItem(selectedItemId); 
        setSelectedItemId(null); 
  
        toast({
          title: "Suppression réussie",
          description: `L'élément a été supprimé avec succès.`,
          variant: "default", 
        });
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Une erreur est survenue lors de la suppression de l'élément.",
          variant: "destructive", 
        });
      }
    }
  };
  
  const handleFormSubmit = async (data: any) => {
    try {
      if (currentItem) {
        await onEditClick({ ...data, id: currentItem.id });
  
        toast({
          title: "Modification réussie",
          description: `L'élément a été modifié avec succès.`,
          variant: "default", 
        });
      } else {
        await onAddClick(data);
  
        toast({
          title: "Ajout réussi",
          description: `L'élément a été ajouté avec succès.`,
          variant: "default", // 
        });
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: `Une erreur est survenue lors de ${currentItem ? "la modification" : "l'ajout"} de l'élément.`,
        variant: "destructive", 
      });
    }
  
    setIsProductFormOpen(false);
    setIsCategoryFormOpen(false);
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col, index) => (
              <TableHead key={index} className={getNumberColumns(index)}>
                {col.charAt(0).toUpperCase() + col.slice(1)}
              </TableHead>
            ))}
            <TableHead>
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item, index) => (
            <TableRow key={index}>
              {columns.map((col, i) => (
                <TableCell key={i} className={getNumberColumns(i)}>
                  {item[col]}
                </TableCell>
              ))}
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => handleEditClick(item)}>
                      Modifier {selectedTab === 'produits' ? 'Produit' : 'Catégorie'}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDelete(item.id)}>
                      Supprimer
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {isProductFormOpen && (
        <ProductForm
          isOpen={isProductFormOpen}
          onClose={() => setIsProductFormOpen(false)}
          onSubmit={handleFormSubmit}
          defaultValues={currentItem || {}}
        />
      )}

      {isCategoryFormOpen && (
        <CategoryForm
          isOpen={isCategoryFormOpen}
          onClose={() => setIsCategoryFormOpen(false)}
          onSubmit={handleFormSubmit}
          defaultValues={currentItem || {}}
        />
      )}

      {/* Dialog pour confirmer la suppression */}
      <AlertDialog open={selectedItemId !== null} onOpenChange={() => setSelectedItemId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setSelectedItemId(null)}>Annuler</AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={confirmDelete}>Supprimer</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AdminTable;