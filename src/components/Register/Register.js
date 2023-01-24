import './Register.css';
import Entrance from '../Entrance/Entrance';


function Register({ onRegister }){

  return (
    <Entrance
      type='signup'
      linkTo='signin'
      title='Добро пожаловать!'
      btnName='Зарегистрироваться'
      subtitle='Уже зарегестрированы?'
      linkName='Войти'
      onSubmit={onRegister}
    >
    </Entrance>
  );
}

export default Register;
