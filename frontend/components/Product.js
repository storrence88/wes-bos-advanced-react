import formatMoney from '../lib/formatMoney';
import ItemStyles from './styles/ItemStyles';
import Title from './styles/Title';
import PriceTag from './styles/PriceTag';
import Link from 'next/link';
import DestroyProduct from './DestroyProduct';
import AddToCart from './AddToCart';

const Product = ({ product }) => {
  return (
    <ItemStyles>
      <img src={product?.photo?.image?.publicUrlTransformed} alt={product.name} />
      <Title>
        <Link href={`/product/${product.id}`}>{product.name}</Link>
      </Title>
      <PriceTag>{formatMoney(product.price)}</PriceTag>
      <p>{product.description}</p>
      <div className='buttonList'>
        <Link href={`/product/${product.id}/edit`}>Edit ✏️</Link>
        <AddToCart id={product.id} />
        <DestroyProduct id={product.id}>Delete</DestroyProduct>
      </div>
    </ItemStyles>
  );
};

export default Product;
