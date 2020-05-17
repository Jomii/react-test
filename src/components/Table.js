import React, { useState, useEffect } from "react";
import arrowUp from "../icons/arrow-up-short.svg";
import arrowDown from "../icons/arrow-down-short.svg";
import pencilIcon from "../icons/pencil.svg";
import trashIcon from "../icons/trash.svg";

function Table(props) {
  const [items, setItems] = useState(props.items);
  const [sortedBy, setSortedBy] = useState("name");
  const [ascending, isAscending] = useState(true);

  useEffect(() => {
    setItems(props.items);
  }, [props.items]);

  function sortItems(e) {
    const types = {
      name: "name",
      email: "email",
      phoneNum: "phoneNum",
    };

    const sortProperty = types[e.target.id];

    if (sortProperty !== sortedBy) {
      // Set to ascending order when changing sort property
      isAscending(true);
    } else {
      isAscending(!ascending);
    }

    setSortedBy(sortProperty);
  }

  // Sort string values by sortedBy key in ascending/descending order
  function itemSort(a, b) {
    if (!ascending) return ("" + b[sortedBy]).localeCompare(a[sortedBy]);

    return ("" + a[sortedBy]).localeCompare(b[sortedBy]);
  }

  const tableRows = items
    .sort(itemSort)
    .map((item) => (
      <TableRow
        key={item.id}
        item={item}
        onClick={props.onClick}
        onDelete={props.onDelete}
      />
    ));
  
  const arrow = (<span className="arrow"><img src={ascending ? arrowUp : arrowDown} alt="arrow icon"></img></span>)

  return (
    <div className="table-responsive  mt-2 ">
      <table className="table mb-1">
        <thead>
          <tr >
            <th id="name"  onClick={sortItems} scope="col">
              Name {sortedBy === "name" && arrow}
            </th>
            <th id="email" onClick={sortItems} scope="col">
              E-mail address {sortedBy === "email" && arrow}
            </th>
            <th id="phoneNum" onClick={sortItems} scope="col">
              Phone number {sortedBy === "phoneNum" && arrow}
            </th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>

        <tbody>{tableRows}</tbody>
      </table>
    </div>
  );
}

function TableRow(props) {
  const item = props.item;
  return (
    <tr>
      <td>{item.name}</td>
      <td>{item.email}</td>
      <td>{item.phoneNum}</td>
      <td></td>
      <td className="pr-2">
        <div className="float-right">
          <IconButton
            onClick={() => props.onClick(item.id)}
            icon={pencilIcon}
          />
          <IconButton
            onClick={() => props.onDelete(item.id)}
            icon={trashIcon}
          />
        </div>
      </td>
    </tr>
  );
}

function IconButton(props) {
  return (
    <button type="button" className="btn btn-link" onClick={props.onClick}>
      <img src={props.icon} alt="button icon" width="24" height="24"></img>
    </button>
  );
}

export default Table;
