import { useState, useEffect } from 'react';
import Layout from '../../../../components/Layout';
import { withRouter } from 'next/router';
import { resetPassword } from '../../../../actions/authAction';

const ResetPassword = ({ router }) => {
	const [values, setValues] = useState({
		name: '',
		newPassword: '',
		error: '',
		message: '',
		showForm: true,
	});

	const { name, newPassword, error, message, showForm } = values;

	const handleSubmit = (e) => {
		e.preventDefault();
		resetPassword({
			newPassword,
			resetPasswordLink: router.query.id,
		}).then((data) => {
			if (data.error) {
				setValues({
					...values,
					error: data.error,
					showForm: false,
					newPassword: '',
				});
			} else {
				setValues({
					...values,
					message: data.message,
					showForm: false,
					newPassword: '',
					error: false,
				});
			}
		});
	};

	const showError = () =>
		error ? <div className='alert alert-danger'>{error}</div> : '';
	const showMessage = () =>
		message ? <div className='alert alert-success'>{message}</div> : '';

	const passwordResetForm = () => (
		<div className='container'>
			<form onSubmit={handleSubmit}>
				<div className='form-group pt-5'>
					<input
						type='password'
						onChange={(e) =>
							setValues({
								...values,
								newPassword: e.target.value,
							})
						}
						className='form-control'
						value={newPassword}
						placeholder='Entrez votre nouveau mot de passe'
						required
					/>
				</div>
				<div>
					<button className='btn btn-primary'>
						Modifier mon mot de passe
					</button>
				</div>
			</form>
		</div>
	);

	return (
		<Layout>
			<div className='container'>
				<h2>Mot de passe oublié</h2>
				<hr />
				{showError()}
				{showMessage()}
				{showForm && passwordResetForm()}
			</div>
		</Layout>
	);
};

export default withRouter(ResetPassword);
