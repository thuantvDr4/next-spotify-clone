import getSongs from "@/actions/getSongs";
import Header from "@/components/Header";
import ListItem from "@/components/ListItem";
import SongList from "./components/SongList";

export default async function Home() {
  const songs = await getSongs();

  return (
    <div
      className="
  bg-neutral-900
  rounded-md
  flex
  flex-col
  h-full
  w-full
  overflow-hidden
  "
    >
      <Header>
        <div className="mb-2">
          <h1 className="text-3xl text-white">Welcome back!</h1>

          <div
            className="
            grid
            grid-clos-1
            sm:grid-cols-2
            xl:grid-cols-3
            2xl:grid-cols-4
            mt-4
            gap-3
            relative
          "
          >
            <ListItem
              image="/images/liked.png"
              name="Liked Songs"
              href="/liked"
            />
          </div>
        </div>
      </Header>

      <div className="mt-2 mb-7 px-6">
        <div className="">
          <h1 className="text-2xl text-white font-semibold">Newest Songs</h1>
        </div>

        <SongList songs={songs} />
      </div>
    </div>
  );
}
