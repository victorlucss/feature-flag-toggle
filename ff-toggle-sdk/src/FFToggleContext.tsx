import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { useCookies } from 'react-cookie'

interface GenericFF {
  name: string;
  key: string;
  value: string;
  enabled: boolean;
  apiKey: string;
}

interface ffLoaded {
  featureFlags?: { [key: string]: GenericFF };
  loaded: boolean;
}

interface featureFlagContextInterface {
  featureFlags?: ffLoaded['featureFlags'];
  loaded: ffLoaded['loaded'];
  getFeatureFlag: (key: string) => GenericFF | undefined;
}

const FeatureFlagContext = createContext({} as featureFlagContextInterface);

interface FeatureFlagProviderProps {
  apiKey: string;
  children: React.ReactNode;
}

export const FeatureFlagProvider = ({ apiKey, children }: FeatureFlagProviderProps) => {
  if (!apiKey) throw new Error('API key is required');

  const [cookies, setCookie] = useCookies(['featureFlags']);

  const mounted = useRef(false);

  const [state, setState] = useState<ffLoaded>({
    featureFlags: {},
    loaded: false
  })

  const socket = io(`http://localhost:3000/ff-${apiKey}`);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;

      if (cookies.featureFlags) {
        setState({
          featureFlags: cookies.featureFlags,
          loaded: true
        });
      }

      socket.on("connect", () => {
        setState({ ...state, loaded: true });
      });
  
      socket.on("load_ff", (featureFlags) => {
        const finalFeatureFlags = featureFlags.map((ff: GenericFF) => {
          ff.value = JSON.parse(ff.value);

          return ff;
        }).reduce((acc: { [key: string]: GenericFF }, ff: GenericFF) => { acc[ff.key] = ff; return acc; }, {});

        setCookie('featureFlags', JSON.stringify(featureFlags), { path: '/' });

        setState({ ...state, featureFlags: finalFeatureFlags });
      });

      socket.on("new_ff", (featureFlag) => {
        featureFlag.value = JSON.parse(featureFlag.value);

        const featureFlags = state.featureFlags || {};
        featureFlags[featureFlag.key] = featureFlag;

        setState({ ...state, featureFlags });
      });

      socket.on("del_ff", (id) => {
        const featureFlags = state.featureFlags || {};

        delete featureFlags[id];
        setState({ ...state, featureFlags });
      });

      socket.on("update_ff", (featureFlag: GenericFF) => {
        // console.log('update ff', featureFlag);
        const featureFlags = state.featureFlags || {};

        featureFlags[featureFlag.key] = featureFlag;

        setState((oldState) => ({ ...oldState, featureFlags }));
      });
  
      socket.on("disconnect", () => {
        // console.log('Disconnected from FFToggle');
      });
    }
  }, []);

  const getFeatureFlag = (key: string) => {
    const featureFlags = state.featureFlags || {};

    return featureFlags[key] || undefined;
  }

  return (
    <FeatureFlagContext.Provider
      value={{
        featureFlags: state.featureFlags,
        loaded: state.loaded,
        getFeatureFlag
      }}
    >
      {children}
    </FeatureFlagContext.Provider>
  );
};

export const useFeatureFlags = () => useContext(FeatureFlagContext);