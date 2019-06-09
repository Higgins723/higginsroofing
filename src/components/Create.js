import React, { useState } from 'react';
import { addDays } from '../utils';
import { cloneDeep } from 'lodash';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Create = (props) => {
  const [isLoaded, setIsLoaded] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [bid, setBid] = useState({
    "job_name": "",
    "bill_to": "",
    "email": "",
    "address": "",
    "city": "",
    "phone": "",
    "order_taken_by": "",
    "date_ordered": `${new Date()}`,
    "date_promised": `${addDays(new Date(), 7)}`,
    "description": "",
    "total_materials_and_labor": "",
    "extras": "",
    "total_for_extras": "",
    "grand_total": ""
  });

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

  const onSubmit = (e) => {
    e.preventDefault();
    setIsLoaded(false);

    axios.post(`https://higginsroofingapi.herokuapp.com/api/bidsheet/`, bid, {
      headers: {"Authorization" : `JWT ${props.userData.token}`},
    })
      .then(response => {
        setRedirect(true);
      })
      .catch(error => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoaded(true);
      });
  }

  const redirectHome = () => {
    return <Redirect to="/" />
  }

  return (
    <div className="row">
      {redirect &&
        redirectHome()
      }

      {!isLoaded ? (
        <div className="spinner-grow mx-auto mt-5" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        hasError ? (
          <div className="mt-5 text-center h4">
            <span className="text-danger">Error creating bid.</span>
          </div>
        ) : (
          <div className="col-12 mb-5">
            <div className="col-12 mt-5 mb-3 border-bottom">
              <div className="mb-2">
                <span className="h2">Create Bid Sheet</span>
              </div>
            </div>
            <form onSubmit={(event) => onSubmit(event)}>
              <div className="form-group">
                <label>Job name</label>
                <input required onChange={(event) => onChange('job_name', event.target.value)} type="text" className="form-control" value={bid.job_name} />
              </div>
              <div className="form-group">
                <label>Bill to</label>
                <input required onChange={(event) => onChange('bill_to', event.target.value)} type="text" className="form-control" value={bid.bill_to} />
              </div>
              <div className="form-group">
                <label>Email address</label>
                <input required onChange={(event) => onChange('email', event.target.value)} type="email" className="form-control" value={bid.email} placeholder="name@example.com" />
              </div>
              <div className="form-group">
                <label>Address</label>
                <input required onChange={(event) => onChange('address', event.target.value)} type="text" className="form-control" value={bid.address} />
              </div>
              <div className="form-group">
                <label>City</label>
                <input required onChange={(event) => onChange('city', event.target.value)} type="text" className="form-control" value={bid.city} />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input required onChange={(event) => onChange('phone', event.target.value)} type="text" className="form-control" value={bid.phone} />
              </div>
              <div className="form-group">
                <label>Order taken by</label>
                <input required onChange={(event) => onChange('order_taken_by', event.target.value)} type="text" className="form-control" value={bid.order_taken_by} />
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
                  required
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
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea required onChange={(event) => onChange('description', event.target.value)} className="form-control" value={bid.description} rows="3"></textarea>
              </div>
              <div className="form-group">
                <label>Total for materials and labor</label>
                <input required onChange={(event) => onChange('total_materials_and_labor', event.target.value)} type="text" className="form-control" value={bid.total_materials_and_labor} />
              </div>
              <div className="form-group">
                <label>Extras</label>
                <textarea required onChange={(event) => onChange('extras', event.target.value)} className="form-control" value={bid.extras} rows="3"></textarea>
              </div>
              <div className="form-group">
                <label>Total for extras</label>
                <input required onChange={(event) => onChange('total_for_extras', event.target.value)} type="text" className="form-control" value={bid.total_for_extras} />
              </div>
              <div className="form-group">
                <label>Grand total</label>
                <input required disabled type="text" className="form-control" value={bid.grand_total} />
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary">Create</button>
              </div>
            </form>
          </div>
        )
      )}
    </div>
  )
}

export default Create;