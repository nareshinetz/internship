import React from 'react';

const TermsAndConditions: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Terms & Conditions</h1>
      <p className="bg-gray-100 p-3 text-xs mb-6 rounded border">
        This is a computer-generated electronic record published under the provisions of Rule 3 of the IT (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021.
      </p>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">1. WhatsApp Service Terms</h2>
        <p>By opting into our WhatsApp service, you agree to receive automated notifications regarding your payment status, shipping, and support. We are not liable for network delays or message delivery failures by the service provider.</p>
        
        <h2 className="text-xl font-semibold">2. Transaction Security</h2>
        <p>All financial transactions are governed by **Razorpay's General Terms of Use**. You agree to provide accurate KYC information if requested during the checkout process.</p>
        
        <h2 className="text-xl font-semibold">3. Prohibited Use</h2>
        <p>Users shall not use the WhatsApp channel to transmit derogatory, obscene, or illegal content. We reserve the right to block users violating these norms.</p>
      </section>
    </div>
  );
};

export default TermsAndConditions;