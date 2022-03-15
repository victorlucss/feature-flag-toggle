import React, { useEffect, useState } from 'react';
import { useFeatureFlags } from './FFToggleContext';

// import { Container } from './styles';


interface GenericFF {
  name: string;
  key: string;
  value: string;
  enabled: boolean;
  apiKey: string;
}

const App: React.FC = () => {
  const { featureFlags } = useFeatureFlags();


  return <>
  
    {featureFlags?.una_feature_flag?.enabled ? <h1>Una FF Enabled</h1> : <h1>Una FF Disabled</h1>}
  </>;
}

export default App; 