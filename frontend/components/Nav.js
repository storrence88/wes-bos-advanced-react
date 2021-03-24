import NavStyles from './styles/NavStyles';
import Link from 'next/link';
import { useUser } from './User';
import SignOut from './SignOut';

const Nav = () => {
  const user = useUser();

  return (
    <NavStyles>
      <Link href='/products'>Products</Link>
      {user && (
        <>
          <Link href='/sell'>Sell</Link>
          <Link href='/orders'>Orders</Link>
          <Link href='/account'>Account</Link>
          <SignOut />
        </>
      )}
      {!user && (
        <>
          <Link href='/signin'>Sign In</Link>
        </>
      )}
    </NavStyles>
  );
};

export default Nav;
