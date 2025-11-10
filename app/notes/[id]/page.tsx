import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import NoteDetails from "./NoteDetails.client";
import { fetchNoteById } from "@/lib/api";

export default async function NotesPage(props: Promise<{ params: { id: string } }>) {
  const { params } = await props;
  const { id } = params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetails id={id} />
    </HydrationBoundary>
  );
}
