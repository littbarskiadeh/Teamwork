import { useContext } from 'react';
import Logout from '../components/Logout';
import { UserContext } from '../hooks/UserContext';

function Dashboard() {
  const userContext = useContext(UserContext);

  return (
    <div>
      <Logout />

      <h1>Welcome, {userContext.user.email}!</h1>
    </div>
  );
}
export default Dashboard;