import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { PostController } from '/imports/api/Post/Post';

type FormData = {
  title: string;
  content: string;
};

export const EditPost: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState<FormData>({ title: '', content: '' });

  const validateForm = () => {
    let formErrors = { title: '', content: '' };
    if (!title) formErrors.title = "Title is required";
    if (!content) formErrors.content = "Content is required";
    setErrors(formErrors);

    return Object.values(formErrors).every(x => !x);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (validateForm()) {
      console.log({ title, content });
      const pid = await PostController.addNewPost.call({
        title: title,
        content: content,
        createdAt: new Date,
        updatedAt: new Date,
        authorId: Meteor.userId()
      })
      console.log("New post id:", pid)
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formTitle">
        <Form.Label>Title:</Form.Label>
        <Form.Control
          type="text"
          value={title}
          isInvalid={!!errors.title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Form.Control.Feedback type='invalid'>
          {errors.title}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formContent">
        <Form.Label>Content:</Form.Label>
        <Form.Control
          as="textarea"
          value={content}
          isInvalid={!!errors.content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Form.Control.Feedback type='invalid'>
          {errors.content}
        </Form.Control.Feedback>
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
