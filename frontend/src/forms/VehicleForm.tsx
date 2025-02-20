// VehicleForm.tsx
import React from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DialogRoot,
  DialogBackdrop,
  DialogContent,
  DialogCloseTrigger,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
} from "../components/ui/dialog";
import { Field, Input, Button, Textarea } from "@chakra-ui/react";
import {
  SelectContent,
  SelectRoot,
  SelectItem,
  SelectTrigger,
  SelectValueText,
} from "../components/ui/select";
import { Checkbox } from "../components/ui/checkbox";
import {
  VehicleTypeSchema,
  ProductSchema,
  type VehicleFormValues,
} from "../forms/schemas";

export function VehicleForm({
  isOpen,
  onClose,
  onSubmit,
  defaultValues,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: VehicleFormValues) => Promise<void>;
  defaultValues?: VehicleFormValues;
}) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<VehicleFormValues>({
    resolver: zodResolver(ProductSchema),
    defaultValues,
  });
  const isForRent = watch("is_for_rent");
  const dossierType = watch("dossier_type");
  return (
    <DialogRoot open={isOpen} onOpenChange={onClose}>
      <DialogBackdrop />
      <DialogContent>
        <DialogCloseTrigger />
        <DialogHeader>
          <DialogTitle>
            {defaultValues ? "Modifier un véhicule" : "Ajouter un véhicule"}
          </DialogTitle>
        </DialogHeader>
        <DialogBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Form content */}
            <div className="grid grid-cols-2 gap-4">
              {/* Section Véhicule */}
              <div className="col-span-2 space-y-3">
                <Field.Root>
                  <Field.Label>Nom du véhicule</Field.Label>
                  <Input {...register("name")} placeholder="Nom du véhicule" />
                  {errors.name && (
                    <Field.ErrorText>{errors.name.message}</Field.ErrorText>
                  )}
                </Field.Root>
                {/* Other fields... */}
              </div>
              {/* Conditional Location Section */}
              {isForRent && (
                <div className="col-span-2 border-t pt-4">
                  <h3 className="font-semibold mb-3">Détails de location</h3>
                  {/* Rental details fields */}
                </div>
              )}
            </div>
            <DialogFooter className="mt-6">
              <Button colorScheme="blue" mr={3} type="submit">
                Enregistrer
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Annuler
              </Button>
            </DialogFooter>
          </form>
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  );
}

export type { VehicleFormValues };
