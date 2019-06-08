import React from 'react';

const Bid = (props) => {
  const { match: { params } } = props;

  console.log(params.id);
  return (
    <div>bid</div>
  )
}

export default Bid;