import axios from 'axios';

const ChapaPayment = () => {
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('ETB');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validate inputs
      if (!amount || !email || !firstName || !lastName) {
        throw new Error('Please fill in all required fields');
      }

      // Send payment request to your backend
      const response = await axios.post('YOUR_BACKEND_ENDPOINT/chapa-initiate', {
        amount,
        currency,
        email,
        first_name: firstName,
        last_name: lastName,
        tx_ref: `tx-${Date.now()}`, // Generate unique transaction reference
      });

      // Redirect to Chapa checkout page
      window.location.href = response.data.checkout_url;

    } catch (err) {
      setError(err.response?.data?.message || err.message);
      setLoading(false);
    }
  };

  return (
    <div className="payment-container">
      <h2>Make Payment with Chapa</h2>
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Currency:</label>
          <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
            <option value="ETB">ETB</option>
            <option value="USD">USD</option>
          </select>
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>First Name:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Last Name:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Pay with Chapa'}
        </button>
      </form>
    </div>
  );
};

export default ChapaPayment;