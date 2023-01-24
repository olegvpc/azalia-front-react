import './Profile.css';
import React from 'react'
import { CurrentUserContext } from '../../contexts/CurrentUserContext';


function Profile({ onSignOut }) {

  const currentUser = React.useContext(CurrentUserContext);


  return (
    <section className='profile'>
      <div className='profile__box'>
        <h2 className='profile__title'>{`Привет, ${currentUser.name}!`}</h2>
        <form className='profile__form'>
          <label className='profile__label'>Имя
            <input
              value={currentUser.name}
              // onChange={handleChange}
              type='text'
              className='profile__input'
              name='name'
              minLength='2'
              maxLength='30'
              required
              title='Разрешено использовать латиницу, кириллицу, пробел или дефис'
              pattern='^[A-Za-zА-Яа-яЁё /s -]+$'
              id='name'
              disabled={true}
            />
          </label>

          <button
            className='profile__btn profile__btn_type_logout app__link'
            type='button'
            onClick={onSignOut}
          >
            Выйти из аккаунта
          </button>
        </form>
      </div>

    </section>
  );
}

export default Profile;