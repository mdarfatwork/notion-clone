"use client"
import React, { FormEvent, useEffect, useState, useTransition } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import Editor from './Editor';
import useOwner from '@/lib/useOwner';
import DeleteDocuments from './DeleteDocuments';
import InviteUser from './InviteUser';
import ManageUsers from './ManageUsers';
import Avatars from './Avatars';

const Document = ({id}: {id: string}) => {
    const [data, loading, error] = useDocumentData(doc(db, "documents", id));
    const [input, setInput] = useState("");
    const [isUpdating, startTransition] = useTransition();
    const isOwner = useOwner();

    useEffect(()=>{
        if(data) {
            setInput(data.title);
        }
    },[data])

    const updateTitle = (e: FormEvent) => {
        e.preventDefault();
        if(input.trim()) {
            startTransition(async ()=> {
                await updateDoc(doc(db, "documents", id), {
                    title: input,
                })
            })
        }
    }
  return (
    <div className='flex-1 h-full bg-white p-5 rounded-md '>
        <div className='flex max-w-6xl mx-auto justify-between pb-5'>
            <form className='flex flex-1 space-x-2' onSubmit={updateTitle}>
                {/* update title */}
                <Input value={input} onChange={(e) => setInput(e.target.value)} className='bg-white' />

                <Button disabled={isUpdating} type='submit'>
                    {isUpdating ? "Updating" : "Update"}
                </Button>

                {/* if */}
                {isOwner && (
                    <>
                    {/* InviteUser */}
                    <InviteUser />
                    <DeleteDocuments />
                    </>
                )}
                {/* owner && invite User, DeletedDocument */}
            </form>
        </div>
        <div className='flex max-w-6xl mx-auto justify-between items-center mb-5'>
            <ManageUsers/>

            <Avatars />
        </div>

        <hr className='pb-10'/>
        {/* Collabrative Editor */}
        <Editor/>
    </div>
  )
}

export default Document