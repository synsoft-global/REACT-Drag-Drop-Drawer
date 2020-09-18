import * as React from "react";
import { DragSource } from "react-dnd";
import { withStyles, WithStyles } from "@material-ui/core";
import { Theme, createStyles } from "@material-ui/core/styles";
import { onEventTrigger } from "./Canvas";

/**
 * Defining `IProps`
 * It will defines the structure of props
 */
const useStyles = (theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(1),
      textAlign: "center",
      color: theme.palette.text.secondary,
      marginRight: "5px",
      marginTop: "5px"
    },

    imageBg: {
      backgroundColor: "#ddd",
      width: 80,
      height: 80,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 20,
      marginBottom: 10,
      display: "flex"
    },

    imgCss: {
      width: 60,
      height: 60
    },

    itemName: {
      textAlign: "center",
      marginRight: 20,
      marginBottom: 10
    }
  });

interface IProps extends WithStyles<typeof useStyles> {
  id: any;
  itemData: any;
  isReady: boolean;
  onItemDrag: Function;
  connectDragSource?: any;
  itemContainerStyle?: any;
}

const SourceBox = (props: IProps) => {
  const {
    connectDragSource,
    itemData,
    id,
    classes,
    itemContainerStyle
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

function collect(connect: any, monitor: any) {
  return {
    connectDragSource: connect.dragSource()
  };
}

const cardSource = {
  beginDrag(props: any, monitor: any, component: any) {
    const item = props.itemData;
    props.onItemDrag(item);
    return item;
  },
  canDrag(props: any) {
    // You can disallow drag based on props
    return props.isReady;
  }
};

export default withStyles(useStyles)(
  DragSource("SOURCE", cardSource, collect)(SourceBox)
);
