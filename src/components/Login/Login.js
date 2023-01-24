import './Login.css';
import Entrance from "../Entrance/Entrance";

function Login({ onLogin }){

  return (
    <Entrance
      type='signin'
      linkTo='signup'
      title='Рады видеть!'
      btnName='Войти'
      subtitle='Ещё не зарегистрированы?'
      linkName='Регистрация'
      onSubmit={onLogin}
    />
  );
}

export default Login;
