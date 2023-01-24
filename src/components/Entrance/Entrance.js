import './Entrance.css';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import useFormAndValidation from '../../hooks/useFormAndValidation';
import { useEffect } from 'react'


function Entrance({
  type,
  linkTo,
  title,
  btnName,
  subtitle,
  linkName,
  onSubmit,
 }) {

  const {values, errors, isValid, handleChange} = useFormAndValidation();

  // убираем показ блока InfoMessage при загрузке страницы
  useEffect(() => {
    console.count("ENNRANCE - hide message error")
  }, [])


  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(values.name, values.password)
  }

  return (
    <section className='entrance'>
      <Logo />
      <h2 className='entrance__title'>{title}</h2>
      <form className='entrance__form' onSubmit={handleSubmit}>
        <label className='entrance__label'>Имя
          <input
            id='name'
            type='text'
            className='entrance__input'
            name='name'
            minLength='2'
            maxLength='30'
            required
            pattern='^[A-Za-zА-Яа-яЁё\s\-]+$'
            value={values.name || ''} // Чтобы Реакт не ругался в консоли на пустые поля
            onChange={handleChange}
          />
          <span id='name-error' className='entrance__error'>
            {errors.name ? `Поле должно быть заполнено и может содержать только латиницу,
              кириллицу, пробел или дефис` : ''}
          </span>
        </label>
        <label className='entrance__label'>Пароль
          <input
            id='password'
            type='password'
            className='entrance__input'
            name='password'
            minLength='4'
            maxLength='20'
            required
            value={values.password || ''}
            onChange={handleChange}
          />
          <span id='password-error' className='entrance__error'>
            {errors.password || ''}
          </span>
        </label>

        <button
          className='entrance__submit-btn app__link'
          type='submit'
          disabled={!isValid}
        >
          {btnName}
        </button>
        <p className='entrance__subtitle'>{subtitle}
          <Link to={linkTo} className='entrance__link app__link'>{linkName}</Link>
        </p>
      </form>
    </section>
  );
}

export default Entrance;
