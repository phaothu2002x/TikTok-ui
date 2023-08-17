import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import HeadlessTippy from '@tippyjs/react/headless';
import AccountItem from '~/components/AccountItem';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { useDebounce } from '~/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);

    const debounce = useDebounce(searchValue, 700);

    const inputRef = useRef();

    useEffect(() => {
        if (!debounce.trim()) {
            setSearchResult([]);
            return;
        }
        setLoading(true);

        fetch(`https://tiktok.fullstack.edu.vn/api/users/search?q=${encodeURI(debounce)}&type=less`)
            .then((res) => res.json())
            .then((res) => {
                setSearchResult(res.data);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, [debounce]);

    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };
    const handleHideResult = () => {
        setShowResult(false);
    };
    return (
        <HeadlessTippy
            interactive
            visible={showResult && searchResult.length > 0}
            render={(attrs) => (
                <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                        <h4 className={cx('search-title')}>Accounts</h4>

                        {searchResult.map((result) => (
                            <AccountItem key={result.data} data={result} />
                        ))}
                    </PopperWrapper>
                </div>
            )}
            onClickOutside={handleHideResult}
        >
            <div className={cx('search')}>
                <input
                    ref={inputRef}
                    value={searchValue}
                    spellCheck={false}
                    placeholder="Cat cute Videos"
                    onChange={(e) => setSearchValue(e.target.value)}
                    onFocus={() => setShowResult(true)}
                />

                {/* convert searchValue to bool */}
                {!!searchValue && !loading && (
                    <button className={cx('clear')} onClick={handleClear}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                )}

                {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}

                <button className={cx('search-btn')}>
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </div>
        </HeadlessTippy>
    );
}

export default Search;
