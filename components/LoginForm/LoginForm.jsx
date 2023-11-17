import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './LoginForm.module.css';
import cn from 'classnames';
import { useForm } from 'react-hook-form';
import Icon from '../Icon/Icon';
import Helper from '../Helper/Helper';

const LoginForm = ({ fetch, ...props }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [isRemember, setIsRemember] = useState(false)

  useEffect(() => {
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth) {
      setIsSuccess(true);
    }
  }, []);

  const onSubmit = async (data) => {
    try {
      const response = await fetch('https://api.example.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      console.log(responseData);
      console.log(data)
      if (data.email === 'example@example.ru' && data.password === 'qwerty123') {
        setError(null)
        setIsSuccess(true);
        
        if (isRemember) {
          localStorage.setItem('auth', 'true');
        }
        reset()
      } else {
        setIsSuccess(false);
        setError('Неверный логин или пароль');
      }
    } catch (error) {
      console.error(error);
      setError('Произошла ошибка при входе. Пожалуйста, повторите попытку.');
    }
  };

  const handleRememberChange = (e) => {
    setIsRemember(e.target.checked);
  };

  const logOut = () => {
    setIsSuccess(false);

    localStorage.removeItem('auth');
  }

  return (
    <div>
      {isSuccess ? (
        <div className={cn(styles.success, styles.panel)}>
          <h2 className={styles.successTitle}>Вход выполнен успешно</h2>
          <button onClick={logOut} className={styles.button}>
            <Icon className={cn(styles.icon)} iconPath={'/log-out.svg'} />
            Выйти
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className={cn(styles.loginForm)} {...props}>
          <h1>
            Авторизация
          </h1>
          <div className={cn(styles.inputWrapper)}>
            <div className={styles.iconWrapper}>
            <Icon className={cn(styles.icon)} iconPath={'/mail.svg'} />
              <input
                className={cn(styles.input)}
                {...register('email', { required: 'Email обязателен' })}
                type="text"
                placeholder="Email"
              />
            </div>
            {errors.email && <p className={cn(styles.error)}>{errors.email.message}</p>}
          </div>
          <div className={cn(styles.inputWrapper)}>
            <div className={styles.iconWrapper}>
            <Icon className={cn(styles.icon)} iconPath={'/password.svg'} />
              <input
                className={cn(styles.input)}
                {...register('password', { required: 'Пароль обязателен' })}
                type="password"
                placeholder="Пароль"
              />
            </div>
            {errors.password && <p className={cn(styles.error)}>{errors.password.message}</p>}
          </div>
          <div className={cn(styles.submit, styles.inputWrapper)}>
            <div className={styles.checkboxWrapper}>
              <input 
                type="checkbox" 
                className={styles.checkbox} 
                onChange={handleRememberChange}
                checked={isRemember}
              />
              Запомнить меня
            </div>
            <button type="submit" className={styles.button}>
              <Icon className={cn(styles.icon)} iconPath={'/log-in.svg'} />
              Войти
            </button>
            {error && (
            <div className={cn(styles.error, styles.panel)}>
              {error}
            </div>
          )}
          </div>
          <Helper />
        </form>
      )}
    </div>
  );
};

LoginForm.propTypes = {
  fetch: PropTypes.func
};

export default LoginForm;