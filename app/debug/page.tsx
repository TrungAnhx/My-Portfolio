'use client';

import { useState } from 'react';
import emailjs from '@emailjs/browser';

const DebugEmailJS = () => {
  const [result, setResult] = useState<string>('Testing...');
  const [loading, setLoading] = useState(false);

  const testEmailJS = async () => {
    setLoading(true);
    setResult('Sending test...');
    
    try {
      const response = await emailjs.send(
        'service_03puik3',
        'template_w5x1ipi',
        {
          from_name: 'Test User',
          from_email: 'test@example.com',
          message: 'This is a test message from debug page.',
          to_name: 'Trung Anh',
          reply_to: 'test@example.com',
        },
        'gINlacdFmm1QZWUht'
      );
      
      setResult(`✅ Success! Status: ${response.status}, Text: ${response.text}`);
    } catch (error) {
      console.error('Debug error:', error);
      setResult(`❌ Error: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setLoading(false);
    }
  };

  const checkEnvVars = () => {
    setResult(`Service ID: ${process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID || 'Missing'}\nTemplate ID: ${process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID || 'Missing'}\nPublic Key: ${process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY?.slice(0, 10)}...` || 'Missing');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-cyan-400">EmailJS Debug</h1>
        
        <div className="space-y-6">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Current Configuration</h2>
            <pre className="bg-gray-700 p-4 rounded text-green-400 text-sm">
              {`Service ID: service_03puik3
Template ID: template_w5x1ipi  
Public Key: gINlacdFmm1QZWUht`}
            </pre>
            
            <button
              onClick={checkEnvVars}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Check Environment Variables
            </button>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Test EmailJS</h2>
            <button
              onClick={testEmailJS}
              disabled={loading}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                loading 
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                  : 'bg-cyan-600 text-white hover:bg-cyan-700'
              }`}
            >
              {loading ? 'Sending...' : 'Send Test Email'}
            </button>
            
            <div className="mt-4 p-4 bg-gray-700 rounded">
              <p className="font-mono text-sm whitespace-pre-wrap">{result}</p>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Troubleshooting</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Check if EmailJS account is verified</li>
              <li>Verify email service is connected</li>
              <li>Check template exists and is active</li>
              <li>Check public key is correct</li>
              <li>Check browser console for errors</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DebugEmailJS;
