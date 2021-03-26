import { gql, useMutation } from '@apollo/client';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import { CURRENT_USER_QUERY } from './User';
import DisplayError from './ErrorMessage';

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      code
      message
    }
  }
`;

const RequestReset = () => {
  const { inputs, handleChange, resetForm } = useForm({ email: '' });
  const [requestReset, { loading, error, data }] = useMutation(REQUEST_RESET_MUTATION, {
    variables: inputs
    // Refetch the currently logged in user
    // refetchQueries: [{ query: CURRENT_USER_QUERY }]
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    await requestReset().catch(console.error);
    resetForm();
  };

  return (
    <Form method='POST' onSubmit={handleSubmit}>
      <h2>Request a Password Reset</h2>
      <DisplayError error={error} />
      <fieldset>
        {data?.sendUserPasswordResetLink === null && (
          <p>
            If the account exists, you'll receive and email with instructions on how to change your
            password
          </p>
        )}
        <label htmlFor='email'>
          Email
          <input
            type='email'
            name='email'
            id='email'
            placeholder='Email Address'
            autoComplete='email'
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <button type='submit'>Request Reset!</button>
      </fieldset>
    </Form>
  );
};

export default RequestReset;
