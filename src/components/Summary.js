// import './Summary.css';
// import React from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';

// const formatLabel = (key) => {
//   return key
//     .replace(/([A-Z])/g, ' $1')
//     .split(' ')
//     .map(word => word.charAt(0).toUpperCase() + word.slice(1))
//     .join(' ');
// };

// function Summary() {
//   const { state } = useLocation();
//   const navigate = useNavigate();

//   return (
//     <div>
//       <h2>Submitted Details</h2>
//       {state ? (
//         <ul>
//           {Object.entries(state).map(([key, value]) => (
//             key !== 'showPassword' && (
//               <li key={key}><strong>{formatLabel(key)}:</strong> {value}</li>
//             )
//           ))}
//         </ul>
//       ) : (
//         <p>No data submitted.</p>
//       )}
//       <button onClick={() => navigate('/')}>Back to Form</button>
//     </div>
//   );
// }

// export default Summary;

// Summary.js
import './Summary.css';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const formatLabel = (key) => {
  return key
    .replace(/([A-Z])/g, ' $1')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

function Summary() {
  const { state } = useLocation();
  const navigate = useNavigate();

  return (
    <div className="summary-container">
      <h2 className="summary-heading">Submitted Details</h2>
      {state ? (
        <ul className="summary-list">
          {Object.entries(state).map(([key, value]) => (
            key !== 'showPassword' && (
              <li key={key}><strong>{formatLabel(key)}:</strong> {value}</li>
            )
          ))}
        </ul>
      ) : (
        <p>No data submitted.</p>
      )}
      <button className="back-button" onClick={() => navigate('/')}>
        Back to Form
      </button>
    </div>
  );
}

export default Summary;



