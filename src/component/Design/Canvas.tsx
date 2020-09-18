import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import SourceBox from "./SourceBox";
import TargetBox from "./TargetBox";
import _ from "lodash";

/* Canvas props */
export interface canvasProps {
  name: string; // assuming name and title are same
  items: any[];
  itemContainer?: React.ReactType;
  itemContainerStyle?: object;
  location: string;
  title: string;
  showTitle: boolean;
  searchIsEnabled: boolean;
  searchComponent?: React.ReactType;
  disableDragAndDrop: boolean;
  closeButtonIsShowing: boolean;
  closeButton?: React.ReactType;
  style?: object;
  dndName: string;
}

/**
 * Custom hook to be called when ItemDrawer, ItemDrawerSearch renders
 * @param event
 */
const onComponentRender = (event: any) => {
  console.log(event);
  return true;
};

/**
 * Custom hook to be called when ItemDrawerItems generate
 * @param event
 */
const onListItems = (event: any) => {
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

/* Canvas view with drawer options*/
const Canvas = (props: canvasProps) => {
  const styles: any = useStyles();
  const groupBy = (xs: any, key: string) => {
    if (xs.length > 0) {
      return xs.reduce(function(rv: any, x: any) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
      }, {});
    } else {
      return [];
    }
  };

  const [openDrawer, setOpenDrawer] = useState(false);
  const [droppedItem, setDroppedItem] = useState([]);
  const [arrayCat, setArrayCat] = useState([]);

  useEffect(() => {
    const itemData = groupBy(props.items, "group");
    setArrayCat(itemData);
  }, [props.items]);

  /**
   * On click of button opens and closes the drawer
   */
  const onPressButton = () => {
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
   * Function is called on item drag
   * @param item
   */
  const onItemDrag = (item: any) => {
    onEventTrigger("ItemDrawerDragItem");
    console.log("onItemDrag", item);
  };

  /**
   * FUnction is called on item search
   * @param event
   */
  const onSearch = (event: any) => {
    onEventTrigger("ItemDrawerSearch");
    let searchText = event.target.value.trim();
    const arraySearchedResults = props.items.filter(function(item: any) {
      return item.name.toLowerCase().includes(searchText.toLowerCase());
    });
    setArrayCat(groupBy(arraySearchedResults, "group"));
  };

  /**
   * Renders search for item
   */
  const SearchItems = () => {
    onComponentRender("ItemDrawerSearch");
    const search = _.debounce(function(event: any) {
      onSearch(event);
    }, 1000);

    const onChange = (event: any) => {
      event.persist();
      search(event);
    };

    const resetSearch = () => {
      setArrayCat(groupBy(props.items, "group"));
    };

    return (
      <div>
        <input
          type="text"
          name="search"
          onChange={onChange}
          className={styles.inputRoot + " form-control search-input"}
          placeholder="Search by name"
        />
        <button className={styles.btn} onClick={resetSearch}>
          Reset
        </button>
      </div>
    );
  };

  /**
   * Renders drawer item
   * @param arrayCatItems
   */
  const renderItems = (arrayCatItems: any) => {
    onListItems("ItemDrawerItems");
    return (
      <Grid container item xs={12} spacing={3}>
        {arrayCatItems.map((data: any, i: number) => {
          return (
            <span key={i} className={"ItemDrawerItems"}>
              <SourceBox
                itemData={data}
                onItemDrag={onItemDrag}
                id={data.name}
                itemContainerStyle={props.itemContainerStyle}
                isReady={!props.disableDragAndDrop}
              />
            </span>
          );
        })}
      </Grid>
    );
  };

  /**
   * Renders drawer
   */
  const renderDrawer = () => {
    onComponentRender("ItemDrawer");
    return (
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
                classes: styles.closeBtn
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
            <SearchItems />
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
                {props.itemContainer
                  ? React.createElement(props.itemContainer, {
                      items: arrayCat[group]
                    })
                  : renderItems(arrayCat[group])}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

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

          {openDrawer && renderDrawer()}
        </DndProvider>
        <div className={styles.floationgBtnCss}>
          <div
            className={`${styles.text} drawerButton`}
            onClick={onPressButton}
          >
            +
          </div>
        </div>
      </div>
    </div>
  );
};

export default Canvas;

/* styles for view*/
const useStyles = makeStyles(theme => ({
  container: {
    flex: 1,
    backgroundColor: "#c0d6e4"
  },
  containerItem: {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    position: "absolute"
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
    boxShadow: "0 10px 2px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)"
  },
  overlayFromRight: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    width: "30%",
    backgroundColor: "#f2f2f2",
    opacity: 1.0,
    boxShadow: "0 10px 2px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)"
  },
  overlayFromBottom: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    width: "100%",
    backgroundColor: "#f2f2f2",
    opacity: 1.0,
    boxShadow: "0 10px 2px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)"
  },
  overlayFromLeft: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    width: "30%",
    backgroundColor: "#f2f2f2",
    opacity: 1.0,
    boxShadow: "0 10px 2px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)"
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
    boxShadow: "0 10px 2px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)"
  },
  text: {
    width: "100%",
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
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
    display: "flex"
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  inputRoot: {
    color: "inherit",
    top: "30px",
    marginBottom: "20px",
    marginTop: "10px",
    width: "70%",
    margin: "0 auto",
    paddingLeft: 10,
    marginLeft: "7px",
    height: "30px",
    border: "1px solid #ddd",
    borderRadius: "20px"
  },

  closeBtn: {
    fontSize: 12,
    width: "50px",
    color: "#999",
    textAlign: "center",
    right: 0,
    position: "absolute",
    top: 10
  },

  btn: {
    color: "white",
    backgroundColor: "blue",
    borderRadius: "10px",
    padding: "5px"
  },

  catName: {
    marginBottom: "20px",
    color: "black",
    fontSize: 20,
    marginLeft: "-10px"
  },

  menuHeader: {
    marginBottom: "20px",
    color: "black",
    fontSize: 20,
    marginTop: "20px",
    marginLeft: "7px",
    textAlign: "center"
  },

  headerView: {
    height: 65,
    boxShadow: "0 1px 22px rgba(0,0,0,0.19), 0 0px 1px rgba(0,0,0,0.23)",
    alignItems: "center",
    justifyContent: "center",
    display: "flex"
  },

  testNew: {
    backgroundColor: "red !important",
    width: "4.5vw",
    margin: "11px 5px",
    lineHeight: "20px"
  },

  canvasHeader: {
    color: "black",
    textAlign: "center"
  }
}));
