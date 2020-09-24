import React, { useState } from "react";
import Drawer from "../Drawer";
import { makeStyles } from "@material-ui/core/styles";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TargetBox from "./TargetBox";

/**
 * Interface for component props
 */
export interface canvasProps {
  name: string; // assuming name and title are same
  /** The list of items to show */
  items: any[];
  /** The component wrapper to use instead of the default for each item */
  itemContainer?: React.ReactType;
  /** The style to use for each item */
  itemContainerStyle?: object;
  /** The location of the drawer */
  location: string;
  /** The title to show for the drawer */
  title: string;
  /** Whether or not to show the title */
  showTitle: boolean;
  /** Whether or not search is enabled */
  searchIsEnabled: boolean;
  /** The component to show (instead of the default) for searching */
  searchComponent?: React.ReactType;
  /** Whether or not drag and dropping is disabled */
  disableDragAndDrop: boolean;
  /** Whether or not the close drawer button is showing */
  closeButtonIsShowing: boolean;
  /** The component to use (instead of the default) for the close button */
  closeButton?: React.ReactType;
  /** The style to use for the item drawer */
  style?: object;
  /** The common name shared between the drag and drop source and the drag and drop target */
  dndName: string;
}

/**
 * Custom hook to be called when ItemDrawer, ItemDrawerSearch renders
 * @param event
 */
export const onComponentRender = (event: any) => {
  console.log(event);
  return true;
};

/**
 * Custom hook to be called when ItemDrawerItems generate
 * @param event
 */
export const onListItems = (event: any) => {
  console.log(event);
  return true;
};

/**
 * Custom hook to be called when events occur - ItemDrawerDragItem, ItemDrawerDropItem, ItemDrawerClickItem, ItemDrawerDoubleClickItem, ItemDrawerMouseEntersItem, ItemDrawerMouseLeavesItem, ItemDrawerSearch, ItemDrawerClose
 * @param event
 */
export const onEventTrigger = (event: any) => {
  console.log(event);
  return true;
};

/** Component for Canvas view with drawer options */
const Canvas = (props: canvasProps) => {
  const styles: any = useStyles();
  const [droppedItem, setDroppedItem] = useState([]);

  /* main render function */
  return (
    <div className={styles.container}>
      <div className={styles.containerItem}>
        <DndProvider backend={HTML5Backend}>
          <div className={styles.headerView}>
            <div className={styles.canvasHeader}> {props.dndName} </div>
          </div>
          <TargetBox
            location={props.location}
            onItemDrop={(result: any) => {
              onEventTrigger("ItemDrawerDropItem");
              setDroppedItem(droppedItem.concat(result));
            }}
            droppedItem={droppedItem}
          />
          <Drawer {...props} />
        </DndProvider>
      </div>
    </div>
  );
};

export default Canvas;

/* styles for view*/
const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: "#c0d6e4",
  },
  containerItem: {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    position: "absolute",
  },
  text: {
    width: "100%",
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  floationgBtnCss: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
    position: "absolute",
    bottom: 20,
    right: 10,
    width: "60px",
    height: "60px",
    borderRadius: "40px",
    textAlign: "center",
    display: "flex",
  },
  btn: {
    color: "white",
    backgroundColor: "blue",
    borderRadius: "10px",
    padding: "5px",
  },
  catName: {
    marginBottom: "20px",
    color: "black",
    fontSize: 20,
    marginLeft: "-10px",
  },
  menuHeader: {
    marginBottom: "20px",
    color: "black",
    fontSize: 20,
    marginTop: "20px",
    marginLeft: "7px",
    textAlign: "center",
  },
  headerView: {
    height: 65,
    boxShadow: "0 1px 22px rgba(0,0,0,0.19), 0 0px 1px rgba(0,0,0,0.23)",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
  testNew: {
    backgroundColor: "red !important",
    width: "4.5vw",
    margin: "11px 5px",
    lineHeight: "20px",
  },
  canvasHeader: {
    color: "black",
    textAlign: "center",
  },
}));
