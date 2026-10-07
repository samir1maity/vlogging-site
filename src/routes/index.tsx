import { createFileRoute } from "@tanstack/react-router";
import { Cursor } from "@/components/site/fx";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Vlogs, Featured, Categories, About, Social, BehindTheScenes, Collaborate, Footer } from "@/components/site/Sections";

const title = "Arjun Sen — Stories. Places. People.";
const description = "Travel vlogs, street food and city stories by filmmaker Arjun Sen. Watch the latest episode or start a collaboration.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="grain relative overflow-x-clip">
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Vlogs />
        <Featured />
        <Categories />
        <About />
        <Social />
        <BehindTheScenes />
        <Collaborate />
      </main>
      <Footer />
    </div>
  );
}
