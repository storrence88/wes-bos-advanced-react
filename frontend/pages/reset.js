import RequestReset from '../components/RequestReset';
import Reset from '../components/Reset';

const ResetPage = ({ query }) => {
  if (!query?.token) {
    return (
      <div>
        <RequestReset />
      </div>
    );
  }
  return (
    <div>
      <Reset token={query?.token} />
    </div>
  );
};

export default ResetPage;
