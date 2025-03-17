import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { PopUpContext } from '../../../../context/PopUpContext';
import Button from '../../../form/button/Button.jsx';
import TextInput from '../../../form/text-input/TextInput.jsx';

// Schéma de validation avec Zod
const schema = z.object({
  firstName: z.string().min(1, "Le prénom est requis"),
  lastName: z.string().min(1, "Le nom est requis"),
  email: z.string().email("E-mail invalide"),
  phone: z.string().optional(),
  address: z.string().min(1, "L'adresse est requise"),
  postalCode: z.string().min(1, "Code postal requis"),
  city: z.string().min(1, "Ville requise"),
  password: z.string().min(6, "Mot de passe trop court"),
  confirmPassword: z.string().min(6, "Confirmation requise"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

export default function RegisterPopUp() {
  const { setPopUpStatus } = useContext(PopUpContext);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data); // Affiche les valeurs du formulaire
  };

  return (
    <div className='pop-up-container'>
      <div className="pop-up">
        <div className="title">
          <h3>Inscription</h3>
          <p>Veuillez remplir le formulaire pour vous inscrire.</p>
        </div>
        <div className="content">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="two-cols">
              <TextInput {...register("firstName")} type='text' placeholder='Prénom' />
              <TextInput {...register("lastName")} type='text' placeholder='Nom' />
            </div>
            <div className="two-cols">
              <TextInput {...register("email")} type='email' placeholder='E-mail' />
              <TextInput {...register("phone")} type='tel' placeholder='Téléphone' />
            </div>
            <TextInput {...register("address")} type='text' placeholder='Adresse' />
            <div className="two-cols">
              <TextInput {...register("postalCode")} type='text' placeholder='Code postal' />
              <TextInput {...register("city")} type='text' placeholder='Ville' />
            </div>
            <div className="two-cols">
              <TextInput {...register("password")} type='password' placeholder='Mot de passe' />
              <TextInput {...register("confirmPassword")} type='password' placeholder='Confirmer mon mot de passe' />
            </div>
            <Button type="submit">M'inscrire</Button>
          </form>
          <div className="separator">
            <div className="line" />
            <span>OU</span>
            <div className="line" />
          </div>
          <p className='other-method'>
            J'ai déjà un compte? <a href="#" onClick={(e) => {e.preventDefault(); setPopUpStatus('login')}}>Me connecter</a>
          </p>
        </div>
        <div className="close-btn" onClick={() => setPopUpStatus(undefined)}>
          <img src="/icons/cross.svg" alt="Close" />
        </div>
      </div>
    </div>
  );
}
