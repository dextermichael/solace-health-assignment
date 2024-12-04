import SearchModule from "@/components/SearchModule";
import { getAdvocates } from "@/ServerFunction/advocates";

export default async function Home() {
  const advocates = getAdvocates();
  return (
    <main>
      <SearchModule advocates={advocates}/>
    </main>
  )
}
