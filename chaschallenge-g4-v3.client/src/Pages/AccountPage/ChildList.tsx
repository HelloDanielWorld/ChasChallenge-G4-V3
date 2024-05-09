//@ts-nocheck
import { useState } from 'react';
import '../../scss/Sass-Pages/_ChildCard.scss';
import BackButton from '../../ResusableComponents/BackButton';

const initialChildren = [
  {
    id: 118836,
    image: 'https://img.pokemondb.net/sprites/home/normal/charmander.png',
    firstName: 'Zoro',
    birthdate: '14 january, 2022',
    sex: 'Pojke',
  },
  {
    id: 118846,
    image: 'https://img.pokemondb.net/sprites/home/normal/wartortle.png',
    firstName: 'Zara',
    birthdate: '12 juni, 2020',
    sex: 'Flicka',
  },
];

export default function ChildList() {
  const [children, setChildren] = useState(initialChildren);

  return (
    <ul className='manage-children'>
      {children.map((child) => (
        <Child child={child} key={child.id} />
      ))}
    </ul>
  );
}

function Child({ child }) {
  return (
    <li className='card column'>
      <div className='row row-divider'>
        <div className='avatar-container'>
          <img className='avatar' src={child.image} />
        </div>

        <div>
          <h3>{child.firstName}</h3>
          <p>
            {child.sex}, född {child.birthdate}.
          </p>
        </div>
      </div>
      <div className='row'>
        <span className='allergy'>Allergi-1</span>
        <span className='allergy'>Allergi-2</span>
      </div>
    </li>
  );
}
