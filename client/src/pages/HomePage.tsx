import { Suspense } from 'react';
import ArticleList from '../components/article/ArticleList';
import Banner from '../components/Banner';
import LoadingSpinner from '../components/common/LoadingSpinner';

const HomePage = () => {
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <Banner />
        <ArticleList />
      </Suspense>
    </>
  );
};

export default HomePage;
