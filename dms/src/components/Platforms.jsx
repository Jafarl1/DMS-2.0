import React, { useState } from 'react'
import arrow from '../assets/icons/arrow_down.svg'
import icon from '../assets/icons/platform.svg'
import Level4 from './Level4'


function Platforms({ data, parent }) {

  const [open, setOpen] = useState(false);

  function calcPeriod(a, b) {
    let date1 = new Date(a);
    let date2 = new Date(b);
    var time_difference = Math.abs(date2.getTime() - date1.getTime());
    var days_difference = Math.ceil(time_difference / (1000 * 3600 * 24));

    return (days_difference + 1);
  };
  let period = calcPeriod(data.period_start, data.period_end);
  let startDate = new Date(data.period_start).getDate();

  return (
    <div className='section'>
      <span className="section_name section_3" onClick={() => setOpen(!open)}>
        <img src={arrow} alt="Arrow" className={open ? 'opened' : ''} />
        <img src={icon} alt="Icon" />
        <span className='sub_length'>
          {data.sub ? data.sub.length : 0}
        </span>
        <span>
          {data.title}
        </span>
        <div className="on_schedule" style={{ paddingLeft: `${(startDate - 1) * 21}px` }}>
          <div
            className={parent ? "duration" : "duration_hidden"}
            style={{ border: '1px solid #2DB77B', background: '#CFF0D6', width: `${(period * 21) + 2}px` }}
          >
          </div>
          <p>
            {data.title}
          </p>
        </div>
      </span>
      <div className={open ? "section_body show_body" : "section_body"}>
        <Level4 data={data.sub[0]} parent={open} />
      </div>
    </div>
  )
}

export default Platforms