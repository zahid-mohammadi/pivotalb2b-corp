import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InsertEbook, insertEbookSchema, Ebook, ColorTheme } from "@shared/schema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/ui/image-upload";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { generateSlug } from "@/lib/utils";
import React from 'react';

interface EbookEditorProps {
  initialData?: Ebook;
}

const defaultColorTheme: ColorTheme = {
  primary: "#0f172a",
  secondary: "#6366f1",
  accent: "#f43f5e",
  background: "#ffffff",
  text: "#0f172a"
};

export function EbookEditor({ initialData }: EbookEditorProps) {
  const { toast } = useToast();
  const form = useForm<InsertEbook>({
    resolver: zodResolver(insertEbookSchema),
    defaultValues: initialData || {
      title: "",
      description: "",
      content: "",
      bannerImage: "",
      contentImages: [],
      downloadUrl: "",
      slug: "",
      colorTheme: defaultColorTheme,
    },
  });

  const title = form.watch("title");
  React.useEffect(() => {
    if (title && !initialData) {
      const slug = generateSlug(title);
      form.setValue("slug", slug);
    }
  }, [title, form, initialData]);

  const mutation = useMutation({
    mutationFn: async (data: InsertEbook) => {
      const res = await apiRequest(
        initialData ? "PATCH" : "POST",
        initialData ? `/api/ebooks/${initialData.id}` : "/api/ebooks",
        data
      );
      if (!res.ok) {
        throw new Error(`Failed to ${initialData ? 'update' : 'create'} ebook`);
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/ebooks"] });
      toast({
        title: "Success",
        description: `Ebook ${initialData ? 'updated' : 'created'} successfully`,
      });
      if (!initialData) {
        form.reset();
      }
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} value={field.value || ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bannerImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Banner Image</FormLabel>
              <FormControl>
                <div className="space-y-2">
                  <ImageUpload
                    onImageUpload={(url) => field.onChange(url)}
                  />
                  {field.value && (
                    <img
                      src={field.value}
                      alt="Banner preview"
                      className="max-w-md rounded-md"
                    />
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} value={field.value || ""} rows={4} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea {...field} value={field.value || ""} rows={10} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contentImages"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content Images</FormLabel>
              <FormControl>
                <div className="space-y-2">
                  <ImageUpload
                    onImageUpload={(url) => field.onChange([...(field.value || []), url])}
                  />
                  <div className="grid grid-cols-3 gap-4">
                    {field.value?.map((url, index) => (
                      <img
                        key={index}
                        src={url}
                        alt={`Content image ${index + 1}`}
                        className="rounded-md"
                      />
                    ))}
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Color Theme</h3>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="colorTheme.primary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Primary Color</FormLabel>
                  <FormControl>
                    <div className="flex gap-2 items-center">
                      <Input type="color" {...field} className="w-16 h-10" />
                      <Input 
                        type="text" 
                        value={field.value} 
                        onChange={(e) => field.onChange(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="colorTheme.secondary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Secondary Color</FormLabel>
                  <FormControl>
                    <div className="flex gap-2 items-center">
                      <Input type="color" {...field} className="w-16 h-10" />
                      <Input 
                        type="text" 
                        value={field.value} 
                        onChange={(e) => field.onChange(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="colorTheme.accent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Accent Color</FormLabel>
                  <FormControl>
                    <div className="flex gap-2 items-center">
                      <Input type="color" {...field} className="w-16 h-10" />
                      <Input 
                        type="text" 
                        value={field.value} 
                        onChange={(e) => field.onChange(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="colorTheme.background"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Background Color</FormLabel>
                  <FormControl>
                    <div className="flex gap-2 items-center">
                      <Input type="color" {...field} className="w-16 h-10" />
                      <Input 
                        type="text" 
                        value={field.value} 
                        onChange={(e) => field.onChange(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="colorTheme.text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Text Color</FormLabel>
                  <FormControl>
                    <div className="flex gap-2 items-center">
                      <Input type="color" {...field} className="w-16 h-10" />
                      <Input 
                        type="text" 
                        value={field.value} 
                        onChange={(e) => field.onChange(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="downloadUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Download URL</FormLabel>
              <FormControl>
                <Input {...field} value={field.value || ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input {...field} value={field.value || ""} disabled/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={mutation.isPending}
          className="w-full"
        >
          {initialData ? 'Update' : 'Create'} Ebook
        </Button>
      </form>
    </Form>
  );
}