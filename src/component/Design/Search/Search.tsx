import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { onComponentRender } from "../Canvas/Canvas";
import _ from "lodash";

export interface searchProps {
  onSearch: Function;
  resetSearch: Function;
}

/**
 * Search component to render search
 */
const SearchItems = (props: searchProps) => {
  /** Call to onComponentRender hook on render of search component */
  onComponentRender("ItemDrawerSearch");
  const styles: any = useStyles();

  /** Debounce call to onsearch function */
  const search = _.debounce(function (event: any) {
    props.onSearch(event);
  }, 1000);

  /** On change call search debounce function */
  const onChange = (event: any) => {
    event.persist();
    search(event);
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
      <button className={styles.btn} onClick={() => props.resetSearch()}>
        Reset
      </button>
    </div>
  );
};

export default SearchItems;

/* styles for view*/
const useStyles = makeStyles((theme) => ({
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
    borderRadius: "20px",
  },
  btn: {
    color: "white",
    backgroundColor: "blue",
    borderRadius: "10px",
    padding: "5px",
  },
}));
