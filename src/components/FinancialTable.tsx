import React, { useState } from 'react';
import './FinancialTable.css'; 
type AssetClass = 'Equities' | 'Macro' | 'Credit';
export interface Instrument {
  ticker: string;
  price: number;
  assetClass: AssetClass;
}
type SortKey = 'assetClass' | 'price' | 'ticker';
const assetClassOrder: AssetClass[] = ['Equities', 'Macro', 'Credit'];
const getRowColor = (assetClass: AssetClass) => {
  switch (assetClass) {
    case 'Macro':
      return 'white';
    case 'Equities':
      return 'lightblue'; 
    case 'Credit':
      return 'lightgreen'; 
    default:
      return 'white';
  }
};
const FinancialTable: React.FC<{ data: Instrument[] }> = ({ data }) => {
  const [sortKey, setSortKey] = useState<SortKey>('assetClass');

  const sortedData = [...data].sort((a, b) => {
    if (sortKey === 'assetClass') {
      return assetClassOrder.indexOf(a.assetClass) - assetClassOrder.indexOf(b.assetClass);
    } else if (sortKey === 'price') {
      return b.price - a.price;
    } else {
      return a.ticker.localeCompare(b.ticker);
    }
  });

  return (
    <div className="container">
    <h2>Financial Instruments</h2>

    <div className="button-group">
      <button onClick={() => setSortKey('assetClass')}>Sort by Asset Class</button>
      <button onClick={() => setSortKey('price')}>Sort by Price</button>
      <button onClick={() => setSortKey('ticker')}>Sort by Ticker</button>
    </div>

    <table className="financial-table">
      <thead>
        <tr>
          <th className="financial-table-header">Ticker</th>
          <th className="financial-table-header">Price</th>
          <th className="financial-table-header">Asset Class</th>
        </tr>
      </thead>
      <tbody>
        {sortedData.map((instrument: any, index: number) => (
          <tr
            key={index}
            style={{ backgroundColor: getRowColor(instrument.assetClass) }}
          >
            <td className="financial-table-cell">{instrument.ticker}</td>
            <td
              className="financial-table-cell"
              style={{ color: instrument.price >= 0 ? 'blue' : 'red' }}
            >
              {instrument.price.toFixed(2)}
            </td>
            <td className="financial-table-cell">{instrument.assetClass}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
};

export default FinancialTable;
