import {useRouter} from 'next/router';

const FeaturePage = () => {
    const router = useRouter();

    return (
        <h1>{router.query.title}</h1>
    );
};

export default FeaturePage;
