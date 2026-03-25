export default function App() {
  return (
    <div className="container">

      <div className="panel" style={{ textAlign: "center" }}>
        <h1 className="fire" style={{ fontSize: 60 }}>ESCOBAR</h1>
        <p>AARHUS · DENMARK</p>
      </div>

      <div className="panel nav">
        <a>HOME</a>
        <a>RADIO</a>
        <a>EVENTS</a>
        <a>MERCH</a>
        <a>CONTACT</a>
      </div>

      <div className="grid">
        <div className="panel">
          <h2 className="fire">VINYL OF THE NIGHT</h2>
          <h1>BLACK SABBATH</h1>
          <h2 className="fire">PARANOID</h2>
        </div>

        <div className="panel">
          <h2 className="fire">RADIO</h2>
          <p>Motörhead - Ace of Spades</p>
        </div>
      </div>

      <div className="panel">
        <h2 className="fire">EVENTS</h2>

        <div className="event">
          <span>Metal Karaoke</span>
          <span>May 10</span>
        </div>

        <div className="event">
          <span>Rock Night</span>
          <span>May 18</span>
        </div>
      </div>

      <div className="panel">
        <h2 className="fire">MERCH</h2>

        <div className="merch-grid">
          <div>TEE</div>
          <div>MUG</div>
          <div>STICKERS</div>
          <div>PATCH</div>
        </div>

        <button className="btn" style={{ marginTop: 20 }}>
          SHOP
        </button>
      </div>

    </div>
  );
}