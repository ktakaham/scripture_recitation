import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";

import { Layout } from "@/components/layouts/";
import { MainPageComponent } from "@/components/pages/main/MainPageComponent";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

const MainPage: NextPageWithLayout = () => <MainPageComponent />;
MainPage.getLayout = (page) => {
  <Layout>{page}</Layout>;
};
export default MainPage;
