"use client";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { useState } from "react";
import { useFile } from "@/context/file-context";
import { fileUpload } from "@/api/file-api";
import { useAuth } from "@/context/auth-context";
import { Spinner2 } from "@/file-client/components/spinner2";

export const FileUploadModal = () => {
  const { folderId, refreshFolder } = useFile();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user, setUser } = useAuth();

  const formSchema = z.object({
    file: z
      .any()
      .refine((f) => f?.length == 1, "파일을 선택해주세요")
      .refine((f) => f[0].size <= 5_180_000, "파일의 용량은 최대 5MB입니다."),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (e: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", e.file[0]);
    if (folderId != null) formData.append("folderId", folderId);
    const isSuccess = await fileUpload(formData);
    setIsLoading(false);

    if (isSuccess) {
      setUser({ ...user!, size: user!.size + e.file[0].size });
      refreshFolder();
      setIsOpen(false);
    }
  };

  const handleOpen = (e: boolean) => {
    form.reset();
    setIsOpen(e);
  };

  const fileRef = form.register("file");

  return (
    <Dialog onOpenChange={handleOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button className="w-full md:py-7 md:text-xl">파일 업로드</Button>
      </DialogTrigger>
      <DialogContent className="max-w-80 sm:max-w-[425px] min-h-60">
        <DialogHeader>
          <DialogTitle>파일 업로드</DialogTitle>
          <DialogDescription>
            업로드 버튼을 클릭해서 추가해주세요(최대 5mb)
          </DialogDescription>
        </DialogHeader>
        {isLoading ? (
          <div className="flex2">
            <Spinner2 loading clasName="" />
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="file"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="file" {...fileRef} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit" className="w-full">
                  업로드
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};
