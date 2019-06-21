import React, { useEffect, useState } from 'react';
import { orderBy } from 'lodash';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BidSheet = (props) => {
  const [hasError, setHasError] = useState(false);
  const [bids, setBids] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const numberFormat = (number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(number));
  }

  const trunc = (s) => {
    if (s.length > 20) {
      return s.substr(0, 20) + '...';
    } else {
      return s;
    }
  }

  const getBids = () => {
    axios.get('https://higginsroofingapi.herokuapp.com/api/bidsheet/', {
      headers: {"Authorization" : `JWT ${props.userData.token}`}
    })
      .then(response => {
        setBids(orderBy(response.data, ['id'], ['desc']));
      })
      .catch(error => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoaded(true);
      });
  }

  useEffect(() => {
    if (bids === null && !isLoaded) {
      getBids();
    }
  });

  return (
    <div className="row">
      <div className="col-12 mt-5 mb-3 border-bottom">
        <h2>Bid Sheets</h2>
      </div>
      {isLoaded ? (
        hasError ? (
          <div className="mt-5 text-center h4">
            <span className="text-danger">Error fetching bidsheets, please refresh page.</span>
          </div>
        ) : (
          bids.map(i => (
            <div key={i.id} className="col-lg-4 col-md-6 col-xs-12">
              <div className="card bw mt-3 mb-3">
                <div className="card-body">
                  <h5 className="card-title border-bottom">{i.job_name}</h5>
                  <p className="card-text">{trunc(i.description)}</p>
                  <p className="card-text"><b>Bill to:</b> {i.bill_to}</p>
                  <p className="card-text"><b>Phone:</b> {i.phone}</p>
                  <p className="card-text"><b>Total:</b> {numberFormat(i.grand_total)}</p>
                  <Link to={`/bid/${i.id}/`} className="btn btn-primary">See More</Link>
                </div>
              </div>
            </div>
          ))
        )
      ) : (
        <div className="text-center mt-4 mx-auto">
          <div className="spinner-grow" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default BidSheet;
