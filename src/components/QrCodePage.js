// // src/components/QrCodePage.js
// import React from 'react';
// import { QRCodeSVG } from 'qrcode.react';

// const QrCodePage = () => {
//   // Replace this with your actual deployed URL
//   const bookingUrl = 'https://clinic-frontend-ebon.vercel.app/book';

//   return (
//     <div>
//       <h2>Scan to Book an Appointment</h2>
//       <QRCodeSVG value={bookingUrl} size={256} />
//       <p>{bookingUrl}</p>
//     </div>
//   );
// };

// export default QrCodePage;


import React, { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';

const QrCodePage = () => {
  const bookingUrl = 'https://clinic-frontend-ebon.vercel.app/book';
  const qrRef = useRef(null);

  const downloadQR = () => {
    const svg = qrRef.current.querySelector('svg');
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svg);
    const canvas = document.createElement('canvas');
    const img = new Image();
    img.onload = () => {
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.href = pngFile;
      downloadLink.download = 'clinic-qr-code.png';
      downloadLink.click();
    };
    img.src = 'data:image/svg+xml;base64,' + btoa(svgString);
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2 style={{ marginBottom: '1.5rem' }}>📱 Scan to Book an Appointment</h2>

      <div
        ref={qrRef}
        style={{
          display: 'inline-block',
          padding: '1.5rem',
          border: '1px solid #ccc',
          borderRadius: '12px',
          backgroundColor: '#f9f9f9',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        <QRCodeSVG value={bookingUrl} size={256} />
      </div>

      <div style={{ marginTop: '1.5rem' }}>
        <button
          onClick={downloadQR}
          style={{
            padding: '0.6rem 1.2rem',
            fontSize: '1rem',
            borderRadius: '8px',
            backgroundColor: '#4caf50',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          ⬇️ Download QR Code
        </button>
      </div>

      <p style={{ marginTop: '1rem', fontSize: '1rem' }}>
        🔗{' '}
        <a
          href={bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#007bff', textDecoration: 'underline' }}
        >
          {bookingUrl}
        </a>
      </p>
    </div>
  );
};

export default QrCodePage;
