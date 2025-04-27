import React from 'react';

import FinancialTable, { Instrument } from './components/FinancialTable';
import data from './data';

const financeData: Instrument[]  = data as Instrument[];

function App() {
  return (
    <div>
      <FinancialTable data={financeData} />
    </div>
  );
}

export default App;
