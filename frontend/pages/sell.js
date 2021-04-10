import NewProduct from '../components/NewProduct';
import PleaseSignIn from '../components/PleaseSignIn';

const SellPage = () => {
  return (
    <div>
      <PleaseSignIn>
        <NewProduct />
      </PleaseSignIn>
    </div>
  );
};

export default SellPage;
