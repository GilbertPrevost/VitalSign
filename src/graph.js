import React from 'react';




function ECGChart() {
  const svgStyle = {
    display: 'block',
    margin: 'auto',
  };








  const numVerticalLines = 10;
  const HorizontalLineSpacing = (465 - 50) / (numVerticalLines - 1) * 1.8;
  const verticalLineSpacing = (223 - 50) / (numVerticalLines - 1) * 1.8;








  const verticalLines = [];
  for (let i = 0; i < numVerticalLines; i++) {
    const x = 50 + i * verticalLineSpacing;
    const color = i === 9 ? "black" : "gray"; // Change color to black for the 10th line
    verticalLines.push(
      <line key={i} x1={x} y1={50} x2={x} y2={300} stroke={color} strokeWidth="1" />
    );
  }




  // ECG data (sample data, replace with your actual data)
  const ecgData = [
    { x: 0, y: 0 },
    { x: 0.1, y: 0.05 },
    { x: 0.12, y: 0.1 },
    { x: 0.2, y: 0.05 },
    { x: 0.21, y: 0 },
    { x: 0.26, y: 1 },
    { x: 0.31, y: -0.17 },
    { x: 0.35, y: 0 },
    { x: 0.4, y: 0 },
    { x: 0.45, y: 0.05 },
    { x: 0.5, y: 0.06 },
    { x: 0.53, y: 0.07 },
    { x: 0.58, y: 0.06 },
    { x: 0.6, y: 0.05 },
    { x: 0.65, y: 0 },
    { x: 0.68, y: 0 },
    { x: 0.7, y: 0 },
    { x: 0.75, y: 0 },
    { x: 0.78, y: 0.01 },
    { x: 0.8, y: 0.02 },
    { x: 0.82, y: 0.03 },
    { x: 0.85, y: 0.02 },
    { x: 0.86, y: 0.01 },
    { x: 0.88, y: 0 },
    { x: 0.9, y: 0 },
    { x: 0.9, y: 0 },
    { x: 0.92, y: 0 },
    { x: 0.95, y: 0 },
    { x: 1, y: 0.1 },
    { x: 1.1, y: 0.05 },
    { x: 1.15, y: 0.1 },
    { x: 1.16, y: 0.05 },
    { x: 1.17, y: 0 },
    { x: 1.25, y: 1 },
    { x: 1.3, y: -0.17 },
    { x: 1.4, y: 0 },
    { x: 1.55, y: 0 },
    { x: 1.65, y: 0.05 },
    { x: 1.71, y: 0.06 },
    { x: 1.75, y: 0.07 },
    { x: 1.78, y: 0.06 },
    { x: 1.79, y: 0.05 },
    { x: 1.8, y: 0.0 },
    { x: 2, y: 0.1 },
  ];




  const heading = {
    backgroundColor: 'navy',
    color: 'white',
    padding: '20px',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '35px',
};




  // Calculate the scaling factors based on chart dimensions and data range
  const xScale = (362 - 50) / (ecgData.length - 1);
  const yScale = (148 - 50) / (Math.max(...ecgData.map(point => point.y)) - Math.min(...ecgData.map(point => point.y)));








  // Convert ECG data to SVG path
  const ecgPath = `M${ecgData.map((point, index) => `${50 + index * xScale},${230 - (point.y - Math.min(...ecgData.map(point => point.y))) * yScale}`).join(' L')}`;








  return (
    <div>
      <div style={heading}>Electrocardiogram</div>




      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40vh' }}>
        <svg width={500} height={350} style={svgStyle}>
          {/* X-Axis */}
          <line x1={50} y1={300} x2={362} y2={300} stroke="black" strokeWidth="2" />
          {/* X-Axis Label (centered) */}
          <text x={205} y={325} textAnchor="middle" fontWeight="bold">(Seconds)</text>








          {/* Y-Axis */}
          <line x1={50} y1={300} x2={50} y2={50} stroke="black" strokeWidth="2" />
          {/* Y-Axis Label (centered) */}
          <text x={7} y={188} textAnchor="middle" fontWeight="bold" transform="rotate(-90, 10, 175)">(Milli-Volts)</text>








          {/* Optional labels for Y-axis */}
          <text x={40} y={300} textAnchor="end">-1</text>
          <text x={40} y={225} textAnchor="end">0</text>
          <text x={40} y={150} textAnchor="end">1</text>
          <text x={40} y={75} textAnchor="end">2</text>








          {/* Horizontal lines with increased spacing */}
          <line x1={50} y1={300 - HorizontalLineSpacing} x2={362} y2={300 - HorizontalLineSpacing} stroke="gray" strokeWidth="1" />
          <line x1={50} y1={300 - 2 * HorizontalLineSpacing} x2={362} y2={300 - 2 * HorizontalLineSpacing} stroke="gray" strokeWidth="1" />
          <line x1={50} y1={300 - 3 * HorizontalLineSpacing} x2={362} y2={300 - 3 * HorizontalLineSpacing} stroke="black" strokeWidth="2" />








          {/* Render the ECG line series */}
          <path d={ecgPath} stroke="#0276cb" strokeWidth="2.5" fill="none" />
          {/* Render the vertical lines */}
          {verticalLines}
        </svg>
      </div>


      <center><h3>ECG Intervals</h3></center>
     
        <div className="section">
         
          <div className="details">
            <h3>QT Interval</h3>
            {/* {Blood !== 0 ? ( */}
           
           <>
              <div className="value">{}</div>
             <div className="result">{}</div>
               </>
           {/* ) : ( */}
               <div className="value"> 0 </div>
             {/* )} */}
             <center><h3>Normal Range</h3></center>
            <div className="range">0.06 - 01.2 Sec</div>
          </div>
        </div>




        <div className="section">
       
          <div className="details">
            <h3>SG Segment</h3>
           {/* {Blood !== 0 ? ( */}
           
           <>
              <div className="value">{}</div>
             <div className="result">{}</div>
               </>
           {/* ) : ( */}
               <div className="value"> 0 </div>
             {/* )} */}
             <center><h3>Normal Range</h3></center>
            <div className="range">0.08 Sec</div>
          </div>
        </div>




        <div className="section">
         
          <div className="details">
            <h3>PR Interval</h3>
            {/* {Blood !== 0 ? ( */}
           
           <>
              <div className="value">{}</div>
             <div className="result">{}</div>
               </>
           {/* ) : ( */}
               <div className="value"> 0 </div>
             {/* )} */}
             <center><h3>Normal Range</h3></center>
            <div className="range">0.12 - 0.20 Sec</div>
          </div>
        </div>




        <div className="section">
         
          <div className="details">
            <h3>QRS Interval</h3>
            {/* {Blood !== 0 ? ( */}
           
           <>
              <div className="value">{}</div>
             <div className="result">{}</div>
               </>
           {/* ) : ( */}
               <div className="value"> 0 </div>
             {/* )} */}
             <center><h3>Normal Range</h3></center>
            <div className="range">0.06 - 0.10 Sec</div>
          </div>
        </div>




       




       
    </div>
  );
}

export default ECGChart;
