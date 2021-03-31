import { KeystoneContext } from '@keystone-next/types';
import { CartItemCreateInput } from '../.keystone/schema-types';
import { Session } from '../types';

export default async function addToCart(
  root: any,
  { productId }: { productId: string },
  context: KeystoneContext
): Promise<CartItemCreateInput> {
  // 1. Query the current_user to see if they are signed in
  const userSession = context.session as Session;
  if (!userSession.itemId) {
    throw new Error('You must be logged in to do this!');
  }

  // 2. Query the current_user's cart
  const allCartItems = await context.lists.CartItem.findMany({
    where: { user: { id: userSession.itemId }, product: { id: productId } },
    resolveFields: 'id,quantity'
  });

  // 3. See if the current item is in their cart
  const [existingCartItem] = allCartItems;
  if (existingCartItem) {
    console.log(`There are already ${existingCartItem.quantity}, increment by 1!`);

    // 4a. If it is, increment by 1
    return await context.lists.CartItem.updateOne({
      id: existingCartItem.id,
      data: { quantity: existingCartItem.quantity + 1 }
    });
  }

  // 4b. If it isn't, create a new cart item
  return await context.lists.CartItem.createOne({
    data: {
      product: { connect: { id: productId } },
      user: { connect: { id: userSession.itemId } }
    }
  });
}
