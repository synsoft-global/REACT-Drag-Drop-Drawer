import * as React from "react";
import { DropTarget } from "react-dnd";
import { Grid } from "@material-ui/core";
import { withStyles, WithStyles } from "@material-ui/core";
import { Theme, createStyles } from "@material-ui/core/styles";

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
    targetLeft: {
      left: "40% !important",
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

    containerItem: {
      top: 100,
      left: 30,
      bottom: 0,
      right: 0,
      position: "absolute",
    },
    itemName: {
      textAlign: "center",
      marginRight: 20,
      marginBottom: 10,
    },
  });

/**
 * Interface for TargetBox props
 */
interface IProps extends WithStyles<typeof useStyles> {
  /**
   * Call this function inside render()
   *  to let React DnD handle the drag events:
   */
  connectDropTarget?: any;
  /** Function called when item is dropped */
  onItemDrop?: any;
  /** Item that is being dropped */
  droppedItem?: any;
  /** location of the item */
  location: string;
}

/**
 * Component to render drop box 
 */
class TargetBox extends React.Component<IProps> {
  render() {
    const { connectDropTarget, droppedItem, location } = this.props;
    const classes: any = this.props.classes;

    return connectDropTarget(
      <div
        className={`${classes["target" + location]} ${classes.containerItem}`}
      >
        {droppedItem && (
          <Grid container item xs={12} spacing={3}>
            {droppedItem.map((data: any, i: number) => (
              <div key={i}>
                <div className={classes.imageBg}>
                  <img
                    alt="profile"
                    src={data.image}
                    className={classes.imgCss}
                  />
                </div>
                <div className={classes.itemName}>{data.name}</div>
              </div>
            ))}
          </Grid>
        )}
      </div>
    );
  }
}

const spec = {
  drop(props: any, monitor: any, component: any) {
    const item = monitor.getItem();
    props.onItemDrop(item);
  },
};

/**
 * Specifies which props to inject into your component.
 */
function collect(connect: any, monitor: any) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
  };
}

export default withStyles(useStyles)(
  DropTarget("SOURCE", spec, collect)(TargetBox)
);
