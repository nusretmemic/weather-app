import { WidgetList } from "@/components/WidgetList";
import { SearchArea } from "@/components/SearchArea";
import { Background } from "@/components/Background";

export default function Home() {
  return (
    <div className="relative min-h-screen flex justify-center">
      <div className="h-10" />
      <Background />
      <SearchArea />
      <WidgetList />
      <div className="h-20" />
    </div>
  );
}
