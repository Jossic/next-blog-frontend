import { useState } from 'react';
import { emailContactForm } from '../../actions/formAction';
import Link from 'next/link';

const ContactForm = () => {
	const [values, setValues] = useState({
		message: '',
		name: '',
		email: '',
		sent: false,
		buttonText: 'Envoyer',
		success: false,
		error: false,
	});

	const { message, name, email, sent, buttonText, success, error } = values;

	const clickSubmit = (e) => {
		e.preventDefault();
		setValues({ ...values, buttonText: 'Envoi en cours...' });
		emailContactForm({
			name,
			email,
			message,
		}).then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error });
			} else {
				setValues({
					...values,
					sent: true,
					name: '',
					email: '',
					message: '',
					buttonText: 'Message envoyé !',
					success: data.success,
				});
			}
		});
	};

	const handleChange = (name) => (e) => {
		setValues({
			...values,
			[name]: e.target.value,
			error: false,
			success: false,
			buttonText: 'Envoyer',
		});
	};

	const showSuccessMessage = () =>
		success && (
			<div className='alert alert-info'>Merci de nous avoir contacté</div>
		);

	const showErrorMessage = () =>
		error && <div className='alert alert-danger'>{error}</div>;

	const contactForm = () => {
		return (
			<form onSubmit={clickSubmit} className='pb-5'>
				<div className='form-group'>
					<label className='lead'>Nom*:</label>
					<input
						type='text'
						onChange={handleChange('name')}
						className='form-control'
						value={name}
						required
					/>
				</div>
				<div className='form-group'>
					<label className='lead'>Email*:</label>
					<input
						type='email'
						onChange={handleChange('email')}
						className='form-control'
						value={email}
						required
					/>
				</div>
				<div className='form-group'>
					<label className='lead'>Message*:</label>
					<textarea
						onChange={handleChange('message')}
						type='text'
						className='form-control'
						value={message}
						cols='30'
						rows='10'
						required></textarea>
				</div>
				<div>
					<button className='btn btn-primary'>{buttonText}</button>
				</div>
			</form>
		);
	};

	return (
		<div>
			{showSuccessMessage()}
			{showErrorMessage()}
			{contactForm()}
		</div>
	);
};

export default ContactForm;
