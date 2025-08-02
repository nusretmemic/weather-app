import { WidgetList } from "@/components/Widgets/WidgetList";
import { SearchArea } from "@/components/Search/SearchArea";
import { Background } from "@/components/Background";

export default function Home() {
  return (
    <div className="relative min-h-screen justify-center">
      <Background />
      <div className="flex justify-center lg:flex-row flex-col pt-10 px-4">
        <SearchArea />
        <WidgetList />
      </div>
    </div>
  );
}
