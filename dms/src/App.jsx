import { useState, useEffect } from 'react'
import './assets/style.scss'
import download from './assets/icons/export.svg'
import Marketing from './components/Marketing';
import Loader from './components/Loader';


function App() {

  let [mounted, setMounted] = useState(false);
  const [data, setData] = useState({});
  const [firstDate, setFirstDate] = useState('')

  const loadData = async () => {
    await fetch('http://82.202.204.94/tmp/test.php')
      .then(res => res.json())
      .then(receive => { setData(receive), setMounted(true), setFirstDate(receive.chart.period_start) })
  };
  useEffect(() => {
    loadData();
  }, []);

  let allPeriod = new Date(`${firstDate.slice(0, -2)}01`),
    Till = new Date(),
    interval = [],
    weeks = [],
    days = [];

  function pad(s) {
    return ('00' + s).slice(-2)
  };
  while (allPeriod.getTime() < Till.getTime()) {
    interval.push('' + allPeriod.getFullYear() + '-' + pad(allPeriod.getMonth() + 1) + '-' + pad(allPeriod.getDate()));
    allPeriod.setDate(allPeriod.getDate() + 1);
  };
  for (let i = 0; i < 7; i++) {
    weeks[i] = interval.slice((i * 7), (i * 7) + 7);
  };
  for (let i = 0; i < 49; i++) {
    days.push(new Date(interval[i]).getDate())
  };
  const dateFormatter = (arr) => {
    let a = arr[0];
    let b = arr[arr.length - 1]
    let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let startDay = new Date(a).getDate(),
      endDay = new Date(b).getDate();
    if (startDay < 10) {
      startDay = `0${startDay}`;
    };
    if (endDay < 10) {
      endDay = `0${endDay}`;
    };
    let startMonth = monthNames[new Date(a).getMonth('MMM')],
      endMonth = monthNames[new Date(b).getMonth('MMM')];

    let startDate = `${startDay} ${startMonth}`,
      endDate = `${endDay} ${endMonth}`;

    return `${startDate} - ${endDate}`;
  };


  return (
    <div className="App">
      {
        mounted ?
          <>
            <div className="heading">
              <h1>
                {data.project} / {data.period}
              </h1>
              <button className='export_btn'>
                <img src={download} alt="Export" />
                Export
              </button>
            </div>
            <div className="table">
              <div className="items">
                <div className="item_head">
                  <span> Work item </span>
                </div>
                <div className="item_section"></div>
                <div className="item_section">
                  <Marketing data={data.chart} />
                </div>
              </div>
              <div className="schedule">
                <div className="schedule_head">
                  <div className="intervals">
                    {
                      weeks.map((e, i) => (
                        <div className="interval" key={i}>
                          {dateFormatter(e)}
                        </div>
                      ))
                    }
                  </div>
                  <div className="days">
                    {
                      days.map((e, i) => (
                        <div className="day" key={i}>
                          {e}
                        </div>
                      ))
                    }
                  </div>
                </div>
                <div className="schedule_body">
                  {
                    days.map((e, i) => (
                      <div className="date_chapter" key={i}>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
          </>
          :
          <div className="loading">
            <Loader />
          </div>
      }
    </div>
  )
}

export default App
