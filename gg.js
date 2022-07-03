const [resultBoolean, setResultBoolean] = useState(false);

<div>
{resultBoolean && <div>Green Energy</div>}
{resultBoolean ? (
  <div>You are doing well</div>
) : (
  <div>
    <div>
      driving:
      {driving.distance}, {driving.duration}
      <input
        type="radio"
        name="mode"
        value={`${driving.distance}&${driving.mode}`}
        data-mode="bicycle"
        onClick={handleClick}
      />
    </div>
    <div>
      walking:
      {walking.distance}, {walking.duration}
      <input
        type="radio"
        name="mode"
        value={`${walking.distance}&${walking.mode}`}
        data-mode="bicycle"
        onClick={handleClick}
      />
    </div>
    <div>
      distance:
      {transit.distance}, {transit.duration}
      <input
        type="radio"
        name="mode"
        value={`${transit.distance}&${transit.mode}`}
        data-mode="bicycle"
        onClick={handleClick}
      />
    </div>
    <div>
      bicycle:
      {bicycle.distance}, {bicycle.duration}
      <input
        type="radio"
        name="mode"
        value={`${bicycle.distance}&${bicycle.mode}`}
        data-mode="bicycle"
        onClick={handleClick}
      />
    </div>
    <input
      ref={sliderRef}
      type="range"
      min="1"
      max="7"
      step="1"
      onChange={handleChange}
      value={timesAWeek}
    />

    <div>{timesAWeek} days </div>
    <button onClick={handleSubmit}>Submit</button>
  </div>
)}
</div>