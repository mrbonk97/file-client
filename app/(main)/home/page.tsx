"use client";
import { FolderBreadCrumb } from "@/components/folder-breadcrumb";
import { DataTableDemo } from "@/components/table";

import { api } from "@/lib/api";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [files, setFiles] = useState([]);

  const handleFileRequest = async () => {
    const result = await api.get("/folders");
    if (result.status == 200) {
      setFiles(result.data.files);
    }
  };

  useEffect(() => {
    handleFileRequest();
  }, []);

  return (
    <main className="h-full w-full pl-[400px] pt-16">
      <FolderBreadCrumb />
      <DataTableDemo data={files} />
    </main>
  );
};

export default HomePage;
