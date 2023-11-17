import PropTypes from 'prop-types';
import styles from './Helper.module.css';

const Helper = () => {
    return (
        <div className={styles.helper}>
            <h3>
                Для входа используйте:
            </h3>
            <ul>
                <li>
                    Логин <span>example@example.ru</span>
                </li>
                <li>
                    Пароль <span>qwerty123</span>
                </li>
            </ul>
        </div>
    )
}

Helper.propTypes = {
    className: PropTypes.string
};

export default Helper