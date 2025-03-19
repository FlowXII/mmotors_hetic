import { useState } from 'react';
import './Select.scss'

type props = {
    name: string;
    options: string[];
    selected: string;
    setSelected: (value: string) => void;
}

export default function Select(props:props) {

  const [open, setOpen] = useState(false)
  const [hover, setHover] = useState(false)

  return (
    <div className='select'>
      <div 
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => setOpen(!open)}
      className='current'>
        <p className='name'>{props.name}</p>
        <p className='selected'>{props.selected}</p>
        <img src='/icons/chevron-down.svg' alt='chevron down' />
      </div>

      <div className={'options' + (open ? ' open' : '')}
      style={{display: hover || open ? 'flex' : 'none'}}
      >
        {props.options.map((option, index) => (
          <div key={index}
           className={'option' + (props.selected === option ? ' selected' : '')}
            onClick={() => {props.setSelected(option); setOpen(false)}}>
            <p>{option}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
