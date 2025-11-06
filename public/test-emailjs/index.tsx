'use client';
import { useState } from 'react';

export default function TestEmailJS() {
  const [result, setResult] = useState('Ready to test EmailJS...');
  const [loading, setLoading] = useState(false);

  const testDirectAPI = async () => {
    setLoading(true);
    setResult('Testing direct API connection...');
    
    try {
      const response = await fetch('https://api.emailjs.com/api/v1/emails/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.EMAILJS_PUBLIC_KEY}`
        },
        body: JSON.stringify({
          service_id: 'service_4fxmvl',
          template_id: 'template_w5x1ipi',
          user: { name: 'Test User', email: 'test@example.com' },
          message: 'Test message từ form',
          reply_to: 'test@example.com'
        })
      });
      
      const data = await response.json();
      if (response.status === 200) {
        setResult(`✅ SUCCESS: ${data.message} | Status: ${data.status}`);
      } else {
        setResult(`⚠️ ERROR: ${data.message} | Status: ${data.status}`);
      }
    } catch (error) {
      console.error('Direct API error:', error);
      setResult(`⚠ ERROR: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setLoading(false);
    }
    
    setTimeout(() => {
      setResult(''); 
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-8">
      <h1 className="text-4xl font-bold text-cyan-400 mb-8 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text-transparent">
        EmailJS Testing
      </h1>
      
      <div className={`grid md:grid-cols-2 gap-8 max-w-5xl mx-auto`}>
        <div className="bg-gray-800/50 rounded-xl p-6 border border-cyan-800/30 hover:border-cyan-600/50 transition-all duration-300">
          <h3 className="text-lg font-medium text-white mb-4 text-cyan-400">Step 1: Check Configuration</h3>
          <p className="text-gray-400 mb-4">
            Service ID: <span className="text-green-400">service_03puik3</span>
          </p>
          <p className="text-gray-400 mb-4">
            Template ID: <span className="text-blue-400">template_w5x1ipi</span>
          </p>
        </div>
        
        <div className="bg-gray-800/50 rounded-xl p-6 border border-cyan-800/30 hover:border-cyan-600/50 transition-all duration-300">
          <h3 className="text-lg font-medium text-white mb-4 text-cyan-400">Step 2: Test Request</h3>
          <p className="text-gray-400 mb-4">
            Method: <span className="text-blue-400">POST</span> /v1.1 emails
          </p>
        </div>
        
        <div className={`text-center mt-6 space-y-4`}>
          <p className="text-gray-400 text-sm">
            EmailJS response status: <span className="text-gray-300">Loading...</span>
          </p>
        </div>
        
        <div className="text-center">
          <button
            onClick={testDirectAPI}
            className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full font-medium hover:scale-[1.05] transition-all duration-300 shadow-lg hover:shadow-cyan-500/25"
          >
            Test Direct API Call
          </button>
        </div>
      </div>
      
      </div>
  );
}
