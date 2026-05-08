import React from 'react';

const RefundPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-6 border-b pb-2">Shipping & Refund Policy</h1>
      
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">1. Refund Timeline</h2>
        <p>Once a refund is initiated, the amount will be credited to your original payment method via Razorpay within **5-7 business days**.</p>
        
        <h2 className="text-xl font-semibold">2. WhatsApp Confirmations</h2>
        <p>Upon successful initiation of a refund, you will receive an automated confirmation message on your registered WhatsApp number containing the Refund ID and transaction details.</p>
        
        <h2 className="text-xl font-semibold">3. Cancellations</h2>
        <p>Cancellations are only accepted within 24 hours of order placement. Contact our support via WhatsApp or Email for immediate assistance.</p>
      </section>
    </div>
  );
};

export default RefundPolicy;