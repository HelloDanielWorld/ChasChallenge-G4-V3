// @ts-nocheck
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import HeaderWithBackButton from '../../../ResusableComponents/HeaderWithBackButton.tsx';
import '../../../scss/Sass-Pages/_AddKidsPage.scss';
import { Multiselect } from 'multiselect-react-dropdown';

// Define the structure of a single allergy
const allergies = [
  'Celiaki/gluten',
  'Fisk',
  'Jordnötter',
  'Laktos',
  'Lupin',
  'Mjölprotein',
  'Nötter och Mandel',
  'Selleri',
  'Senap',
  'Sesamfrö och övriga fröer',
  'Skaldjur',
  'Soja',
  'Sulfiter',
  'Tillsatser',
  'Vete/Spannmål',
  'Ägg',
];

function Button({ onClick, children }) {
  return <button onClick={onClick}>{children}</button>;
}

function FetchAvatarDropdown({ onAvatarChange }) {
  const [avatars, setAvatars] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState({
    name: '',
    url: '',
  });

  useEffect(() => {
    const fetchAvatars = async () => {
      try {
        const response = await axios.get(
          'https://pokeapi.co/api/v2/pokemon?limit=50'
        );
        const avatarData = await Promise.all(
          response.data.results.map(async (pokemon) => {
            const detail = await axios.get(pokemon.url);
            return {
              name: pokemon.name,
              url: detail.data.sprites.front_default,
            };
          })
        );
        setAvatars(avatarData);
      } catch (error) {
        console.error('Failed to fetch avatars:', error);
      }
    };
    fetchAvatars();
  }, []);

  const handleSelect = (avatar) => {
    setSelectedAvatar(avatar);
    onAvatarChange(avatar.url);
    setIsModalOpen(false); // Close modal after selection
  };

  const openModal = () => setIsModalOpen(true);
  //onst closeModal = () => setIsModalOpen(false);

  return (
    <div className='avatar-dropdown'>
      <div className='avatar-display' onClick={openModal}>
        {selectedAvatar.url ? (
          <img
            src={selectedAvatar.url}
            alt={selectedAvatar.name}
            className='avatar-img'
          />
        ) : (
          <div className='avatar-placeholder'>Välj avatar</div>
        )}
      </div>

      {isModalOpen && (
        <div className='avatar-modal'>
          <HeaderWithBackButton
            title='Välj avatar'
            customBackAction={() => setIsModalOpen(false)}
          />
          <div className='avatar-grid'>
            {avatars.map((avatar, index) => (
              <div
                key={index}
                className='avatar-item'
                onClick={() => handleSelect(avatar)}
              >
                <img
                  src={avatar.url}
                  alt={avatar.name}
                  className='avatar-image'
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function AllergiesDropdown({ register }) {
  const [selectedValues, setSelectedValues] = useState([]);

  const onSelect = (selectedList, selectedItem) => {
    setSelectedValues(selectedList);
    register({ name: `allergies.${selectedItem}`, value: true });
  };

  const onRemove = (selectedList, removedItem) => {
    setSelectedValues(selectedList);
    register({ name: `allergies.${removedItem}`, value: false });
  };

  return (
    <div className='allergies-dropdown'>
      <Multiselect
        options={allergies}
        isObject={false}
        selectedValues={selectedValues}
        onSelect={onSelect}
        onRemove={onRemove}
        placeholder='Allergier, om några'
      />
    </div>
  );
}

function ChildDataForm() {
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      allergies: {},
    },
  });
  const onSubmit = (data) => {
    // Transforming the allergies data from object to array
    const selectedAllergies = Object.entries(data.allergies)
      .filter(([key, value]) => value)
      .map(([key]) => key);
    console.log('Selected Allergies:', selectedAllergies);
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FetchAvatarDropdown onAvatarChange={(url) => setValue('avatar', url)} />
      <input
        className='input-field'
        type='text'
        placeholder='Förnamn / smeknamn'
        {...register('name', { required: true })}
      />
      <select className='select-field' {...register('gender')}>
        <option value='Pojke'>Pojke</option>
        <option value='Flicka'>Flicka</option>
        <option value='Binär'>Binär</option>
      </select>
      <input
        className='input-field'
        type='number'
        placeholder='Födelsedatum'
        {...register('birthDate')}
      />
      <AllergiesDropdown register={register} />
      <Button>Spara barn</Button>
    </form>
  );
}

export default function AddKidsPage() {
  return (
    <>
      <HeaderWithBackButton title='Lägg till barn' />
      <main>
        <ChildDataForm />
      </main>
    </>
  );
}
