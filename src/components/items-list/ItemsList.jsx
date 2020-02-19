import React from 'react';

const ItemsList = ({ items }) => {
  const renderList = () =>
    items.map(item => (
      <li key={item.id} className="mb-1">
        {item.name} x {item.count} - SR {item.price * item.count}.00
      </li>
    ));

  return (
    <div className="text-left ml-4">
      <ul>{renderList()}</ul>
    </div>
  );
};

export default ItemsList;
