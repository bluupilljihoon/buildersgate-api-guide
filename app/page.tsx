import { getAllGuides } from "@/lib/guides";
import HomeClient from "./HomeClient";

export default function HomePage() {
  const guides = getAllGuides().map(({ content, ...meta }) => ({
    ...meta,
    content: "",
  }));

  return <HomeClient guides={guides} />;
}
