import React from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DialogRoot,
  DialogBackdrop,
  DialogTrigger,
  DialogContent,
  DialogCloseTrigger,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
} from "../components/ui/dialog";
import { Field, Input, Button } from "@chakra-ui/react";
import { categorySchema } from "./geneticForm";

export type CategoryFormValues = z.infer<typeof categorySchema>;

export function CategoryForm({
  onSubmit,
  defaultValues = {
    id: 0,
    name: "",
    products: [],
  },
  isOpen,
  onClose,
}: {
  onSubmit: (data: CategoryFormValues) => void;
  defaultValues?: CategoryFormValues;
  isOpen: boolean;
  onClose: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues,
  });

  return (
    <DialogRoot open={isOpen} onOpenChange={onClose}>
      <DialogBackdrop />
      <DialogContent>
        <DialogCloseTrigger />
        <DialogHeader>
          <DialogTitle>Ajoutez ou modifiez une catégorie</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Field.Root>
              <Field.Label>Nom de la catégorie</Field.Label>
              <Field.RequiredIndicator />
              <Input placeholder="Nom de la catégorie" {...register("name")} />
              <Field.HelperText />
              {errors.name && <Field.ErrorText>{errors.name.message}</Field.ErrorText>}
            </Field.Root>
          </form>
        </DialogBody>
        <DialogFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit(onSubmit)}>
            Enregistrer
          </Button>
          <Button variant="ghost" onClick={onClose}>Annuler</Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
}
