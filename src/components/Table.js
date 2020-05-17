import React, { useState, useEffect } from "react";

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

  return (
    <table className="table">
      <thead>
        <tr>
          <th id="name" onClick={sortItems} scope="col">
            Name
          </th>
          <th id="email" onClick={sortItems} scope="col">
            E-mail address
          </th>
          <th id="phoneNum" onClick={sortItems} scope="col">
            Phone number
          </th>
          <th scope="col"></th>
        </tr>
      </thead>

      <tbody>{tableRows}</tbody>
    </table>
  );
}

function TableRow(props) {
  const item = props.item;
  return (
    <tr>
      <th scope="row">{item.name}</th>
      <th scope="row">{item.email}</th>
      <th scope="row">{item.phoneNum}</th>
      <th scope="row">
        <IconButton
          onClick={() => props.onClick(item.id)}
          icon={"/pencil.svg"}
        />
        <IconButton
          onClick={() => props.onDelete(item.id)}
          icon={"/trash.svg"}
        />
      </th>
    </tr>
  );
}

function IconButton(props) {
  return (
    <button type="button" className="btn btn-link" onClick={props.onClick}>
      <img src={props.icon} alt="button icon"></img>
    </button>
  );
}

export default Table;
