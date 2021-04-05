import gql from 'graphql-tag';
import debounce from 'lodash.debounce';
import { useLazyQuery } from '@apollo/client';
import { resetIdCounter, useCombobox } from 'downshift';
import { useRouter } from 'next/dist/client/router';
import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown';

const SEARCH_PRODUCTS_QUERY = gql`
  query SEARCH_PRODUCTS_QUERY($searchTerm: String!) {
    searchTerm: allProducts(
      where: { OR: [{ name_contains_i: $searchTerm }, { description_contains_i: $searchTerm }] }
    ) {
      id
      name
      photo {
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

const Search = () => {
  resetIdCounter();
  const router = useRouter();
  const [findItems, { loading, error, data }] = useLazyQuery(SEARCH_PRODUCTS_QUERY, {
    fetchPolicy: 'no-cache'
  });
  const items = data?.searchTerm || [];
  const findItemsDebounce = debounce(findItems, 350);
  const {
    isOpen,
    inputValue,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getItemProps,
    highlightedIndex
  } = useCombobox({
    items: items,
    onInputValueChange() {
      console.log('Input changed!');
      findItemsDebounce({
        variables: {
          searchTerm: inputValue
        }
      });
    },
    onSelectedItemChange({ selectedItem }) {
      console.log('Selected Item changed!');
      router.push({
        pathname: `/product/${selectedItem.id}`
      });
    },
    itemToString: (item) => item?.name || ''
  });

  return (
    <SearchStyles>
      <div {...getComboboxProps()}>
        <input
          {...getInputProps({
            type: 'search',
            placeholder: 'Search for an Item',
            id: 'search',
            className: loading ? 'loading' : ''
          })}
        />
      </div>
      <DropDown {...getMenuProps()}>
        {isOpen &&
          items.map((item, index) => (
            <DropDownItem
              key={item.id}
              {...getItemProps({ item: item, index: index })}
              highlighted={index === highlightedIndex}
            >
              <img src={item.photo.image.publicUrlTransformed} alt={item.name} width='50' />
              {item.name}
            </DropDownItem>
          ))}
        {isOpen && !items.length && !loading && (
          <DropDownItem>Sorry, no items found for {inputValue}</DropDownItem>
        )}
      </DropDown>
    </SearchStyles>
  );
};

export default Search;
