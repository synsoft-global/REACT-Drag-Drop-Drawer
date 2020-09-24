import React from "react";
import Container from "@material-ui/core/Container";
import Canvas from "./Canvas";

/* category array for menu*/
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

/**
 * Custom item container
 */
// const itemContainer = (props: any) => {
//   const { items } = props;
//   return (
//     items &&
//     items.map((data: any) => {
//       return <div>{data.name}</div>;
//     })
//   );
// };

/**
 * Custom close button
 * @param props
 */
// const closeButton = (props: any) => {
//   const { onClose, classes } = props;
//   return <div onClick={onClose}>close</div>;
// };

const DesignRoot = () => {
  // include for custom item wrapper
  // itemContainer={itemContainer}

  // include for custom close button
  // closeButton={closeButton}

  // include style for drawer
  // style={{"background":"blue"}}

  // include style for drawer item
  // itemContainerStyle={{{"background":"yellow","margin":"2px"}}}

  return (
    <Container component="main" maxWidth="xs">
      <Canvas
        location="Left"
        name="Menu"
        items={items}
        showTitle={true}
        searchIsEnabled={true}
        disableDragAndDrop={false}
        title={"Test task"}
        closeButtonIsShowing={true}
        dndName={"Drag and Drop"}
      />
    </Container>
  );
};

export default DesignRoot;
