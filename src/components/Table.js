import React from "react";

function Table(props) {
  const tableRows = props.items.map((item) => (
    <TableRow key={item.id} item={item} onClick={props.onClick} />
  ));

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
        <IconButton icon={"/trash.svg"} />
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
