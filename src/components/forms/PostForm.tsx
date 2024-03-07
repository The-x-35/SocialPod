import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useNavigate } from 'react-router';
import { Button } from "@/components/ui/button"
import {Form,FormControl,FormField,FormItem,FormLabel,FormMessage,} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from '../ui/textarea'
import FileUploader from '../shared/FileUploader'
import { PostValidation } from '@/lib/validation'
import { Models } from 'appwrite'
import { useUserContext } from '@/context/AuthContext'
import { useToast } from '../ui/use-toast'
import { useCreatePost } from '@/lib/react-query/queriesAndMutations';

type PostFormProps = {
  post?: Models.Document;
}
const PostForm = ({post}: PostFormProps) => {
  const {mutateAsync: CreatePost, isPending: isLoadingCreate } = useCreatePost();
  const {user} = useUserContext();
  const {toast} =  useToast();
  const navigate = useNavigate();
   // 1. Define your form.
   const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      caption: post ? post?.caption : "",
      file: [],
      location: post ? post?.location : "",
      tags: post ? post.tags.join(',') : ''
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof PostValidation>) {
    const newPost = await CreatePost({
      ...values,
      userId: user.id,
    })
    if(!newPost){
      toast({
        title: 'Please try again'
      })
    }
    navigate('/');
  }
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full max-w-5xl">
      <FormField
        control={form.control}
        name="caption"
        render={({ field }) => (
          <FormItem>
            <FormLabel className='shad-form_label'>Caption</FormLabel>
            <FormControl>
              <Textarea className='shad-textarea custom-scrollbar' placeholder="Enter the caption here..." {...field} />
            </FormControl>
            <FormMessage className='shad-form_message' />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="file"
        render={({ field }) => (
          <FormItem>
            <FormLabel className='shad-form_label'>Add Photos</FormLabel>
            <FormControl>
              <FileUploader 
                fieldChange={field.onChange}
                mediaUrl={post?.imageUrl}
              />
            </FormControl>
            <FormMessage className='shad-form_message' />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="location"
        render={({ field }) => (
          <FormItem>
            <FormLabel className='shad-form_label'>Add Location</FormLabel>
            <FormControl>
              <Input className='shad-input' placeholder='Enter the location here...' {...field} />
            </FormControl>
            <FormMessage className='shad-form_message' />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="tags"
        render={({ field }) => (
          <FormItem>
            <FormLabel className='shad-form_label'>Add Tags (separated by coma ",")</FormLabel>
            <FormControl>
              <Input type="text" className='shad-input' placeholder='Enter the tags here...' {...field} />
            </FormControl>
            <FormMessage className='shad-form_message' />
          </FormItem>
        )}
      />
      <div className=' flex gap-4 items-center justify-end'>
      <Button type="button" className='shad-button_dark_4'>Cancel</Button>
      <Button type="submit" className='shad-button_primary whitespace-nowrap'>Submit</Button>
      </div>
    </form>
  </Form>
  )
}

export default PostForm