const DisplayTimes = (prop) => {
    if (!prop.time) {
      console.log('its null')
      return null;
    }
    const DisplayTime = (hour, minute) => {
      let time = '';
      let extra = 0;
      if (minute > 60) {
        extra = Math.floor(minute/60);
        hour += extra;
      }
      if (hour !== 0) {
        time += hour + ' hr';
      }
      if (hour > 1) {
        time += 's';
      }
      if (minute !== 0) {
        if (extra) {
          minute -= extra*60;
        }
        time += ' ' + minute + ' min';
      }
      if (minute > 1) {
        time += 's';
      }
      if (time === '') {
        time = 0 + ' mins';
      }
      return time;
    };
  
    if (!prop) {
      return null;
    }
    return (
      <div className="Timer">
        <div className="TimeName">
          Prep Time
          <div className="TimeNumber">
            {DisplayTime(prop.time.prepHour, prop.time.prepMin)}
          </div>
        </div>
        <div className="TimeName">
          Cook Time
          <div className="TimeNumber">
            {DisplayTime(prop.time.cookHour, prop.time.cookMin)}
          </div>
        </div>
        <div className="TimeName">
          Total Time
          <div className="TimeNumber">
            {DisplayTime(
              prop.time.prepHour + prop.time.cookHour,
              prop.time.prepMin + prop.time.cookMin
            )}
          </div>
        </div>
      </div>
    );
  };
  export default DisplayTimes;