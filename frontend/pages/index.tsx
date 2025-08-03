import { WidgetList } from "@/components/Widgets/WidgetList";
import { SearchArea } from "@/components/Search/SearchArea";
import { Background } from "@/components/Background";
import Head from "next/head";

export default function Home() {
  return (
    <div className="relative min-h-screen justify-center">
      <Head>
        <title>Weather Widgets</title>
        <meta
          name="description"
          content="Add your favorite locations to get the latest weather updates."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Background />
      <div className="flex justify-center lg:flex-row flex-col pt-10 px-4">
        <SearchArea />
        <WidgetList />
      </div>
    </div>
  );
}
