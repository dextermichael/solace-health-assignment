import SearchModule from "@/components/SearchModule";

export default async function Home() {
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const host = process.env.NEXT_PUBLIC_BASE_URL || "localhost:3000";

  const response = await  fetch(`${protocol}://${host}/api/advocates` , {
    cache : "no-cache"
  });
  const data = await response.json();
  const advocates = data.data;
  return (
    <main>
      <SearchModule advocates={advocates}/>
    </main>
  )
}
