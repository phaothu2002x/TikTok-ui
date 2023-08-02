import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCableCar, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function AccountItem() {
    return (
        <div className={cx('wrapper')}>
            <img
                className={cx('avatar')}
                src="https://th.bing.com/th/id/OIP.bLEf672a2EQFbBLmQqrPwAHaJQ?pid=ImgDet&rs=1"
                alt="Thuan"
            />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>Truong Vu Thuan</span>
                    <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                </h4>
                <span className={cx('username')}>RyanTruong</span>
            </div>
        </div>
    );
}

export default AccountItem;
