import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import BlogList from "./BlogList";
import { mockBlogs } from "../MockData/MockData";
import userEvent from "@testing-library/user-event";

describe("test blogs alongside with blogs container", () => {
  let container;

  beforeEach(() => {
    container = render(<BlogList blogs={mockBlogs} />);
  });
  test("render content", () => {
    const element = container.getByText("First");
    expect(element).toBeDefined();
  });

  test("total length of content is equal to original length", () => {
    const blogs = container.getAllByRole("listitem");
    expect(blogs).toHaveLength(3);
  });
  test("before clicking the button likes and url are invisible, after that - visible", async () => {
    const element = container.getByText("First");
    let blogUrl = element.querySelector(".blog-url");
    let blogLikes = element.querySelector(".blog-likes");
    expect(blogUrl).toBeNull();
    expect(blogLikes).toBeNull();

    const user = userEvent.setup();
    const button = element.querySelector("button");
    await user.click(button);

    blogUrl = element.querySelector(".blog-url");
    blogLikes = element.querySelector(".blog-likes");
    expect(blogUrl).toBeDefined();
    expect(blogLikes).toBeDefined();
  });

  // test("if like button clicked twice - it is clicked twice", async () => {
  //   const element = container.getByText("First");
  //   const user = userEvent.setup();
  //   const button = element.querySelector("button");
  //   await user.click(button);
  //
  //   const likesButton = element.querySelector(".blog-likes");
  //   await user.click(likesButton);
  //   await user.click(likesButton);
  //
  //   expect(likesButton.mock.calls).toHaveLength(2);
  // });
});
