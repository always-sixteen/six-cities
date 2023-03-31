import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { logoutAction } from '../../store/api-actions';
import { getAuthorizationStatus, getUserData } from '../../store/user-process/selectors';
import Logo from '../logo/logo';


function Header(): JSX.Element {
  const isAuth = useAppSelector(getAuthorizationStatus) === AuthorizationStatus.Auth;
  const {email, avatarUrl} = useAppSelector(getUserData);

  const dispatch = useAppDispatch();

  const authorizationStatusTrue = () => (
    <>
      <li className="header__nav-item user">
        <Link
          to={AppRoute.Favorites}
          className="header__nav-link header__nav-link--profile"
        >
          <div
            style={{backgroundImage: `url(${avatarUrl})`}}
            className="header__avatar-wrapper user__avatar-wrapper"
          >
          </div>
          <span className="header__user-name user__name">{email}</span>
        </Link>
      </li>
      <li className="header__nav-item">
        <Link
          onClick={(evt) => {
            evt.preventDefault();
            dispatch(logoutAction());
          }}
          className="header__nav-link"
          to='/'
        >
          <span className="header__signout">Sign out</span>
        </Link>
      </li>
    </>
  );

  const authorizationStatusFalse = () => (
    <li className="header__nav-item user">
      <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
        <div className="header__avatar-wrapper user__avatar-wrapper">
        </div>
        <span className="header__login">Sign in</span>
      </Link>
    </li>
  );

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo />
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {isAuth
                ? authorizationStatusTrue()
                : authorizationStatusFalse()}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
