import { gql, useMutation } from '@apollo/client';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import { CURRENT_USER_QUERY } from './User';
import DisplayError from './ErrorMessage';

const SIGN_UP_MUTATION = gql`
  mutation SIGN_UP_MUTATION($name: String!, $email: String!, $password: String!) {
    createUser(data: { name: $name, email: $email, password: $password }) {
      id
      name
      email
    }
  }
`;

const SignUp = () => {
  const { inputs, handleChange, resetForm } = useForm({ email: '', name: '', password: '' });
  const [signup, { loading, error, data }] = useMutation(SIGN_UP_MUTATION, {
    variables: inputs
    // Refetch the currently logged in user
    // refetchQueries: [{ query: CURRENT_USER_QUERY }]
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    await signup().catch(console.error);
    console.log({ data, loading, error });
    resetForm();
  };

  return (
    <Form method='POST' onSubmit={handleSubmit}>
      <h2>Sign Up For an Account</h2>
      <DisplayError error={error} />
      <fieldset>
        {data?.createUser && (
          <p>Signed up with {data.createUser.email} - Please go ahead and sign in!</p>
        )}
        <label htmlFor='name'>
          Name
          <input
            type='name'
            name='name'
            id='name'
            placeholder='Name'
            autoComplete='name'
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
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
        <button type='submit'>Sign Up!</button>
      </fieldset>
    </Form>
  );
};

export default SignUp;
