// Canvas.test.js
import React from "react";
import renderer from "react-test-renderer";
import DesignComponent from "./Design";
import Canvas from "./Canvas/Canvas";
import { render } from "@testing-library/react";

test("Should be rendered in the dom", () => {
  const component = renderer.create(<DesignComponent />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});


test("Should render a component in the itemContainer prop", () => {
  const items = [
    {
      id: "1",
      name: "Table",
      group: "Furniture",
      image:
        "https://i.pinimg.com/originals/7a/42/82/7a4282b44d0b6c5339088454cbc9f8da.png"
    },
    {
      id: "2",
      name: "Chair",
      group: "Furniture",
      image:
        "https://i.pinimg.com/originals/76/10/7e/76107eeba9ec42f0fca5bb2a89222bee.jpg"
    }
  ];

  const { queryByLabelText, getByText, container } = render(
    <Canvas  location="Left"
    name="Menu"
    items={items}
    showTitle={true}
    searchIsEnabled={true}
    disableDragAndDrop={false}
    title={"Test task"}
    closeButtonIsShowing={true}
    dndName={"Drag and Drop"} />
  );  
  container.querySelector(".drawerButton")?.click(); 

  expect(container.querySelectorAll(".ItemDrawerItems").length).toBe(items.length);
});


test("Should apply the style provided by itemContainerStyle on each item if one is provided", () => {
  const items = [
    {
      id: "1",
      name: "Table",
      group: "Furniture",
      image:
        "https://i.pinimg.com/originals/7a/42/82/7a4282b44d0b6c5339088454cbc9f8da.png"
    }   
  ];

  const { queryByLabelText, getByText, container } = render(
    <Canvas  location="Left"
    name="Menu"
    items={items}
    showTitle={true}
    searchIsEnabled={true}
    disableDragAndDrop={false}
    title={"Test task"}
    closeButtonIsShowing={true}
    dndName={"Drag and Drop"}
    itemContainerStyle={{ color: "red" }} />
  );  
  container.querySelector(".drawerButton")?.click();
  expect(container.querySelector(".ItemDrawerItemSource").style.color).toBe('red');
});


test("Should show the Item Drawer in the LEFT position if the LEFT option is used in the location prop", () => {
  const items = [
    {
      id: "1",
      name: "Table",
      group: "Furniture",
      image:
        "https://i.pinimg.com/originals/7a/42/82/7a4282b44d0b6c5339088454cbc9f8da.png"
    }   
  ];

  const { container } = render(
    <Canvas  location="Left"
    name="Menu"
    items={items}
    showTitle={true}
    searchIsEnabled={true}
    disableDragAndDrop={false}
    title={"Test task"}
    closeButtonIsShowing={true}
    dndName={"Drag and Drop"}
     />
  );  
  container.querySelector(".drawerButton")?.click(); 
  expect(container.querySelectorAll(".ItemDrawerLocationLeft").length).toBe(1);
});

test("Should show the Item Drawer in the RIGHT position if the RIGHT option is used in the location prop", () => {
  const items = [
    {
      id: "1",
      name: "Table",
      group: "Furniture",
      image:
        "https://i.pinimg.com/originals/7a/42/82/7a4282b44d0b6c5339088454cbc9f8da.png"
    }   
  ];

  const { container } = render(
    <Canvas  location="Right"
    name="Menu"
    items={items}
    showTitle={true}
    searchIsEnabled={true}
    disableDragAndDrop={false}
    title={"Test task"}
    closeButtonIsShowing={true}
    dndName={"Drag and Drop"}
     />
  );  
  container.querySelector(".drawerButton")?.click(); 
  expect(container.querySelectorAll(".ItemDrawerLocationRight").length).toBe(1);
});

test("Should show the Item Drawer in the TOP position if the TOP option is used in the location prop", () => {
  const items = [
    {
      id: "1",
      name: "Table",
      group: "Furniture",
      image:
        "https://i.pinimg.com/originals/7a/42/82/7a4282b44d0b6c5339088454cbc9f8da.png"
    }   
  ];

  const { container } = render(
    <Canvas  location="Top"
    name="Menu"
    items={items}
    showTitle={true}
    searchIsEnabled={true}
    disableDragAndDrop={false}
    title={"Test task"}
    closeButtonIsShowing={true}
    dndName={"Drag and Drop"}
     />
  );  
  container.querySelector(".drawerButton")?.click(); 
  expect(container.querySelectorAll(".ItemDrawerLocationTop").length).toBe(1);
});

test("Should show the Item Drawer in the BOTTOM position if the BOTTOM option is used in the location prop", () => {
  const items = [
    {
      id: "1",
      name: "Table",
      group: "Furniture",
      image:
        "https://i.pinimg.com/originals/7a/42/82/7a4282b44d0b6c5339088454cbc9f8da.png"
    }   
  ];

  const { container } = render(
    <Canvas  location="Bottom"
    name="Menu"
    items={items}
    showTitle={true}
    searchIsEnabled={true}
    disableDragAndDrop={false}
    title={"Test task"}
    closeButtonIsShowing={true}
    dndName={"Drag and Drop"}
     />
  );  
  container.querySelector(".drawerButton")?.click(); 
  expect(container.querySelectorAll(".ItemDrawerLocationBottom").length).toBe(1);
});

test("Should show a title in the Item Drawer that matches the title prop if provided", () => {
  const items = [
    {
      id: "1",
      name: "Table",
      group: "Furniture",
      image:
        "https://i.pinimg.com/originals/7a/42/82/7a4282b44d0b6c5339088454cbc9f8da.png"
    }   
  ];

  const { queryByLabelText, getByText, container } = render(
    <Canvas  location="Left"
    name="Menu"
    items={items}
    showTitle={true}
    searchIsEnabled={true}
    disableDragAndDrop={false}
    title={"Test task"}
    closeButtonIsShowing={true}
    dndName={"Drag and Drop"}
    itemContainerStyle={{ color: "red" }} />
  );  
  container.querySelector(".drawerButton")?.click(); 
  expect(getByText(/Test task/i)).toBeTruthy();
});


test("Should not render a title if the showTitle prop is false", () => {
  const items = [
    {
      id: "1",
      name: "Table",
      group: "Furniture",
      image:
        "https://i.pinimg.com/originals/7a/42/82/7a4282b44d0b6c5339088454cbc9f8da.png"
    }   
  ];

  const { queryByLabelText, getByText, container } = render(
    <Canvas  location="Left"
    name="Menu"
    items={items}
    showTitle={false}
    searchIsEnabled={true}
    disableDragAndDrop={false}
    title={"Test task"}
    closeButtonIsShowing={true}
    dndName={"Drag and Drop"}
    itemContainerStyle={{ color: "red" }} />
  );  
  container.querySelector(".drawerButton")?.click(); 
  expect(container.querySelectorAll(".menuHeaderTitle").length).toBe(0);
});

test("Should not show a search component if the searchIsEnabled props is false", () => {
  const items = [
    {
      id: "1",
      name: "Table",
      group: "Furniture",
      image:
        "https://i.pinimg.com/originals/7a/42/82/7a4282b44d0b6c5339088454cbc9f8da.png"
    }   
  ];

  const { queryByLabelText, getByText, container } = render(
    <Canvas  location="Left"
    name="Menu"
    items={items}
    showTitle={true}
    searchIsEnabled={false}
    disableDragAndDrop={false}
    title={"Test task"}
    closeButtonIsShowing={true}
    dndName={"Drag and Drop"}
    itemContainerStyle={{ color: "red" }} />
  );  
  container.querySelector(".drawerButton")?.click(); 
  expect(container.querySelectorAll(".search-input").length).toBe(0);
});

test("Should not render a close button if the closeButtonIsShowing prop is false", () => {
  const items = [
    {
      id: "1",
      name: "Table",
      group: "Furniture",
      image:
        "https://i.pinimg.com/originals/7a/42/82/7a4282b44d0b6c5339088454cbc9f8da.png"
    }   
  ];

  const {  container } = render(
    <Canvas  location="Left"
    name="Menu"
    items={items}
    showTitle={true}
    searchIsEnabled={true}
    disableDragAndDrop={false}
    title={"Test task"}
    closeButtonIsShowing={false}
    dndName={"Drag and Drop"}
    itemContainerStyle={{ color: "red" }} />
  );  
  container.querySelector(".drawerButton")?.click(); 
  expect(container.querySelectorAll(".closeBtn").length).toBe(0);
});


test("Should not allow drag and drop if the disableDragAndDrop prop is true", () => {
  const items = [
    {
      id: "1",
      name: "Table",
      group: "Furniture",
      image:
        "https://i.pinimg.com/originals/7a/42/82/7a4282b44d0b6c5339088454cbc9f8da.png"
    }   
  ];

  const {  container } = render(
    <Canvas  location="Left"
    name="Menu"
    items={items}
    showTitle={true}
    searchIsEnabled={true}
    disableDragAndDrop={true}
    title={"Test task"}
    closeButtonIsShowing={true}
    dndName={"Drag and Drop"}
    itemContainerStyle={{ color: "red" }} />
  );  
  container.querySelector(".drawerButton")?.click(); 
  expect(container.querySelectorAll(".ItemDrawerDragItemSource").length).toBe(0);
});



test("Should trigger the onClose() event when the drawer is to be closed", () => {
  const items = [
    {
      id: "1",
      name: "Table",
      group: "Furniture",
      image:
        "https://i.pinimg.com/originals/7a/42/82/7a4282b44d0b6c5339088454cbc9f8da.png"
    }   
  ];

  const {  container } = render(
    <Canvas  location="Left"
    name="Menu"
    items={items}
    showTitle={true}
    searchIsEnabled={true}
    disableDragAndDrop={true}
    title={"Test task"}
    closeButtonIsShowing={true}
    dndName={"Drag and Drop"}
    itemContainerStyle={{ color: "red" }} />
  );  
  container.querySelector(".drawerButton")?.click(); 
  container.querySelector(".closeBtn")?.click(); 
  expect(container.querySelectorAll(".closeBtn").length).toBe(0);
});
