import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { onComponentRender, onListItems, onEventTrigger } from "../Canvas/Canvas";
import { Grid } from "@material-ui/core";
import SourceBox from "../Canvas/SourceBox";

export interface itemProps {
  arrayCatItems: any[];
  itemContainerStyle: Object;
  disableDragAndDrop: boolean;
}

/**
 * Component to render drawer item
 */
const Items = ({
  arrayCatItems,
  itemContainerStyle,
  disableDragAndDrop,
}: itemProps) => {
  /** Call to onListItems hook when drawer items are rendered*/
  onListItems("ItemDrawerItems");

  /**
   * Function is called on item drag
   * @param item
   */
  const onItemDrag = (item: any) => {
    onEventTrigger("ItemDrawerDragItem");
    console.log("onItemDrag", item);
  };

  return (
    <Grid container item xs={12} spacing={3}>
      {arrayCatItems.map((data: any, i: number) => {
        return (
          <span key={i} className={"ItemDrawerItems"}>
            <SourceBox
              itemData={data}
              onItemDrag={onItemDrag}
              id={data.name}
              itemContainerStyle={itemContainerStyle}
              isReady={!disableDragAndDrop}
            />
          </span>
        );
      })}
    </Grid>
  );
};

export default Items;
