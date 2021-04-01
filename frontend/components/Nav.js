import NavStyles from './styles/NavStyles';
import Link from 'next/link';
import { useUser } from './User';
import SignOut from './SignOut';
import { useCart } from '../lib/cartState';
import CartCount from './CartCount';

const Nav = () => {
  const user = useUser();
  const { openCart } = useCart();
  const itemCount = user?.cart?.reduce((tally, cartItem) => tally + cartItem.quantity, 0);

  return (
    <NavStyles>
      <Link href='/products'>Products</Link>
      {user && (
        <>
          <Link href='/sell'>Sell</Link>
          <Link href='/orders'>Orders</Link>
          <Link href='/account'>Account</Link>
          <SignOut />
          <button type='button' onClick={openCart}>
            My Cart <CartCount count={itemCount} />
          </button>
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
