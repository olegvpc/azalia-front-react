import './Footer.css';

function Footer() {

  return (
      <footer className='footer'>
        <h4 className='footer__title'>Тестовое задание от Азалия.</h4>
        <div className='footer__box'>
          <p className='footer__copyright'> &copy; 2023</p>
          <ul className='footer__links'>
            <li className='footer__item'>
              <a className='footer__link app__link' href='https://olegvpc.ru/about/author/' target='_blank' rel='noopener noreferrer'>Ткач Олег</a>
            </li>
            <li className='footer__item'>
              <a className='footer__link app__link' href='https://github.com/olegvpc' target='_blank' rel='noopener noreferrer'>Github</a>
            </li>
          </ul>
        </div>
      </footer>
  );
}

export default Footer;
