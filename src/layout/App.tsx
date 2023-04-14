import { useQuery } from '@tanstack/react-query';
import { mainApi } from '../lib/axios';

const getTodos = async () => {
  const res = await mainApi.get('/posts');
  return res.data;
};

function App() {
  const { error, isLoading, data } = useQuery({
    queryKey: ['test'],
    queryFn: getTodos,
  });

  console.log('@error', error);
  console.log('@isLoading', isLoading);
  console.log('@data', data);

  return <div className="h-screen w-screen bg-dark-500"></div>;
}

export default App;
