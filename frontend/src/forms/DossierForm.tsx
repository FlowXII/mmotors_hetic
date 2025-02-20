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
import { Field, Input, Button, Select } from "@chakra-ui/react";

import { SelectRoot, SelectTrigger, SelectContent, SelectItem, SelectValueText } from "../components/ui/select";

// Définition du schéma de validation avec Zod
export const DossierTypeSchema = z.enum(["purchase", "rental"]);

export const DossierSchema = z
  .object({
    product_id: z
      .number({
        required_error: "L'ID du produit est requis",
      })
      .positive({ message: "L'ID doit être positif" }),
    dossier_type: DossierTypeSchema,
    down_payment: z.number().optional(),
    loan_amount: z.number().optional(),
    rental_duration: z.number().optional(),
    start_date: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.dossier_type === "purchase") {
      if (data.down_payment === undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Le montant de l'acompte est requis pour un dossier d'achat",
          path: ["down_payment"],
        });
      }
      if (data.loan_amount === undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Le montant du prêt est requis pour un dossier d'achat",
          path: ["loan_amount"],
        });
      }
    }
    if (data.dossier_type === "rental") {
      if (data.rental_duration === undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "La durée de location est requise pour un dossier de location",
          path: ["rental_duration"],
        });
      }
      if (data.start_date === undefined) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "La date de début est requise pour un dossier de location",
          path: ["start_date"],
        });
      }
    }
  });

export type DossierFormValues = z.infer<typeof DossierSchema>;

// Composant DossierForm
export function DossierForm({
  isOpen,
  onClose,
  onSubmit,
  defaultValues,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: DossierFormValues) => Promise<void>;
  defaultValues?: DossierFormValues;
}) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<DossierFormValues>({
    resolver: zodResolver(DossierSchema),
    defaultValues,
  });
  const dossierType = watch("dossier_type");

  return (
    <DialogRoot open={isOpen} onOpenChange={onClose}>
      <DialogBackdrop />
      <DialogContent maxWidth="xl">
        <DialogCloseTrigger />
        <DialogHeader>
          <DialogTitle>
            {defaultValues ? "Modifier un dossier" : "Ajouter un dossier"}
          </DialogTitle>
        </DialogHeader>
        <DialogBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-4">
              {/* Champs communs */}
              <div className="col-span-2 space-y-3">
                <Field.Root>
                  <Field.Label>ID du produit</Field.Label>
                  <Input
                    type="number"
                    {...register("product_id", { valueAsNumber: true })}
                    placeholder="ID du produit"
                  />
                  {errors.product_id && (
                    <Field.ErrorText>
                      {errors.product_id.message}
                    </Field.ErrorText>
                  )}
                </Field.Root>
                <Field.Root>
                  <Field.Label>Type de dossier</Field.Label>
                  <SelectRoot {...register("dossier_type")}>
                    <SelectTrigger>
                      <SelectValueText placeholder="Sélectionner un type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem item={{ value: "purchase", label: "Achat" }}>Achat</SelectItem>
                      <SelectItem item={{ value: "rental", label: "Location" }}>Location</SelectItem>
                    </SelectContent>
                  </SelectRoot>
                  {errors.dossier_type && (
                    <Field.ErrorText>{errors.dossier_type.message}</Field.ErrorText>
                  )}
                </Field.Root>
              </div>

              {/* Section pour dossier d'achat */}
              {dossierType === "purchase" && (
                <div className="col-span-2 space-y-3 border-t pt-4">
                  <h3 className="font-semibold mb-3">Détails d'achat</h3>
                  <Field.Root>
                    <Field.Label>Acompte</Field.Label>
                    <Input
                      type="number"
                      {...register("down_payment", { valueAsNumber: true })}
                      placeholder="Montant de l'acompte"
                    />
                    {errors.down_payment && (
                      <Field.ErrorText>
                        {errors.down_payment.message}
                      </Field.ErrorText>
                    )}
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>Montant du prêt</Field.Label>
                    <Input
                      type="number"
                      {...register("loan_amount", { valueAsNumber: true })}
                      placeholder="Montant du prêt"
                    />
                    {errors.loan_amount && (
                      <Field.ErrorText>
                        {errors.loan_amount.message}
                      </Field.ErrorText>
                    )}
                  </Field.Root>
                </div>
              )}

              {/* Section pour dossier de location */}
              {dossierType === "rental" && (
                <div className="col-span-2 space-y-3 border-t pt-4">
                  <h3 className="font-semibold mb-3">Détails de location</h3>
                  <Field.Root>
                    <Field.Label>Durée de location (mois)</Field.Label>
                    <Input
                      type="number"
                      {...register("rental_duration", { valueAsNumber: true })}
                      placeholder="Durée en mois"
                    />
                    {errors.rental_duration && (
                      <Field.ErrorText>
                        {errors.rental_duration.message}
                      </Field.ErrorText>
                    )}
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>Date de début</Field.Label>
                    <Input
                      type="date"
                      {...register("start_date")}
                      placeholder="Date de début"
                    />
                    {errors.start_date && (
                      <Field.ErrorText>
                        {errors.start_date.message}
                      </Field.ErrorText>
                    )}
                  </Field.Root>
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
