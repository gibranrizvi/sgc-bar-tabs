import React from 'react';
import { format } from 'date-fns';

import ItemsList from '../items-list/ItemsList';

const OrdersList = ({ orders }) => {
  const [showingAll, setShowingAll] = React.useState(false);

  const renderList = () =>
    orders.map((order, index) => (
      <li key={index}>
        <strong className="text-muted">
          {format(order.createdAt.toDate(), 'HH:mm, dd/MM/yyyy')}
        </strong>{' '}
        - SR {order.total}.00
        <ItemsList items={order.items} />
      </li>
    ));

  return (
    <div className="text-left">
      <p
        className="text-muted pointer mb-1"
        onClick={() => setShowingAll(prev => !prev)}
      >
        {showingAll ? 'Hide' : 'Show'}
      </p>
      <ul>{showingAll && renderList()}</ul>
    </div>
  );
};

export default OrdersList;
