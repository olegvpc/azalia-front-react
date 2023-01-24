import React, { useState, useEffect } from 'react';
import './Messages.css';
import MessageString from '../MessageString/MessageString'
import useFormAndValidation from '../../hooks/useFormAndValidation'

// import { getAllMovies } from '../../utils/MoviesApi';

function Messages({ onSubmit, allCurrentMessages }) {

  const {values, errors, isValid, handleChange, resetForm} = useFormAndValidation();

   function handleSubmit(e) {
    e.preventDefault();
    onSubmit(values.mess, values.author)
    resetForm()
  }

  return (
    <section className='messages'>
      <h2 className='mess__title'>Новое сообщение</h2>
      <form className='mess__form' onSubmit={handleSubmit}>
        <label className='mess__label'>Текст сообщения
          <input
            id='mess'
            type='text'
            className='mess__input'
            name='mess'
            minLength='2'
            maxLength='150'
            required
            pattern='^[A-Za-zА-Яа-яЁё\s\-]+$'
            value={values.mess || ''} // Чтобы Реакт не ругался в консоли на пустые поля
            onChange={handleChange}
          />
          <span id='name-error' className='mess__error'>
            {errors.mess ? `Поле должно быть заполнено и может содержать только латиницу,
              кириллицу, пробел или дефис` : ''}
          </span>
        </label>
        <label className='mess__label'>Автор
          <input
            id='author'
            type='text'
            className='mess__input'
            name='author'
            minLength='2'
            maxLength='30'
            required
            pattern='^[A-Za-zА-Яа-яЁё\s\-]+$'
            value={values.author || ''} // Чтобы Реакт не ругался в консоли на пустые поля
            onChange={handleChange}
          />
          <span id='name-error' className='mess__error'>
            {errors.author ? `Поле должно быть заполнено и может содержать только латиницу,
              кириллицу, пробел или дефис` : ''}
          </span>
        </label>
        <button
          className='mess__submit-btn app__link'
          type='submit'
          disabled={!isValid}
        >
          Разместить сообщение
        </button>
      </form>
      <div className='title-message'>
        <text>текст сообщения</text>
        <span>автор сообщения</span>
      </div>
      {allCurrentMessages.map((item) => {
        return (
            <MessageString
              key={item._id}
              message={item}
            />
        )
      })
      }
    </section>
  );
}

export default Messages;
