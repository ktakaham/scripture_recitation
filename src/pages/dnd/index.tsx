import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";

import { Layout } from "@/components/layouts/";
import { DndPageComponent } from "@/components/pages/dnd/DndPageComponent";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

const dndPage: NextPageWithLayout = () => <DndPageComponent />;
dndPage.getLayout = (page) => {
  <Layout>{page}</Layout>;
};
export default dndPage;
