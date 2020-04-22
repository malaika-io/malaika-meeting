import { useRouter } from 'next/router';
import Layout from '../components/Layout';

const FeaturePage = () => {
  const router = useRouter();

  return (
    <Layout>
      <h1>{router.query.title}</h1>
    </Layout>
  );
};

export default FeaturePage;
