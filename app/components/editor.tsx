'use client'

import { Editor } from '@tinymce/tinymce-react'



interface EditorProps {
    value: string
    onChange: (value: string) => void
}
export type TinyMCEAIRequest = {
    prompt: string
    selection?: string
    context?: string
    language?: string
}

export type TinyMCEAIRespondWith = {
    string: (fn: () => Promise<string>) => void
}

export default function EditorText({ value, onChange }: EditorProps) {
    return (
        <Editor
            value={value}
            onEditorChange={onChange}
            apiKey='do3xchs9fbaq0y6ecqbqd3qjvem3ay0dllfqhlwq47l907rj'
            init={{
                height: 400,
                menubar: false,
                plugins: [
                    'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
                    'checklist', 'mediaembed', 'casechange', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'advtemplate', 'ai', 'uploadcare', 'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown', 'importword', 'exportword', 'exportpdf'
                ],
                toolbar:
                    'undo redo | bold italic | bullist numlist | link | code',
                ai_request: (request: TinyMCEAIRequest, respondWith: TinyMCEAIRespondWith) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
                uploadcare_public_key: 'f765cff848e7d52799ed',

            }}
            initialValue="Welcome to TinyMCE!"
        />
    )
}
