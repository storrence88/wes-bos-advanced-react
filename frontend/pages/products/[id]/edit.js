import UpdateProduct from '../../../components/UpdateProduct';

const EditProductPage = ({ query }) => {
  return <UpdateProduct id={query.id} />;
};

export default EditProductPage;
