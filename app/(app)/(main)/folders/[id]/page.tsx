"use client";
import { DataTable } from "@/components/data-table";
import { SkeletonList } from "@/components/skeleton-list";
import { FolderBread } from "@/components/folder-bread";
import { useFolder } from "@/hooks/useFolder";

const FolderPage = ({ params }: { params?: { id: string } }) => {
  const [isPending, isError] = useFolder({
    folderId: params?.id,
    type: "NORMAL",
  });

  if (isError) throw "뭔가 오류발생";

  return (
    <section className="p-5">
      <FolderBread folderId={params?.id} />
      {isPending ? <SkeletonList /> : <DataTable />}
    </section>
  );
};

export default FolderPage;
