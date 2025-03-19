import './PopUp.scss';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { PopUpContext } from '../../../../context/PopUpContext.js';
import Button from '../../../form/button/Button.js';
import TextInput from '../../../form/text-input/TextInput.js';

// 🔹 Schéma de validation Zod
const loginSchema = z.object({
  email: z.string().email("L'email est invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
});

export default function LoginPopUp() {
  const { setPopUpStatus } = useContext(PopUpContext);

  // 🛠️ Configuration du formulaire avec react-hook-form + Zod
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  // ✅ Fonction de soumission
  const onSubmit = (data:
    { email: string; password: string }
  ) => {
    console.log(data);
  };

  return (
    <div className='pop-up-container'>
      <div className="pop-up">
        <div className="title">
          <h3>Connexion</h3>
          <p>Veuillez vous connecter pour continuer.</p>
        </div>
        <div className="content">
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextInput {...register("email")} type='email' placeholder='Votre adresse email' />
            {errors.email && <p className="error">{errors.email.message}</p>}

            <TextInput {...register("password")} type='password' placeholder='Votre mot de passe' />
            {errors.password && <p className="error">{errors.password.message}</p>}

            <Button type="submit">ME CONNECTER</Button>
          </form>
          <div className="separator">
            <div className="line"/>
            <span>OU</span>
            <div className="line"/>
          </div>
          <p className='other-method'>Pas encore de compte? <a href="#" onClick={(e) => {e.preventDefault(); setPopUpStatus('register')}}>M'inscrire</a></p>
        </div>
        <div className="close-btn" onClick={() => setPopUpStatus(undefined)}>
          <img src="/icons/cross.svg" alt="Close" />
        </div>
      </div>
    </div>
  );
}
