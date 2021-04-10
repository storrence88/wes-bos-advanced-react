import { useUser } from './User';
import SignIn from './SignIn';

const PleaseSignIn = ({ children }) => {
  const current_user = useUser();
  if (!current_user) return <SignIn />;

  return children;
};

export default PleaseSignIn;
