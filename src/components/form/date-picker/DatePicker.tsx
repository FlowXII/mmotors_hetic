import React, { useEffect, useRef, useState } from 'react';
import Button from '../button/Button';
import './DatePicker.scss'
import { useFormContext } from 'react-hook-form';

const DatePicker = ({ type = 'text', placeholder, ...props }:
  { type?: string, placeholder?: string } & React.InputHTMLAttributes<HTMLInputElement>
  , ref: React.Ref<HTMLInputElement>) => {

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSecondDate, setSelectedSecondDate] = useState<Date | null>(null);
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  const { setValue } = useFormContext();

  const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
  const months = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ]


  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [displayedDays, setDisplayedDays] = useState<Date[]>([]);

  const updateDays = (newDate: Date) => {
    const firstDayOfMonth = new Date(newDate.getFullYear(), newDate.getMonth(), 1);
    const lastDayOfMonth = new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0);
  
    let daysArray: Date[] = [];
  
    // Compléter avec les jours du mois précédent jusqu'à lundi
    let startDay = firstDayOfMonth.getDay(); // 0 = Dimanche, 1 = Lundi, ..., 6 = Samedi
    if (startDay === 0) startDay = 7; // Transformer Dimanche (0) en 7 pour simplifier la gestion
  
    for (let i = startDay - 1; i > 0; i--) {
      daysArray.push(new Date(firstDayOfMonth.getFullYear(), firstDayOfMonth.getMonth(), 1 - i));
    }
  
    // Ajouter tous les jours du mois actuel
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      daysArray.push(new Date(newDate.getFullYear(), newDate.getMonth(), i));
    }
  
    // Compléter avec les jours du mois suivant jusqu'au dimanche
    let endDay = lastDayOfMonth.getDay(); // 0 = Dimanche, 1 = Lundi, ..., 6 = Samedi
    let daysToAdd = endDay === 0 ? 0 : 7 - endDay; // Combien de jours à ajouter pour aller jusqu'à dimanche
  
    for (let i = 1; i <= daysToAdd; i++) {
      daysArray.push(new Date(newDate.getFullYear(), newDate.getMonth() + 1, i));
    }
  
    setDisplayedDays(daysArray);
  }

  useEffect(() => {
    updateDays(new Date());
  }, [])

  const updateMonth = (next: boolean) => {
    const newDate = new Date(currentYear, currentMonth + (next ? 1 : -1), 1);
    setCurrentYear(newDate.getFullYear());
    setCurrentMonth(newDate.getMonth());
  
    updateDays(newDate);
  };
  
  const isBefore = (date1: Date, date2: Date) => {
    const date2Copy = new Date(date2);
    date2Copy.setHours(0, 0, 0, 0);
    const date1Copy = new Date(date1);
    date1Copy.setHours(0, 0, 0, 0);
    return date1Copy < date2Copy;
  }

  const isBeforeToday = (day: Date) => {
    return isBefore(day, new Date());
  };

  const isSameDate = (date1: Date, date2: Date) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const handleDateClick = (day: Date) => {
    // si selectedDate n'est pas encore selectionné on va le selectionner
    // sinon on va selectionner selectedSecondDate
    // si selectedSecondDate est déjà selectionné on va le mettre à null et on va modifier selectedDate

    if (!selectedDate) {
      setSelectedDate(day);
    } else if (!selectedSecondDate) {
      setSelectedSecondDate(day);
      setValue("date", selectedDate.toISOString().split('T')[0] + ' / ' + day.toISOString().split('T')[0]);
    } else {
      setSelectedDate(day);
      setSelectedSecondDate(null);
    }
  }

  const isBetWeenDates = (day: Date) => {
    if (selectedDate && selectedSecondDate) {
      return day > selectedDate && day < selectedSecondDate;
    }
    return false;
  }

  return (
    <div 
    style={{zIndex: datePickerOpen ? '100' : '0'}}
    className='date-picker-container'>
        <div className={`text-input date`}
        onClick={() => setDatePickerOpen(true)}
        >
        {placeholder && (
            <label 
            //@ts-ignore
            onClick={() => ref?.current?.focus()} 
            className='focused'
            >
            {placeholder}
            </label>
        )}
        <input
            ref={ref}
            type={type}
            readOnly
            value={(selectedDate?selectedDate.toISOString().split('T')[0]:'Sélectionner une date') + (selectedSecondDate ? ' / ' + selectedSecondDate.toISOString().split('T')[0] : '')}
            {...props} // Permet d'injecter `register()`
        />
        <img className='calendar' src='/icons/calendar-light.svg' alt='calendar' />
        </div>
        {
            datePickerOpen && (
                <div className="date-picker">
                    <div className="close-btn" onClick={() => setDatePickerOpen(false)}>
                    <img src="/icons/cross.svg" alt="Close" />
                    </div>

                    <div className="month-selector">
                        <Button 
                        onClick={() => updateMonth(false)}
                        reverseArrow></Button>
                        <p>
                            {months[currentMonth]} - {currentYear}  
                        </p>
                        <Button
                        onClick={() => updateMonth(true)}
                        ></Button>
                    </div>
                    <div className="day-selector">
                        <div className="days">
                            {
                                days.map((day, index) => (
                                    <p key={index}>{day}</p>
                                ))
                            }

                            {
                                displayedDays.map((day, index) => (
                                    <p 
                                    onClick={() => handleDateClick(day)}
                                    className={`selectable 
                                    ${(selectedDate && isSameDate(day,selectedDate)) || (selectedSecondDate && isSameDate(day,selectedSecondDate)) ? 'selected' : ''} 
                                    ${isBeforeToday(new Date(day)) || day.getMonth() !== currentMonth || (!selectedSecondDate && (selectedDate && isBefore(new Date(day), selectedDate) ) ) ? 'not-selectable' : ''}
                                    ${isBetWeenDates(day) ? 'between-dates' : ''}
                                    ${selectedSecondDate && selectedDate && isSameDate(day,selectedDate) ? 'first-date' : ''}
                                    `}
                                    
                                    key={index}>{day.getDate()}</p>
                                ))
                            }
                        </div>
                        
                    </div>
                </div>
            )
        }    
    </div>
  );
};

// Utilisation de forwardRef pour être compatible avec react-hook-form
export default React.forwardRef(DatePicker);
