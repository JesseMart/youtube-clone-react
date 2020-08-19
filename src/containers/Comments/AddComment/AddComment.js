import React from 'react'
import './AddComment.scss'
import { Image, Form, TextArea } from 'semantic-ui-react'

export default function AddComment() {
    return (
        <div className='add-comment'>
            <Image className='user-image' src='http://via.placeholder.com/48x48' circular/>
                <Form>
                    <Form.TextArea control={TextArea} autoHeight placeholder='Add a public comment' />
                </Form>
        </div>
    )
}
