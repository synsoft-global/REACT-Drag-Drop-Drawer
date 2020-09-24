import * as React from "react";
import { DragSource } from "react-dnd";
import { withStyles, WithStyles } from "@material-ui/core";
import { Theme, createStyles } from "@material-ui/core/styles";
import { onEventTrigger } from "./Canvas";

/**
 * Styles for view
 */
const useStyles = (theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(1),
      textAlign: "center",
      color: theme.palette.text.secondary,
      marginRight: "5px",
      marginTop: "5px",
    },

    imageBg: {
      backgroundColor: "#ddd",
      width: 80,
      height: 80,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 20,
      marginBottom: 10,
      display: "flex",
    },

    imgCss: {
      width: 60,
      height: 60,
    },

    itemName: {
      textAlign: "center",
      marginRight: 20,
      marginBottom: 10,
    },
  });

/**
 * Interface for SourceBox props
 */
interface IProps extends WithStyles<typeof useStyles> {
  /** The node unique key */
  id: any;
  /** The data to be used in node */
  itemData: any;
  /** Whether or not drag is enabled */
  isReady: boolean;
  /** Function to be called when item is dragged */
  onItemDrag: Function;
  /** Function to connect drag source */
  connectDragSource?: any;
  /** Style to be used in item container */
  itemContainerStyle?: any;
}

/** Component to render dragable item */
const SourceBox = (props: IProps) => {
  const {
    connectDragSource,
    itemData,
    id,
    classes,
    itemContainerStyle,
  } = props;

  /**
   * Function is called when an item is clicked
   */
  const onItemClick = () => {
    console.log("onItemClick !!");
    onEventTrigger("Event: onItemClick");
  };

  /**
   * Function is called when an item is double clicked
   */
  const onItemDoubleClick = () => {
    console.log("onItemDoubleClick !!!");
    onEventTrigger("Event: onItemDoubleClick");
  };

  /**
   * Function is called when mouse enters an item
   */
  const onItemMouseEnter = () => {
    console.log("onItemMouseEnter !!!");
    onEventTrigger("ItemDrawerMouseEntersItem");
  };

  /**
   * Function is called when mouse leaves an item
   */
  const onItemMouseLeave = () => {
    console.log("onItemMouseLeave !!!");
    onEventTrigger("ItemDrawerMouseLeavesItem");
  };

  return connectDragSource(
    <div key={id} style={itemContainerStyle} className={"ItemDrawerItemSource"}>
      <div
        onClick={onItemClick}
        onDoubleClick={onItemDoubleClick}
        onMouseEnter={onItemMouseEnter}
        onMouseLeave={onItemMouseLeave}
        className={props.isReady ? "ItemDrawerDragItemSource" : ""}
      >
        <div className={classes.imageBg}>
          <img alt="profile" src={itemData.image} className={classes.imgCss} />
        </div>
        <div className={classes.itemName}>{itemData.name}</div>
      </div>
    </div>
  );
};

/**
 * The collecting function. It should return a plain object of the props to inject into your component
 * @param connect 
 * @param monitor 
 */
function collect(connect: any, monitor: any) {
  return {
    connectDragSource: connect.dragSource(),
  };
}

/**
 * Specifies the drag source contract.
 * Only `beginDrag` function is required.
 */
const cardSource = {
  /**
   * When the dragging starts, beginDragis called. You must return a plain JavaScript object describing the data being dragged
   * @param props 
   * @param monitor 
   * @param component 
   */
  beginDrag(props: any, monitor: any, component: any) {
    // Return the data describing the dragged item
    const item = props.itemData;
    props.onItemDrag(item);
    return item;
  },
  
  /** When the dragging stops, endDragis called */
  canDrag(props: any) {
    // You can disallow drag based on props
    return props.isReady;
  },
};

export default withStyles(useStyles)(
  DragSource("SOURCE", cardSource, collect)(SourceBox)
);
