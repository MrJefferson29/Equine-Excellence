import React, { useState } from 'react';
import styled from 'styled-components';
import { FiShield, FiMail, FiCheckCircle } from 'react-icons/fi';

const CONTACT_EMAIL = 'equineexcellence.help@gmail.com';

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    hasExperience: '',
    interestType: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!form.email.trim()) newErrors.email = 'Email is required';
    if (!form.phone.trim()) newErrors.phone = 'Phone is required';
    if (!form.hasExperience) newErrors.hasExperience = 'Please select an option';
    if (!form.interestType) newErrors.interestType = 'Please select an interest type';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const body = [
      'REGISTRY INQUIRY - Equine Excellence',
      '---------------------------------',
      `Client: ${form.name || 'Anonymous'}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone}`,
      `Experienced Owner: ${form.hasExperience}`,
      `Interest: ${form.interestType}`,
      '',
      'Message:',
      form.message || 'No additional details provided.'
    ].join('\n');

    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Registry Inquiry - Equine Excellence')}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setSubmitted(true);
  };

  return (
    <PageWrapper>
      {/* Registry Mission & Policies */}
      <PolicySection>
        <span className="accent-tag">Registry Standards</span>
        <TitleSerif>Our Mission & Ethics</TitleSerif>
        <MissionText>
          Our commitment is to the <strong>ETHICAL PRESERVATION</strong> and responsible rehoming of elite equine bloodlines. We ensure every horse in our collection is health-screened, temperament-tested, and ready for their next chapter.
        </MissionText>
        <PolicyGrid>
          <li>The Reservation Deposit of $450 is fully refundable within 48 hours of initial viewing.</li>
          <li>Registry fees are accepted via secure bank transfer, Zelle, or certified concierge payment.</li>
          <li>All horses come with a comprehensive health history and up-to-date veterinary certification.</li>
          <li>We reserve the right to vet all potential owners to ensure the horse's lifelong well-being.</li>
          <li>International transport logistics can be managed by our specialized equine travel partners.</li>
        </PolicyGrid>
      </PolicySection>

      {/* Contact Form */}
      <FormSection>
        <div className="header-box">
          <FiMail className="icon" />
          <TitleSerif>Inquiry Desk</TitleSerif>
        </div>
        
        {submitted && (
          <SuccessBanner>
            <FiCheckCircle /> Your inquiry has been drafted. Please confirm the send action in your email client.
          </SuccessBanner>
        )}

        <form onSubmit={handleSubmit}>
          <FormGrid>
            <div className="field">
              <label>Full Name</label>
              <input type="text" placeholder="John Doe" onChange={(e) => setForm({...form, name: e.target.value})} />
            </div>
            <div className="field">
              <label>Email Address *</label>
              <input type="email" placeholder="john@example.com" onChange={(e) => setForm({...form, email: e.target.value})} />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
          </FormGrid>

          <FormGrid>
            <div className="field">
              <label>Phone Number *</label>
              <input type="tel" placeholder="+1 (555) 000-0000" onChange={(e) => setForm({...form, phone: e.target.value})} />
              {errors.phone && <span className="error">{errors.phone}</span>}
            </div>
            <div className="field">
              <label>Primary Interest</label>
              <select onChange={(e) => setForm({...form, interestType: e.target.value})}>
                <option value="">Select Interest</option>
                <option value="Adoption">Elite Adoption</option>
                <option value="Urgent">At-Risk Rescue</option>
                <option value="Training">Training Services</option>
              </select>
              {errors.interestType && <span className="error">{errors.interestType}</span>}
            </div>
          </FormGrid>

          <div className="field">
            <label>Experienced with Horses? *</label>
            <RadioGroup>
              <label><input type="radio" name="exp" value="Yes" onChange={(e) => setForm({...form, hasExperience: e.target.value})} /> Professional/Advanced</label>
              <label><input type="radio" name="exp" value="No" onChange={(e) => setForm({...form, hasExperience: e.target.value})} /> Beginner/New Owner</label>
            </RadioGroup>
          </div>

          <div className="field">
            <label>How can our concierge assist you?</label>
            <textarea rows="4" placeholder="Tell us about your stable requirements..." onChange={(e) => setForm({...form, message: e.target.value})} />
          </div>

          <SubmitButton type="submit">Submit Registry Inquiry</SubmitButton>
        </form>
      </FormSection>

      <SupportBox>
        <FiShield className="icon" />
        <div>
          <h4>Privacy & Integrity</h4>
          <p>Your data is encrypted and used solely for registry communication. We never share client records with third-party marketing entities.</p>
        </div>
      </SupportBox>
    </PageWrapper>
  );
};

export default Contact;

// --- Styled Components ---

const PageWrapper = styled.div`
  background-color: #fdfcf8;
  padding: 8rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
`;

const TitleSerif = styled.h2`
  font-family: 'Playfair Display', serif;
  color: #1a2e26;
  font-size: 2.2rem;
  margin-bottom: 1rem;
`;

const PolicySection = styled.div`
  background: white;
  padding: 4rem;
  max-width: 900px;
  width: 100%;
  border: 1px solid #f0efeb;
  box-shadow: 0 10px 30px rgba(0,0,0,0.03);
  text-align: center;

  .accent-tag {
    color: #c5a059;
    text-transform: uppercase;
    letter-spacing: 4px;
    font-size: 0.75rem;
    font-weight: 800;
  }
`;

const MissionText = styled.p`
  font-size: 1.1rem;
  color: #666;
  line-height: 1.8;
  margin-bottom: 2rem;
`;

const PolicyGrid = styled.ul`
  text-align: left;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  padding: 0;
  list-style-type: none;
  border-top: 1px solid #eee;
  padding-top: 2rem;

  li {
    font-size: 0.9rem;
    color: #444;
    position: relative;
    padding-left: 20px;
    line-height: 1.5;

    &:before {
      content: "•";
      color: #c5a059;
      position: absolute;
      left: 0;
      font-weight: bold;
    }
  }

  @media (max-width: 768px) { grid-template-columns: 1fr; }
`;

const FormSection = styled.div`
  background: white;
  padding: 4rem;
  max-width: 900px;
  width: 100%;
  border: 1px solid #f0efeb;

  .header-box {
    text-align: center;
    margin-bottom: 3rem;
    .icon { font-size: 2rem; color: #c5a059; margin-bottom: 10px; }
  }

  .field {
    display: flex;
    flex-direction: column;
    margin-bottom: 1.5rem;
    label { font-size: 0.75rem; text-transform: uppercase; font-weight: 800; margin-bottom: 8px; color: #1a2e26; }
    input, select, textarea {
      padding: 12px; border: 1px solid #e0e0e0; background: #fafafa;
      &:focus { border-color: #c5a059; outline: none; background: white; }
    }
    .error { color: #c62828; font-size: 0.7rem; margin-top: 5px; font-weight: 700; }
  }
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  @media (max-width: 600px) { grid-template-columns: 1fr; }
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 2rem;
  label { font-size: 0.9rem !important; text-transform: none !important; font-weight: 500 !important; cursor: pointer; }
  input { accent-color: #1a2e26; margin-right: 8px; }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 20px;
  background: #1a2e26;
  color: white;
  border: none;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;
  transition: 0.3s;

  &:hover { background: #c5a059; }
`;

const SuccessBanner = styled.div`
  background: #fdfcf8;
  border: 1px solid #c5a059;
  color: #1a2e26;
  padding: 15px;
  margin-bottom: 2rem;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SupportBox = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  max-width: 600px;
  color: #888;
  .icon { font-size: 2.5rem; color: #c5a059; opacity: 0.5; }
  h4 { font-size: 0.9rem; margin-bottom: 5px; color: #1a2e26; text-transform: uppercase; letter-spacing: 1px; }
  p { font-size: 0.85rem; margin: 0; line-height: 1.5; }
`;