import UserPanelLayout from '@/src/layouts/admin/nav';
import AboutUs from '@/src/pages/about-us';
import { GetServerSideProps } from 'next';
import { withAuthServerSideProps } from '../../../components/PrivateRoutes/withAuthServerSideProps';

AboutUsPage.getLayout = (page: React.ReactElement) => <UserPanelLayout>{page}</UserPanelLayout>;

export default function AboutUsPage() {
  return (
      <div className="text-white">
        <AboutUs />
      </div>
    
  );
}

export const getServerSideProps: GetServerSideProps = withAuthServerSideProps();
