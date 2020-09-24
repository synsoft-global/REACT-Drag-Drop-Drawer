import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { onComponentRender, onEventTrigger, onListItems } from "../Canvas/Canvas";
import { groupBy } from "lodash";
import { Grid } from "@material-ui/core";
import SourceBox from "../Canvas/SourceBox";
import SearchItems from "../Search";
import { group } from "console";
import Items from "../Items";

export interface drawerProps {
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
 * Component to render drawer
 */
const Drawer = (props: any) => {
  /** Call to onComponentRender hook when drawer is rendered*/
  onComponentRender("ItemDrawer");
  const styles: any = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [arrayCat, setArrayCat] = useState([]);

  /**
   * On click of button opens and closes the drawer
   */
  const onPressButton = () => {
    console.log("onPressButton", openDrawer);
    setOpenDrawer(!openDrawer);
  };

  /**
   * On click of button closes the drawer
   */
  const onClose = () => {
    onEventTrigger("ItemDrawerClose");
    setOpenDrawer(false);
  };
  /**
   * This function is used to group an array based on key sent in params
   * @param xs - array list
   * @param key - based on which the array will be grouped
   */
  const groupBy = (xs: any, key: string) => {
    if (xs.length > 0) {
      return xs.reduce(function (rv: any, x: any) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
      }, {});
    } else {
      return [];
    }
  };

  /**
   * This hook is used to update the arrayCat state on change in items prop
   */
  useEffect(() => {
    const itemData = groupBy(props.items, "group");
    setArrayCat(itemData);
  }, [props.items]);

  /**
   * Function is called on item search
   * @param event
   */
  const onSearch = (event: any) => {
    onEventTrigger("ItemDrawerSearch");
    let searchText = event.target.value.trim();
    const arraySearchedResults = props.items.filter(function (item: any) {
      return item.name.toLowerCase().includes(searchText.toLowerCase());
    });
    setArrayCat(groupBy(arraySearchedResults, "group"));
  };

  /** Reset serach in case any filter is added */
  const resetSearch = () => {
    setArrayCat(groupBy(props.items, "group"));
  };

  return (
    <>
      {openDrawer && (
        <div
          className={`${
            styles["overlayFrom" + props.location]
          } ItemDrawerLocation${props.location}`}
          style={props.style}
        >
          {props.showTitle && (
            <div className={`${styles.menuHeader} 'menuHeaderTitle'`}>
              {props.title}
            </div>
          )}
          {props.closeButtonIsShowing && (
            <>
              {props.closeButton ? (
                React.createElement(props.closeButton, {
                  onClose,
                  classes: styles.closeBtn,
                })
              ) : (
                <div
                  className={`${styles.closeBtn} 'closeBtn'`}
                  onClick={onClose}
                >
                  X
                </div>
              )}
            </>
          )}
          {props.searchIsEnabled ? (
            props.searchComponent ? (
              React.createElement(props.searchComponent, { onSearch })
            ) : (
              <SearchItems onSearch={onSearch} resetSearch={resetSearch} />
            )
          ) : null}

          {Object.keys(arrayCat).map((group: any, index: number) => {
            return (
              <div
                key={index}
                className="thumbnail-box"
                style={{ margin: 20, marginBottom: 40 }}
              >
                <div className={styles.catName}>{group}</div>
                <div className="testNew">
                  {props.itemContainer ? (
                    React.createElement(props.itemContainer, {
                      items: arrayCat[group],
                    })
                  ) : (
                    <Items
                      arrayCatItems={arrayCat[group]}
                      itemContainerStyle={props.itemContainerStyle}
                      disableDragAndDrop={props.disableDragAndDrop}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
      <div className={styles.floationgBtnCss}>
        <div className={`${styles.text} drawerButton`} onClick={onPressButton}>
          +
        </div>
      </div>
    </>
  );
};

export default Drawer;

/* styles for view*/
const useStyles = makeStyles(() => ({
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
  overlayFromTop: {
    position: "absolute",
    // top: 0,
    right: 0,
    height: "auto",
    // width: "100%",
    left: 0,
    backgroundColor: "#f2f2f2",
    opacity: 1.0,
    boxShadow: "0 10px 2px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
  },
  overlayFromRight: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    width: "30%",
    backgroundColor: "#f2f2f2",
    opacity: 1.0,
    boxShadow: "0 10px 2px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
  },
  overlayFromBottom: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    width: "100%",
    backgroundColor: "#f2f2f2",
    opacity: 1.0,
    boxShadow: "0 10px 2px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
  },
  overlayFromLeft: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    width: "30%",
    backgroundColor: "#f2f2f2",
    opacity: 1.0,
    boxShadow: "0 10px 2px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
  },
  overlayFromInline: {
    width: "45%",
    height: "auto",
    position: "absolute",
    top: "20%",
    bottom: 0,
    left: 0,
    right: 0,
    margin: "auto",
    boxShadow: "0 10px 2px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
  },
  closeBtn: {
    fontSize: 12,
    width: "50px",
    color: "#999",
    textAlign: "center",
    right: 0,
    position: "absolute",
    top: 10,
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

  testNew: {
    backgroundColor: "red !important",
    width: "4.5vw",
    margin: "11px 5px",
    lineHeight: "20px",
  },
}));
