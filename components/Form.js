export default function Form() {
  async function submitHandler(e) {
    e.preventDefault();

    const resp = await fetch(
      `https://maps.googleapis.com/maps/api/directions/json?origin=london&destination=leeds&mode=transit&key=${process.env.REACT_APP_GOOGLE_MAPS_API}`
    );

    const data = await resp.json();
    console.log(data.routes);
  }

  return (
    <div>
      <form action="" onSubmit={submitHandler}>
        <div>From: </div>
        <input type="text" />
        <div>To: </div>
        <input type="text" />
        <input type="submit" />
      </form>
    </div>
  );
}

export async function getServerSideProps() {}
