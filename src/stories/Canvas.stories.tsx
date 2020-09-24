import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import Canvas, { canvasProps } from "../component/Design/Canvas/Canvas";

export default {
  title: "Canvas",
  component: Canvas,
  argTypes: {
    location: {
      control: {
        type: "inline-radio",
        options: ["Left", "Right", "Top", "Bottom", "Inline"],
      },
    },
    itemContainer: { control: { disable: true } },
    searchComponent: { control: { disable: true } },
    closeButton: { control: { disable: true } },
  },
};
const Template: Story<canvasProps> = (args) => <Canvas {...args} />;

// dummy items array 
const items = [
  {
    id: "1",
    name: "Table",
    group: "Furniture",
    image:
      "https://i.pinimg.com/originals/7a/42/82/7a4282b44d0b6c5339088454cbc9f8da.png",
  },
  {
    id: "2",
    name: "Chair",
    group: "Furniture",
    image:
      "https://i.pinimg.com/originals/76/10/7e/76107eeba9ec42f0fca5bb2a89222bee.jpg",
  },
  {
    id: "3",
    name: "Door",
    group: "Furniture",
    image:
      "https://i.pinimg.com/originals/f3/1c/74/f31c74cfde7f2d95fc0d7293f775661d.jpg",
  },

  {
    id: "4",
    name: "TV",
    group: "Electronics",
    image:
      "https://images.samsung.com/is/image/samsung/levant-fhd-t5300-ua43t5300auxtw-frontblack-229857917?$PD_GALLERY_L_JPG$",
  },
  {
    id: "5",
    name: "Camera",
    group: "Electronics",
    image:
      "https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: "6",
    name: "Mobile",
    group: "Electronics",
    image:
      "https://images.samsung.com/is/image/samsung/p5/in/S20-pf-mo-1.jpg?$ORIGIN_JPG$",
  },
];

/** Canvas story with default props */
export const Simple = Template.bind({});
Simple.args = {
  location: "Left",
  name: "new Drag",
  items: items,
  // showCategories: true,
  showTitle: true,
  searchIsEnabled: true,
  disableDragAndDrop: false,
  title: "Test task",
  closeButtonIsShowing: true,
  dndName: "Drag and Drop",
};
