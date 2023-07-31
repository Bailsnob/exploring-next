"use client";

import { useRef, useState } from "react";
import { CONSTANTS } from "@/app/constants";

export default function CreatePostPage() {
  const [slugLabel, setSlugLabel] = useState("<slug>");
  const slugInputRef = useRef();
  const titleInputRef = useRef();
  const thumbnailInputRef = useRef();
  const excerptInputRef = useRef();
  const contentInputRef = useRef();

  function updatePostUrl() { //runs when on change event occurs in slug input field
    setSlugLabel(slugInputRef.current.value);
  }

  function submitPost(event) { //called when form submitted
    event.preventDefault(); //prevents normal reaction to submission

    const formData = {
      slug: slugInputRef.current.value,
      title: titleInputRef.current.value,
      thumb: thumbnailInputRef.current.value,
      excerpt: excerptInputRef.current.value,
      content: contentInputRef.current.value,
    }; //captures values user has currently put in
    fetch("/api/admin/create-post", { 
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => {
        console.log(data.json());
        return data.json();
      })
      .then((response) => {
        if (response.status === CONSTANTS.RESPONSE_STATUS.OK) {
          alert("added 1 post successfully");
        } else {
          alert("internal server error");
        }
      });
  }

  return (
    <>
      <h1>Create New Post:</h1>
      <form onSubmit={submitPost}>
        <div className="row">
          <div className="col-label">
            <label htmlFor="slug">Slug</label>
          </div>
          <div className="col-input">
            <input
              type="text"
              id="slug"
              name="slug"
              onChange={updatePostUrl}
              ref={slugInputRef}
            />
            <div>Post&apos;s url: /posts/{slugLabel}</div>
          </div>
        </div>
        <div className="row">
          <div className="col-label">
            <label htmlFor="title">Title</label>
          </div>
          <div className="col-input">
            <input type="text" id="title" name="title" ref={titleInputRef} />
          </div>
        </div>
        <div className="row">
          <div className="col-label">
            <label htmlFor="thumb">Thumbnail</label>
          </div>
          <div className="col-input">
            <input
              type="text"
              id="thumb"
              name="thumb"
              ref={thumbnailInputRef}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-label">
            <label htmlFor="excerpt">Excerpt</label>
          </div>
          <div className="col-input">
            <textarea
              id="excerpt"
              name="excerpt"
              rows="2"
              ref={excerptInputRef}
            ></textarea>
          </div>
        </div>
        <div className="row">
          <div className="col-label">
            <label htmlFor="content">Content</label>
          </div>
          <div className="col-input">
            <textarea
              id="content"
              name="content"
              rows="8"
              ref={contentInputRef}
            ></textarea>
          </div>
        </div>
        <input type="submit" value="Submit" />
      </form>
    </>
  );
}
