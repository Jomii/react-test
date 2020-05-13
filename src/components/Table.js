import React from "react";

function Table(props) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">E-mail address</th>
          <th scope="col">Phone number</th>
          <th scope="col"></th>
        </tr>
      </thead>

      <TableRow tableItems={props.items} />
    </table>
  );
}

function TableRow(props) {
  const items = props.tableItems;
  const tableItems = items.map((item) => (
    <tr key={item.id}>
      <th scope="row">{item.name}</th>
      <th scope="row">{item.email}</th>
      <th scope="row">{item.phoneNum}</th>
      <th scope="row">
        <IconButton icon={"/pencil.svg"} />
        <IconButton icon={"/trash.svg"} />
      </th>
    </tr>
  ));

  return <tbody>{tableItems}</tbody>;
}

function IconButton(props) {
  return (
    <button type="button" className="btn btn-link">
      <img src={props.icon} alt="button icon"></img>
    </button>
  );
}

export default Table;
