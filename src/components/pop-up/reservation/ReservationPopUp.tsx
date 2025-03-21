import { useContext, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '../../form/button/Button.js';
import TextInput from '../../form/text-input/TextInput.js';
import { PopUpContext } from '../../../context/PopUpContext.js';
import DatePicker from '../../form/date-picker/DatePicker.js';

// 🔹 Schéma de validation Zod
const loginSchema = z.object({
  nom: z.string().min(1, "Le nom est requis"),
  prenom: z.string().min(1, "Le prénom est requis"),
  email: z.string().email("L'email est invalide"),
  address: z.string().min(1, "L'adresse est requise"),
  date: z.string().min(1, "La date est requise"),
});

export default function ReservationPopUp() {
  const { setPopUpStatus } = useContext(PopUpContext);
  const [currentStep, setCurrentStep] = useState<'infos' | 'confirmation'>('infos')

  // 🛠️ Configuration du formulaire avec react-hook-form + Zod
  const methods = useForm({
    resolver: zodResolver(loginSchema),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    control
  } = methods

  const getDatesInText = (date: string) => {
    // date sera toujours data.date
    // on veut récupérer les dates de début et de fin en texte avec le jour au début et sans l'année
    // exemple: "Lundi 17 septembre / Vendredi 20 septembre"

    // on split la date pour avoir les deux dates
    const dates = date.split(' / ');
    // on split chaque date pour avoir le jour, le mois et l'année
    const firstDate = dates[0].split('-');
    const secondDate = dates[1].split('-');

    // on crée un objet date pour chaque date
    const firstDateObject = new Date(parseInt(firstDate[0]), parseInt(firstDate[1]), parseInt(firstDate[2]));
    const secondDateObject = new Date(parseInt(secondDate[0]), parseInt(secondDate[1]), parseInt(secondDate[2]));

    // on crée un tableau avec les jours de la semaine
    const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    // on crée un tableau avec les mois
    const months = [
      'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
      'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
    ];
    // on crée un tableau avec les dates en texte
    const firstDateText = `${days[firstDateObject.getDay()]} ${firstDateObject.getDate()} ${months[firstDateObject.getMonth()]}`;
    const secondDateText = `${days[secondDateObject.getDay()]} ${secondDateObject.getDate()} ${months[secondDateObject.getMonth()]}`;

    return `${firstDateText} au ${secondDateText}`;
  }

  const [dateFromForm, setDateFromForm] = useState('');

  // ✅ Fonction de soumission
  const onSubmit = (data:
    { nom: string; prenom: string; email: string; address: string; date: string }
  ) => {
    // si la date est valide on met l'erreur sur la date
    console.log(data)
    if (!data.date.includes(' / ')) {
      console.log(data.date);
      setError("date", { type: "manual", message: "La date est invalide" })
      return;
    }

    const dateSplit = data.date.split(' / ')
    let startingDate;
    let endingDate;
    // sachant que la date est au format aaaa-mm-jj / aaaa-mm-jj
    try{
      startingDate = new Date(dateSplit[0]);
      endingDate = new Date(dateSplit[1]);
    }
    catch (error){
      setError("date", { type: "manual", message: "La date de début est invalide" })
      return;
    }

    console.log(data, startingDate, endingDate);
    setDateFromForm(data.date);
    setCurrentStep('confirmation')
  };

  return (
    <div className='pop-up-container'>
      <div className="pop-up"
      style={{flexDirection: "row", alignItems: "center"}}
      >
        <img className='left-img' src="/gtr.png" alt="" />
        <div className="title"
        style={{width: "50%", height: "100%", alignSelf: "center"}}
        >
          {currentStep === "confirmation" && <img src="/icons/check.svg" alt="check" />}
          <h3
          style={currentStep === 'confirmation' ? {color: "#F3E7E780", fontSize:"0.8rem", fontWeight: "600"} : {}}
          >NISSAN R35 GT-R</h3>
          <div className="content">
            {
              currentStep === "infos" ? (
                <FormProvider
                {...methods}
                >
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <p style={{fontFamily: "Panchang", margin: "1rem 0 0rem 0"}}>Informations personnelles</p>
                    <div className="two-cols">
                      <TextInput {...register("nom")} type='text' placeholder='Nom' />
                      {errors.nom && <p className="error">{errors.nom.message}</p>}

                      <TextInput {...register("prenom")} type='text' placeholder='Prénom' />
                      {errors.prenom && <p className="error">{errors.prenom.message}</p>}
                    </div>
                    <TextInput {...register("email")} type='email' placeholder='Votre adresse email' />
                    {errors.email && <p className="error">{errors.email.message}</p>}

                    <TextInput {...register("address")} type='text' placeholder='Adresse' />
                    {errors.address && <p className="error">{errors.address.message}</p>}

                    <p style={{fontFamily: "Panchang"}}>Dates de réservation</p>
                    <DatePicker {...register("date")} placeholder='Sélectionner une date' />
                    {errors.date && <p className="error">{errors.date.message}</p>}

                    <Button type="submit">SUIVANT</Button>
                  </form>
                </FormProvider>
              )
              : (
                <div
                style={{
                  display:"flex",
                  flexDirection: "column",
                  gap:"1rem",
                  fontFamily: "Panchang",
                }}>
                  <p
                  style={{color:"#F3E7E7CC", fontWeight: "700", fontSize:"1.2rem"}}
                  >Votre résérvation du {getDatesInText(
                      dateFromForm
                    )} a bien été prise en compte.</p>
                  <p
                  style={{color:"#F3E7E780", fontSize:"0.8rem", fontWeight: "600"}}
                  >Récupérez le véhicule à partir de 10h du matin le 17 septembre dans notre agence. </p>
                  <Button>Voir mes réservations</Button>
                  <Button secondary noArrow onClick={() => setPopUpStatus(undefined)}>Fermer</Button>
                </div>
              )
            }
          </div>
        </div>
        <div className="close-btn" onClick={() => setPopUpStatus(undefined)}>
          <img src="/icons/cross.svg" alt="Close" />
        </div>
      </div>
    </div>
  );
}
