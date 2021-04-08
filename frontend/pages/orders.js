import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import ErrorMessage from '../components/ErrorMessage';
import styled from 'styled-components';
import OrderItemStyles from '../components/styles/OrderItemStyles';
import Head from 'next/head';
import Link from 'next/link';
import formatMoney from '../lib/formatMoney';

const USER_ORDERS_QUERY = gql`
  query USER_ORDERS_QUERY {
    allOrders {
      id
      charge
      total
      user {
        id
      }
      items {
        id
        name
        description
        price
        quantity
        photo {
          image {
            publicUrlTransformed
          }
        }
      }
    }
  }
`;

const OrderUl = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  grid-gap: 4rem;
`;

const countItemsInOrder = (order) => {
  return order.items.reduce((tally, item) => tally + item.quantity, 0);
};

const OrdersPage = () => {
  const { loading, error, data } = useQuery(USER_ORDERS_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <ErrorMessage error={error} />;
  const { allOrders } = data;

  return (
    <div>
      <Head>
        <title>Your Orders ({allOrders.length})</title>
      </Head>
      <h2>You have {allOrders.length} orders!</h2>
      <OrderUl>
        {allOrders.map((order) => (
          <OrderItemStyles key={`order-${order.id}`}>
            <Link href={`/order/${order.id}`}>
              <a>
                <div className='order-meta'>
                  <p>{countItemsInOrder(order)}</p>
                  <p>
                    {order.items.length} Product{order.items.length === 1 ? '' : 's'}
                  </p>
                  <p>{formatMoney(order.total)}</p>
                </div>
                <div className='images'>
                  {order.items.map((item) => (
                    <img
                      key={`image-${item.id}`}
                      src={item?.photo?.image?.publicUrlTransformed}
                      alt={item.name}
                    />
                  ))}
                </div>
              </a>
            </Link>
          </OrderItemStyles>
        ))}
      </OrderUl>
    </div>
  );
};

export default OrdersPage;
