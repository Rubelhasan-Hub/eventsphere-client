export default function TermsPage() {
  return (
    <main className="max-w-4xl mx-auto py-20 px-6 text-gray-700">
      <h1 className="text-4xl font-black text-gray-900 mb-8">Terms & Privacy Policy</h1>
      
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">1. Introduction</h2>
          <p>Welcome to EventSphere. By using our platform, you agree to these terms and conditions.</p>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">2. Data Collection</h2>
          <p>We collect personal information such as your name, email, and event details to provide a seamless booking experience.</p>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">3. User Responsibilities</h2>
          <p>Users must ensure that the information provided is accurate and not fraudulent.</p>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">4. Contact Us</h2>
          <p>For any queries regarding this policy, please reach out via our Contact Support page.</p>
        </div>
      </section>
    </main>
  );
}