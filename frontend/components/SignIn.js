import { gql, useMutation } from '@apollo/client';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import { CURRENT_USER_QUERY } from './User';
import DisplayError from './ErrorMessage';

const SIGN_IN_MUTATION = gql`
  mutation SIGN_IN_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          id
          email
          name
        }
      }

      ... on UserAuthenticationWithPasswordFailure {
        code
        message
      }
    }
  }
`;

const SignIn = () => {
  const { inputs, handleChange, resetForm } = useForm({ email: '', password: '' });
  const [signin, { data }] = useMutation(SIGN_IN_MUTATION, {
    variables: inputs,
    // Refetch the currently logged in user
    refetchQueries: [{ query: CURRENT_USER_QUERY }]
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    await signin();
    resetForm();
  };
  const error =
    data?.authenticateUserWithPassword?.__typename === 'UserAuthenticationWithPasswordFailure'
      ? data?.authenticateUserWithPassword
      : undefined;

  return (
    <Form method='POST' onSubmit={handleSubmit}>
      <h2>Sign Into Your Account</h2>
      <DisplayError error={error} />
      <fieldset>
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
        <label htmlFor='password'>
          Password
          <input
            type='password'
            name='password'
            id='password'
            placeholder='Password'
            value={inputs.password}
            onChange={handleChange}
          />
        </label>
        <button type='submit'>Sign In!</button>
      </fieldset>
    </Form>
  );
};

export default SignIn;
