import './Letter.css';

interface Props {
  onClose?: () => void;
}

export default function Letter({ onClose }: Props) {
  return (
    <div className="boarding-pass flat-panel">

      {/* Main Ticket Section */}
      <div className="bp-main">
        <div className="bp-header">
          <div className="airline-name">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.2-1.1.7l-1.2 3.6c-.1.4.1.9.5 1.1L10 14.5l-4 4-3-1-2 2 5 2 2 5 2-2-1-3 4-4 2.9 7c.2.4.7.6 1.1.5l3.6-1.2c.5-.2.8-.6.7-1.1z" /></svg>
            <span>LOVE AIRLINES</span>
          </div>
          <div className="bp-flight-class">FIRST CLASS</div>
        </div>

        <div className="bp-body">
          <div className="bp-row">
            <div className="bp-field">
              <span className="bp-label">PASSENGER NAME</span>
              <span className="bp-value">You & Me</span>
            </div>
          </div>

          <div className="bp-row destination-row">
            <div className="bp-field">
              <span className="bp-label">FROM</span>
              <span className="bp-value lg">TODAY</span>
            </div>
            <div className="plane-icon-large">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.2-1.1.7l-1.2 3.6c-.1.4.1.9.5 1.1L10 14.5l-4 4-3-1-2 2 5 2 2 5 2-2-1-3 4-4 2.9 7c.2.4.7.6 1.1.5l3.6-1.2c.5-.2.8-.6.7-1.1z" /></svg>
            </div>
            <div className="bp-field right-align">
              <span className="bp-label">TO</span>
              <span className="bp-value lg">FOREVER</span>
            </div>
          </div>

          <div className="bp-row flex-4">
            <div className="bp-field">
              <span className="bp-label">FLIGHT</span>
              <span className="bp-value">HBD-2026</span>
            </div>
            <div className="bp-field">
              <span className="bp-label">DATE</span>
              <span className="bp-value">ALWAYS</span>
            </div>
            <div className="bp-field">
              <span className="bp-label">GATE</span>
              <span className="bp-value">HEART</span>
            </div>
            <div className="bp-field">
              <span className="bp-label">SEAT</span>
              <span className="bp-value">NEXT 2 U</span>
            </div>
          </div>

          <div className="bp-message-box">
            <p className="bp-message">
              Happy Birthday, my dearest. Every single moment spent with you feels like a dream. Thank you for being my rock, my joy, and my everything. I can't wait to see what the future holds for us. I love you more than words can express.
            </p>
          </div>
        </div>
      </div>

      {/* Perforated Divider */}
      <div className="bp-divider">
        <div className="notch top"></div>
        <div className="notch bottom"></div>
      </div>

      {/* Stub Section */}
      <div className="bp-stub">
        <div className="bp-stub-top">
          <div className="bp-field">
            <span className="bp-label">PASSENGER</span>
            <span className="bp-value sm">You & Me</span>
          </div>
          <div className="bp-field">
            <span className="bp-label">DESTINATION</span>
            <span className="bp-value sm">Forever</span>
          </div>
        </div>

        <div className="bp-barcode-container">
          <div className="barcode-bars"></div>
          <span className="barcode-numbers">0123 4567 8901 2026</span>
        </div>

        {onClose && (
          <button className="bp-close-btn" onClick={onClose}>
            Put Down Ticket
          </button>
        )}
      </div>

    </div>
  );
}
