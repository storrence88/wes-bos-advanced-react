import Header from './Header';

const Page = ({ children }) => {
  return (
    <div>
      <Header />
      <h2>This is the Page component!</h2>
      {children}
    </div>
  );
};

export default Page;
