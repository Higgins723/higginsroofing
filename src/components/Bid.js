import React, { useEffect, useState } from 'react';
import { cloneDeep } from 'lodash';
import axios from 'axios';
import moment from 'moment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Bid = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [bid, setBid] = useState(null);

  const getBid = () => {
    const { match: { params } } = props;

    axios.get(`https://higginsroofingapi.herokuapp.com/api/bidsheet/${params.id}/`, {
      headers: {"Authorization" : `JWT ${props.userData.token}`}
    })
      .then(response => {
        setBid(response.data);
      })
      .catch(error => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoaded(true);
      });
  }

  useEffect(() => {
    if (bid === null && !isLoaded) {
      getBid();
    }
  })

  const onChange = (key, value) => {
    const b = cloneDeep(bid);
    b[key] = value;

    if (key === 'total_materials_and_labor' || key === 'total_for_extras') {
      let total = Number(b['total_materials_and_labor']);
      let extras = Number(b['total_for_extras']);
      const grand_total = total + extras;
      b['grand_total'] = grand_total.toString();
    }

    setBid(b);
  }

  return (
    <div className="row">
      {!isLoaded ? (
        <div className="spinner-grow mx-auto mt-5" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        hasError ? (
          <div className="mt-5 text-center h4">
            <span className="text-danger">Error fetching data for bid.</span>
          </div>
        ) : (
          <div className="col-12">
            <div className="col-12 mt-5 mb-3 border-bottom">
              <h2>Bid Sheet</h2>
            </div>
            <form>
              <div className="form-group">
                <label>Job name</label>
                <input onChange={(event) => onChange('job_name', event.target.value)} type="text" className="form-control" value={bid.job_name} />
              </div>
              <div className="form-group">
                <label>Bill to</label>
                <input onChange={(event) => onChange('bill_to', event.target.value)} type="text" className="form-control" value={bid.bill_to} />
              </div>
              <div className="form-group">
                <label>Email address</label>
                <input onChange={(event) => onChange('email', event.target.value)} type="email" className="form-control" value={bid.email} placeholder="name@example.com" />
              </div>
              <div className="form-group">
                <label>Address</label>
                <input onChange={(event) => onChange('address', event.target.value)} type="text" className="form-control" value={bid.address} />
              </div>
              <div className="form-group">
                <label>City</label>
                <input onChange={(event) => onChange('city', event.target.value)} type="text" className="form-control" value={bid.city} />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input onChange={(event) => onChange('phone', event.target.value)} type="text" className="form-control" value={bid.phone} />
              </div>
              <div className="form-group">
                <label>Order taken by</label>
                <input onChange={(event) => onChange('order_taken_by', event.target.value)} type="text" className="form-control" value={bid.order_taken_by} />
              </div>
              <div className="form-group">
                <label>Date ordered</label>
                <br />
                <DatePicker
                  className="form-control"
                  selected={moment(Date.parse(bid.date_ordered)).toDate()}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={30}
                  dateFormat="MMMM d, yyyy h:mm aa"
                  timeCaption="Time"
                  onChange={(date) => onChange('date_ordered', `${date}`)}
                />
              </div>
              <div className="form-group">
                <label>Date promised</label>
                <br />
                <DatePicker
                  className="form-control"
                  selected={moment(Date.parse(bid.date_promised)).toDate()}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={30}
                  dateFormat="MMMM d, yyyy h:mm aa"
                  timeCaption="Time"
                  onChange={(date) => onChange('date_promised', `${date}`)}
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea onChange={(event) => onChange('description', event.target.value)} className="form-control" value={bid.description} rows="3"></textarea>
              </div>
              <div className="form-group">
                <label>Total for materials and labor</label>
                <input onChange={(event) => onChange('total_materials_and_labor', event.target.value)} type="text" className="form-control" value={bid.total_materials_and_labor} />
              </div>
              <div className="form-group">
                <label>Extras</label>
                <textarea onChange={(event) => onChange('extras', event.target.value)} className="form-control" value={bid.extras} rows="3"></textarea>
              </div>
              <div className="form-group">
                <label>Total for extras</label>
                <input onChange={(event) => onChange('total_for_extras', event.target.value)} type="text" className="form-control" value={bid.total_for_extras} />
              </div>
              <div className="form-group">
                <label>Grand total</label>
                <input disabled type="text" className="form-control" value={bid.grand_total} />
              </div>
            </form>
          </div>
        )
      )}
    </div>
  )
}

export default Bid;