import React from 'react'
import './App.css'
import rawData from './Krypton_Web_Predictions.json'

// 1. We create the TypeScript Blueprints so the editor knows exactly what to expect
interface TradeResult {
  date: string;
  coin: string;
  signal: string;
  model_engine: string;
}

interface KryptonData {
  metadata: {
    file_processed: string;
    operating_mode: string;
    total_predictions: number;
    status: string;
  };
  results: TradeResult[];
}

// 2. We explicitly tell TypeScript that our imported JSON matches this blueprint
const kryptonData = rawData as KryptonData;

function App() {
  const { metadata, results } = kryptonData;

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Krypton Trading Terminal</h1>
        <div className="metadata-badges">
          <span className="badge">Mode: {metadata.operating_mode}</span>
          <span className="badge">Predictions: {metadata.total_predictions}</span>
        </div>
      </header>

      <div className="table-wrapper">
        <table className="krypton-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Asset</th>
              <th>Signal</th>
              <th>AI Engine</th>
            </tr>
          </thead>
          <tbody>
            {/* The Magic Loop: Rendering a table row for every prediction in the JSON */}
            {results.map((trade, index) => (
              <tr key={index}>
                <td className="text-muted">{trade.date}</td>
                <td className="font-bold">{trade.coin}</td>
                
                {/* Dynamically applying CSS classes based on UP or DOWN */}
                <td className={trade.signal === 'UP' ? 'signal-up' : 'signal-down'}>
                  {trade.signal}
                </td>
                
                <td className="text-muted">{trade.model_engine}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App
