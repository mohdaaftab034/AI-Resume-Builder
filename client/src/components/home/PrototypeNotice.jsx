import React, { useEffect, useState } from 'react';
import api from '../../configs/api';

const PrototypeNotice = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    let mounted = true;

    const checkRuntime = async () => {
      try {
        const { data } = await api.get('/api/system/runtime-status');
        if (!mounted) return;
        if (data?.prototypeMode) {
          setMessage('Some keys are not present currently. Prototype fallback mode is active.');
        }
      } catch {
        if (!mounted) return;
        setMessage('Prototype mode active. Some integrations may use fallback data.');
      }
    };

    checkRuntime();
    return () => {
      mounted = false;
    };
  }, []);

  if (!message) return null;

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pt-4">
      <div className="rounded-lg border border-orange-200 bg-orange-50 px-4 py-2 text-xs text-orange-700">
        {message}
      </div>
    </div>
  );
};

export default PrototypeNotice;
