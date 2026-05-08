import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-800 leading-relaxed">
      <h1 className="text-3xl font-bold mb-6 border-b pb-2">Privacy Policy</h1>
      <p className="mb-4 text-sm text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>
      
      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">1. Data Collection & Consent</h2>
          <p>We collect your name, phone number, and transaction details to process orders. By providing your mobile number, you **expressly consent** to receive transactional updates and receipts via WhatsApp.</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">2. Payment Processing (Razorpay)</h2>
          <p>We do not store your card details. All payments are processed by **Razorpay Payments Private Limited**. Your data is handled in accordance with Razorpay’s Privacy Policy and PCI-DSS standards.</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">3. WhatsApp Communication</h2>
          <p>Communications sent via WhatsApp are subject to WhatsApp's Privacy Policy. We use end-to-end encryption for chat, but transaction alerts are triggered through the Razorpay-WhatsApp API integration. You may opt-out at any time by replying "STOP".</p>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;